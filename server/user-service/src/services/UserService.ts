import bcryptjs from "bcryptjs";
import { UserRepository } from "../repositories/UserRepository";
import { Role, IUserAttrs, IUserDoc } from "../interfaces/IUserModel";
import { User } from "../models/UserModel";
import jwt from "jsonwebtoken";
import { EmailService } from "../utils/emailSender";
import { NotFoundError } from "../errors/NotFoundError";
import { BadRequestError } from "../errors/BadRequestError";
import { IUserService } from "../interfaces/IUserService";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "email-secret-key";

export class UserService implements IUserService {
  private userRepository: UserRepository;

  constructor(userRepository: UserRepository) {
    this.userRepository = userRepository;
  }

  public async registerUser(
    name: string,
    email: string,
    password: string,
    country: string
  ): Promise<IUserDoc> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      throw new BadRequestError("User with this email already exists.");
    }

    const hashedPassword = await bcryptjs.hash(password, 10);

    const newUserAttrs: IUserAttrs = {
      name,
      email,
      password: hashedPassword,
      country,
      role: Role.CUSTOMER,
      verified: false,
    };

    const newUser = User.build(newUserAttrs);
    if (newUser) {
      await EmailService.sendVerificationMail(newUser.email);
    }

    return await this.userRepository.save(newUser as IUserDoc);
  }

  async verifyEmail(
    token: string
  ): Promise<{ name: string; email: string; role: string } | null> {
    try {
      const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundError("User not found with this email");
      }

      if (user?.verified) {
        throw new BadRequestError("User email is already verified");
      }

      await this.userRepository.update({ email }, { verified: true });

      console.log("User verified successfully:", user);

      return {
        name: user.name,
        email: user.email,
        role: user.role,
      };
    } catch (error) {
      console.error("Error in verifyEmail service:", error);
      throw error;
    }
  }

  async signInUser(email: string, password: string): Promise<IUserDoc> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (!existingUser) {
      throw new NotFoundError();
    }

    const passwordMatch = bcryptjs.compareSync(password, existingUser.password);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid email or Password.!");
    }

    return existingUser;
  }

  async googleLogin(
    name: string,
    email: string,
    googleId: string
  ): Promise<IUserDoc> {
    const existingUser = await this.userRepository.findByEmail(email);

    if (existingUser) {
      return existingUser;
    }
    const hashedPassword = await bcryptjs.hash(googleId, 10);

    const newUserAttrs: IUserAttrs = {
      name,
      email,
      password: hashedPassword,
      country: "India",
      role: Role.CUSTOMER,
      verified: true,
    };

    const newUser = User.build(newUserAttrs);

    return await this.userRepository.save(newUser as IUserDoc);
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundError("User not found with this email");
      }

      await EmailService.sendPasswordResetMail(user.email);

      console.log(`Password reset email sent to: ${email}`);
    } catch (error) {
      console.error("Error occurred in resetPassword service:", error);

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new BadRequestError(
        "An unexpected error occurred while resetting the password."
      );
    }
  }

  async resetPassword(password: string, token: string): Promise<void> {
    try {
      const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };

      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundError("User not found with this email");
      }

      const hashedPassword = await bcryptjs.hash(password, 10);

      await this.userRepository.update({ email }, { password: hashedPassword });

      console.log(`Password reset successfully for: ${email}`);
    } catch (error) {
      console.error("Error occurred in resetPassword service:", error);

      if (error instanceof NotFoundError) {
        throw error;
      }

      throw new BadRequestError(
        "An unexpected error occurred while resetting the password."
      );
    }
  }

  async updateProfile(name: string, email: string, country: string): Promise<IUserDoc> {
    try {
      console.log(email, name, country, "ith user service nn details kittanundo")
      const user = await this.userRepository.findByEmail(email);
      console.log("User found:----------------------------------------------------", user);

      if (!user) {
        throw new NotFoundError("User not found with this email");
      }
  
      const updatedUser = await this.userRepository.update(
        { email },
        { name, country }
      );

      console.log("User updated successfully:---------------------------------------------", updatedUser);
  
      if (!updatedUser) {
        throw new BadRequestError("Failed to update the user");
      }
  
      return updatedUser;
    } catch (error) {
      console.error("Error in verifyEmail service:", error);
      throw error;
    }
  }
}
