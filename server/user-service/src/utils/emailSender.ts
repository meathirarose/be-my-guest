import nodeMailer from "nodemailer";
import jwt from "jsonwebtoken";


const EMAIL_SECRET = process.env.EMAIL_SECRET || 'email-secret-key';
const EMAIL_EXPIRATION = '24h'

export class EmailService {
  static async sendVerificationMail(email: string): Promise<void> {
      console.log(process.env.EMAIL_SECRET, "EMAIL SENDER---------------------------------")  
      console.log("get mail----------------------------------------------------")
      console.log(EMAIL_SECRET, "email sender--------------------------------------------")
        const verificationToken = jwt.sign({email}, EMAIL_SECRET, {
            expiresIn: EMAIL_EXPIRATION
        });
        console.log(verificationToken, "verification token-----------------------------------------")

        const verificationLink = `${process.env.FRONTEND_URL}/success-verification?token=${verificationToken}`;
        const transporter = nodeMailer.createTransport({
            service: 'Gmail',
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASSWORD
            },
        });

        await transporter.sendMail({
            from: '"be-my-guest" <no-reply@example.com>',
            to: email,
            subject: "Verify your Email",
            html: `
              <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; padding: 20px; border: 1px solid #ddd; border-radius: 5px;">  
                <div style="text-align: center;">  
                  <img src="https://i.imgur.com/WMUIknc.png" alt="Your Company Logo" style="max-width: 200px; height: auto; margin-bottom: 20px;" />  
                </div>  
                <h2 style="text-align: center;">Please verify your email address to activate your account!</h2>  
                <p style="text-align: center;">Thanks for signing up with us!</p>  
                <p style="text-align: center;">Please click the button below to verify your email address and activate your account.</p>  
                <div style="text-align: center; margin: 20px;">  
                  <a href="${verificationLink}" style="display: inline-block; padding: 15px 30px; background-color: #007BFF; color: white; text-decoration: none; border-radius: 5px; font-size: 16px;">Verify Email Address</a>  
                </div>  
                <p style="text-align: center; font-size: 12px; color: #555;">Please note this link will expire within 24 hours.</p>  
              </div>
            `,
        });
    }
}