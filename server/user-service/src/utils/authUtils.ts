import { OAuth2Client } from "google-auth-library";
import dotenv from "dotenv";

dotenv.config();

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID); 

export const verifyGoogleToken = async (idToken: string) => {
    try {
        const ticket = await client.verifyIdToken({
            idToken,
            audience: process.env.GOOGLE_CLIENT_ID,  
        });

        const payload = ticket.getPayload();
        if (!payload) {
            throw new Error("Failed to retrieve payload from token!");
        }

        console.log("Token Payload:", payload);  

        // Check if the audience matches
        if (payload.aud !== process.env.GOOGLE_CLIENT_ID) {
            throw new Error("Invalid audience in Google token");
        }

        return payload;
    } catch (error) {
        console.error("Error verifying Google token:", error);
        throw new Error("Invalid Google token");
    }
};

