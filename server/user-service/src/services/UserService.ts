import bcryptjs from "bcryptjs";
import { Role, IUserDoc } from "../interfaces/IUserModel";
import jwt from "jsonwebtoken";
import { EmailService } from "../utils/emailSender";
import { BadRequestError, NotFoundError } from "@be-my-guest/common";
import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../interfaces/IUserRepository";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "email-secret-key";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

  async registerUser(name: string, email: string, password: string, country: string, role: string): Promise<IUserDoc> {
    try {
      const userRole: Role = Object.values(Role).includes(role as Role) ? (role as Role) : Role.CUSTOMER;

      const existingUser = await this.userRepository.findByEmail(email);
      if (existingUser) throw new BadRequestError("User with this email already exists.");

      const hashedPassword = await bcryptjs.hash(password, 10);

      const newUser = await this.userRepository.createUser( name, email, hashedPassword, country, userRole, false );
      if (!newUser) throw new BadRequestError("Failed to create user");

      await EmailService.sendVerificationMail(newUser.email);
      return newUser;
    } catch (error) {
      console.error("Error in register user service:", error);
      throw error;
    }
  }

  async verifyEmail(token: string): Promise<{ name: string; email: string; role: string } | null> {
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
      throw new NotFoundError("User not found with this email");
    }

    const passwordMatch = bcryptjs.compareSync(password, existingUser.password);

    if (!passwordMatch) {
      throw new BadRequestError("Invalid email or Password.!");
    }

    return existingUser;
  }

  // async refreshToken(refreshToken: string): Promise<string> {
  //     try {
  //       if(!refreshToken) throw new BadRequestError("Refresh token is expired");

  //       const decoded = AuthService.verifyRefreshToken(refreshToken);
  //       if (decoded) {
  //         const userExist = await this.userRepository.findByEmail(decoded.email);
  //         if(userExist && userExist.isBlocked === false) throw new NotAuthorizedError();
  //       }

  //       if(!decoded) throw new NotFoundError("Invalid or expired refresh token");

  //       // Generate new access token
  //       const newAccessToken = AuthService.generateToken({ 
  //           id: decoded.id, 
  //           email: decoded.email, 
  //           role: decoded.role 
  //       });

  //       return newAccessToken;

  //     } catch (error) {
  //       console.error("Error in creating refresh token:", error);
  //       throw error;
  //     }
  // }

  async googleLogin(name: string, email: string, googleId: string, role: string): Promise<IUserDoc> {
    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
        return existingUser;
    }

    const hashedGoogleId = await bcryptjs.hash(googleId, 10);
    return await this.userRepository.createUser(
        name,
        email,
        hashedGoogleId,
        "India",
        role,
        true
    );
  }

  async forgotPassword(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundError("User not found with this email");
      }

      await EmailService.sendPasswordResetMail(user.email, user.role);

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

  async resetPassword(password: string, token: string): Promise<Role | null> {
    try {
      const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };

      const user = await this.userRepository.findByEmail(email);
      console.log(user, "from the service - user")

      if (!user) {
        throw new NotFoundError("User not found with this email");
      }

      const isSamePassword = await bcryptjs.compare(password, user.password);

      if(isSamePassword) throw new BadRequestError("New password must be different from the previous password.");

      const hashedPassword = await bcryptjs.hash(password, 10);

      await this.userRepository.update({ email }, { password: hashedPassword });
      return user.role;

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

  async changePassword(password: string, email: string): Promise<void> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if(!user) throw new NotFoundError("No account with the provided email found.");
      
      const isSamePassword = await bcryptjs.compare(password, user.password);

      if(isSamePassword) throw new BadRequestError("New password must be different from the previous password.");

      const hashedPassword = await bcryptjs.hash(password, 10);

      await this.userRepository.update({ email }, { password: hashedPassword });

    } catch (error) {
      console.error("Error in change password service:", error);
      throw error;
    }
  }

  async updateProfile(name: string, email: string, country: string, profileImage: string): Promise<IUserDoc> {
    try {
      const user = await this.userRepository.findByEmail(email);

      if (!user) {
        throw new NotFoundError("User not found with this email");
      }

      const updatedUser = await this.userRepository.update(
        { email },
        { name, country, profileImage },
      );

      if (!updatedUser) {
        throw new BadRequestError("Failed to update the user");
      }

      return updatedUser;
    } catch (error) {
      console.error("Error in verifyEmail service:", error);
      throw error;
    }
  }

  async fetchAllCustomers(): Promise<IUserDoc[] | null> {
    try {
      
      const customers = await this.userRepository.fetchAllCustomers(Role.CUSTOMER);

      if(!customers || customers.length === 0)
        throw new NotFoundError("No customers found");

      return customers;

    } catch (error) {
      console.error("Error in fetching all customers:", error);
      throw error;
    }
  }

  async fetchAllPropertyOwners(): Promise<IUserDoc[] | null> {
    try {
      const propertyOwners = await this.userRepository.fetchAllPropertyOwners(Role.PROPERTY_OWNER);
    
      if(!propertyOwners || propertyOwners.length === 0)
        throw new NotFoundError("No Property Owners found");

      return propertyOwners;
    } catch (error) {
      console.error("Error in fetching all customers:", error);
      throw error;
    }
  }

  async fetchByUserId(userId: string): Promise<IUserDoc | null> {
      try {
        const user = await this.userRepository.findByUserId(userId);
        if(!user) throw new NotFoundError("No user found with this accound.");

        return user;
      } catch (error) {
        console.error("Error in fetching all customers:", error);
        throw error;
      }
  }

  async updateUserStatus(userId: string, isBlocked: boolean): Promise<IUserDoc | null> {
    try {
      return await this.userRepository.updateUserStatus(userId, isBlocked);
    } catch (error) {
      console.error("Error in updating the user status :", error);
      throw error;
    }
  }

}
