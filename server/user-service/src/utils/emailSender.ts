import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Role } from "../interfaces/IUserModel";

dotenv.config();

const EMAIL_SECRET = process.env.EMAIL_SECRET || "email-secret-key";
const EMAIL_EXPIRATION = "24h";

export class EmailService {
  static async sendVerificationMail(email: string): Promise<void> {
    const verificationToken = jwt.sign({ email }, EMAIL_SECRET, {
      expiresIn: EMAIL_EXPIRATION,
    });

    const verificationLink = `${process.env.FRONTEND_URL}/success-verification?token=${verificationToken}`;

    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Be My Guest" <no-reply@example.com>',
      to: email,
      subject: "Action Required: Verify Your Email to Access Be My Guest",
      html: `
        <div style=" 
          font-family: Arial, sans-serif; 
          max-width: 850px; 
          margin: 20px auto; 
          padding: 20px; 
          border: 1px solid #e0e0e0; 
          border-radius: 8px; 
          background-color: #F7F7F7;
          box-shadow: 0 4px 6px rgba(0,0,0,0.5);
        ">
          <!-- Header Section -->
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://i.imgur.com/WMUIknc.png" alt="Be My Guest Logo" style="
              max-width: 150px; 
              height: auto; 
              margin-bottom: 15px;
            " />
            <h2 style="
              color: #333; 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 10px;
            ">
              Activate Your Account
            </h2>
            <p style="
              font-size: 16px; 
              color: #555;
            ">
              You're just one step away from accessing your account.
            </p>
          </div>

          <!-- Message Body -->
          <div style="
            padding: 20px 30px; 
            background-color: #F7F7F7; 
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.5);
          ">
            <p style="
              font-size: 16px; 
              color: #555; 
              margin-bottom: 20px;
            ">
              Hello, 
            </p>
            <p style="
              font-size: 16px; 
              color: #555; 
              line-height: 1.6;
            ">
              Thanks for signing up with <strong>Be My Guest</strong>! To start exploring the best countryside experiences, please verify your email address by clicking the button below.
            </p>

            <div style="
              text-align: center; 
              margin: 30px 0;
            ">
              <a href="${verificationLink}" style="
                display: inline-block; 
                padding: 14px 32px; 
                background-color: #a855f7; 
                color: #fff; 
                text-decoration: none; 
                font-size: 16px; 
                font-weight: bold; 
                border-radius: 8px; 
                transition: background-color 0.3s ease;
              " 
              onmouseover="this.style.backgroundColor='#8a3ecf'"
              onmouseout="this.style.backgroundColor='#a855f7'">
                Verify Email Address
              </a>
            </div>

          </div>

          <!-- Footer Section -->
          <div style="
            text-align: center; 
            font-size: 12px; 
            color: #999; 
            margin-top: 20px;
          ">
            <p>This link will expire in 24 hours. If you did not request this email, please ignore it.</p>
            <p>Need help? <a href="mailto:developerbemyguest@gmail.com" style="color: #a855f7; text-decoration: none;">Contact Support</a></p>
          </div>

          <!-- Copyright Section -->
          <div style="
            text-align: center; 
            font-size: 12px; 
            color: #bbb; 
            margin-top: 10px;
          ">
            <p>© ${new Date().getFullYear()} Be My Guest. All rights reserved.</p>
          </div>
        </div>
      `,
    });
  }

  static async sendPasswordResetMail(email: string, role: Role): Promise<void> {
    const resetToken = jwt.sign({ email, role }, EMAIL_SECRET, {
      expiresIn: EMAIL_EXPIRATION,
    });

    const resetLink = `${process.env.FRONTEND_URL}/reset-password?token=${resetToken}`;

    const transporter = nodeMailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: '"Be My Guest" <no-reply@example.com>',
      to: email,
      subject: "Action Required: Reset Your Password for Be My Guest",
      html: `
        <div style=" 
          font-family: Arial, sans-serif; 
          max-width: 850px; 
          margin: 20px auto; 
          padding: 20px; 
          border: 1px solid #e0e0e0; 
          border-radius: 8px; 
          background-color: #F7F7F7;
          box-shadow: 0 4px 6px rgba(0,0,0,0.5);
        ">
          <!-- Header Section -->
          <div style="text-align: center; padding-bottom: 20px;">
            <img src="https://i.imgur.com/WMUIknc.png" alt="Be My Guest Logo" style="
              max-width: 150px; 
              height: auto; 
              margin-bottom: 15px;
            " />
            <h2 style="
              color: #333; 
              font-size: 24px; 
              font-weight: bold; 
              margin-bottom: 10px;
            ">
              Reset Your Password
            </h2>
            <p style="
              font-size: 16px; 
              color: #555;
            ">
              You requested to reset your password. Please click the button below to reset it.
            </p>
          </div>

          <!-- Message Body -->
          <div style="
            padding: 20px 30px; 
            background-color: #F7F7F7; 
            border-radius: 8px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.5);
          ">
            <div style="
              text-align: center; 
              margin: 30px 0;
            ">
              <a href="${resetLink}" style="
                display: inline-block; 
                padding: 14px 32px; 
                background-color: #a855f7; 
                color: #fff; 
                text-decoration: none; 
                font-size: 16px; 
                font-weight: bold; 
                border-radius: 8px; 
                transition: background-color 0.3s ease;
              " 
              onmouseover="this.style.backgroundColor='#8a3ecf'"
              onmouseout="this.style.backgroundColor='#a855f7'">
                Reset Password
              </a>
            </div>
            <p style="
              font-size: 14px; 
              color: #555; 
              line-height: 1.6;
              text-align: center;
            ">
              If you did not request this email, you can safely ignore it. This link will expire in 24 hours.
            </p>
          </div>

          <!-- Footer Section -->
          <div style="
            text-align: center; 
            font-size: 12px; 
            color: #999; 
            margin-top: 20px;
          ">
            <p>Need help? <a href="mailto:developerbemyguest@gmail.com" style="color: #a855f7; text-decoration: none;">Contact Support</a></p>
          </div>

          <!-- Copyright Section -->
          <div style="
            text-align: center; 
            font-size: 12px; 
            color: #bbb; 
            margin-top: 10px;
          ">
            <p>© ${new Date().getFullYear()} Be My Guest. All rights reserved.</p>
          </div>
        </div>
      `,
    });
  }
}
