import bcryptjs from "bcryptjs";
import { Role, IUserDoc } from "../interfaces/IUserModel";
import jwt from "jsonwebtoken";
import { EmailService } from "../utils/emailSender";
import { BadRequestError, NotAuthorizedError, NotFoundError } from "@be-my-guest/common";
import { IUserService } from "../interfaces/IUserService";
import { IUserRepository } from "../interfaces/IUserRepository";
import { AuthService } from "../utils/jwt";
import { verifyGoogleToken } from "../utils/authUtils";

const EMAIL_SECRET = process.env.EMAIL_SECRET || "email-secret-key";

export class UserService implements IUserService {
  private userRepository: IUserRepository;

  constructor(userRepository: IUserRepository) {
    this.userRepository = userRepository;
  }

// registering user
  async registerUser( name: string, email: string, password: string, country: string, role: string ): Promise<IUserDoc> {
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
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred during registering user.");
    }
  }

// verifying mail
  async verifyEmail( token: string ): Promise<{ name: string; email: string; role: string } | null> {
    try {
        const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError("User not found with this email");
        if (user?.verified) throw new BadRequestError("User email is already verified");

        await this.userRepository.update({ email }, { verified: true });

        return { name: user.name, email: user.email, role: user.role, };
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred during verifying email.");
    }
  }

// sign in user
  async signInUser(email: string, password: string): Promise<{ user: IUserDoc; token: string; refreshToken: string; }> {
    try {
        const existingUser = await this.userRepository.findByEmail(email);
        if (!existingUser) throw new NotFoundError("User not found with this email");
      
        if (existingUser.isBlocked) throw new NotAuthorizedError();
      
        const passwordMatch = bcryptjs.compareSync(password, existingUser.password);
        if (!passwordMatch) throw new BadRequestError("Invalid email or Password.!");
      
        const tokenPayload = { id: existingUser.id, email: existingUser.email, role: existingUser.role };
        
        const token = AuthService.generateToken(tokenPayload);
        const refreshToken = AuthService.generateRefreshToken(tokenPayload);
      
        return { user: existingUser, token, refreshToken };
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred during sign-in.");
    }
  }

// create new access token using refresh token
  async refreshToken(refreshToken: string): Promise<string> {
      try {
        const decoded = AuthService.verifyRefreshToken(refreshToken);
        if(decoded) {
          const userExist = await this.userRepository.findByEmail(decoded.email);
          if(userExist && userExist.isBlocked === true) throw new NotAuthorizedError();
        }
        if (!decoded) {
          throw new NotAuthorizedError();
        }

        const tokenPayload = { id: decoded.id, email: decoded.email, role: decoded.role};
        const newAccessToken = AuthService.generateToken(tokenPayload);

        return newAccessToken;
      } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred during creating refresh token.");
      }
  }

// login - google
  async googleLogin( idToken: string, role: string ): Promise<{ user: IUserDoc; token: string; refreshToken: string; }> {
    try {
        const payload = await verifyGoogleToken(idToken);
        if (!payload) throw new BadRequestError("Invalid Google token!");
    
        const { name = "", email, sub: googleId } = payload;
        if (!email || !googleId) throw new NotFoundError("Google token is missing essential information!");
    
        let user = await this.userRepository.findByEmail(email);
        if (!user) {
          const hashedGoogleId = await bcryptjs.hash(googleId, 10);
          user = await this.userRepository.createUser(name, email, hashedGoogleId, "India", role, true);
        }  
        const tokenPayload = { id: user.id, email: user.email, role: user.role };
        const token = AuthService.generateToken(tokenPayload);
        const refreshToken = AuthService.generateRefreshToken(tokenPayload);
    
        return { user, token, refreshToken };
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred during creating google login.");
    }
  }

//forgot password 
  async forgotPassword(email: string): Promise<void> {
    try {
      const user = await this.userRepository.findByEmail(email);
      if (!user) throw new NotFoundError("User not found with this email");

      await EmailService.sendPasswordResetMail(user.email, user.role);
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
      throw new Error("An unexpected error occurred while resetting the password.");
    }
  }

// resetting password
  async resetPassword(password: string, token: string): Promise<Role | null> {
    try {
        const { email } = jwt.verify(token, EMAIL_SECRET) as { email: string };

        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError("User not found with this email");

        const isSamePassword = await bcryptjs.compare(password, user.password);
        if (isSamePassword) throw new BadRequestError("New password must be different from the previous password.");

        const hashedPassword = await bcryptjs.hash(password, 10);

        await this.userRepository.update({ email }, { password: hashedPassword });
        return user.role;
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred while resetting the password.");
    }
  }

// change the existing password
  async changePassword(password: string, email: string): Promise<void> {
    try {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError("No account with the provided email found.");

        const isSamePassword = await bcryptjs.compare(password, user.password);
        if (isSamePassword) throw new BadRequestError("New password must be different from the previous password.");

        const hashedPassword = await bcryptjs.hash(password, 10);

        await this.userRepository.update({ email }, { password: hashedPassword });
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred while changing the password.");
    }
  }

// updating the profile information
  async updateProfile( name: string, email: string, country: string, profileImage: string ): Promise<IUserDoc> {
    try {
        const user = await this.userRepository.findByEmail(email);
        if (!user) throw new NotFoundError("User not found with this email");
        
        const updatedUser = await this.userRepository.update({ email },{ name, country, profileImage });
        if (!updatedUser) throw new BadRequestError("Failed to update the user");

        return updatedUser;
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred while updating profile.");
    }
  }

// fetch all customers - admin
  async fetchAllCustomers(): Promise<IUserDoc[] | null> {
    try {
        const customers = await this.userRepository.fetchAllCustomers(Role.CUSTOMER);
        if (!customers || customers.length === 0) throw new NotFoundError("No customers found");

        return customers;
    } catch (error) {
        if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
        throw new Error("An unexpected error occurred while fetching customers.");
    }
  }

// fetch all property-owners - admin
  async fetchAllPropertyOwners(): Promise<IUserDoc[] | null> {
    try {
        const propertyOwners = await this.userRepository.fetchAllPropertyOwners(Role.PROPERTY_OWNER);
        if (!propertyOwners || propertyOwners.length === 0) throw new NotFoundError("No Property Owners found");

        return propertyOwners;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
      throw new Error("An unexpected error occurred while fetching customers.");
    }
  }

// fetch user using their ID
  async fetchByUserId(userId: string): Promise<IUserDoc | null> {
    try {
      const user = await this.userRepository.findByUserId(userId);
      if (!user) throw new NotFoundError("No user found with this accound.");

      return user;
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
      throw new Error("An unexpected error occurred while fetch user by ID.");
    }
  }

// updating the user status - block/unblock
  async updateUserStatus( userId: string, isBlocked: boolean ): Promise<IUserDoc | null> {
    try {
      return await this.userRepository.updateUserStatus(userId, isBlocked);
    } catch (error) {
      if (error instanceof NotFoundError || error instanceof BadRequestError || error instanceof NotAuthorizedError) throw error;
      throw new Error("An unexpected error occurred while updating status of the user.");
    }
  }
}
