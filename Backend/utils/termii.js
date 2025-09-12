import axios from "axios";
import { TERMII_API_KEY, TERMII_TOKEN_URL, TERMII_VERIFY_URL } from '../config/env.js'

/**
 * Send verification token (OTP) to users via sms
 * @param {string} phone - recipient’s phone number in international format (e.g., 2348123456789)
*/

const sendVerificationToken = async (phone) => {
    try {

        // normalize phone number
        let formattedPhone = phone;
        if (formattedPhone.startsWith("0")) {
            formattedPhone = "234" + formattedPhone.slice(1);
        }
        if (formattedPhone.startsWith("+")) {
            formattedPhone = formattedPhone.slice(1); // remove "+"
        }

        if (!phone) {
            throw new Error("Phone number is required");
        }


        const payload = {
            api_key: TERMII_API_KEY,
            pin_type: "NUMERIC",
            pin_attempts: 3,
            pin_time_to_live: 10,
            pin_length: 6,
            pin_placeholder: "< 123456 >",
            message_text: "Your KCWinners reset code is < 123456 >",
            channel: "dnd",
            to: phone,
            from: "KCWinners"     // must match your approved Termii sender ID
        };

        console.log("Sending payload to Termii:", payload);

        const { data } = await axios.post(
        TERMII_TOKEN_URL,
        payload,
        { headers: { "Content-Type": "application/json" } }
        );

        console.log("Termii Response:", data);
        return data;

    } catch (error) {
        if (error.response) {
            // Server responded with error (400, 401, etc)
            console.error("❌ Termii API Error Response:", error.response.data);
        } else {
            // Network or unexpected error
            console.error("❌ Termii Request Failed:", error.message);
        }
        throw error;

    }
}

const verifyToken = async (pin, pin_id) => {
    try {
        const response = await axios.post(TERMII_VERIFY_URL, {
            api_key: TERMII_API_KEY,
            pin_id, // returned from sendVerificationToken
            pin       // the OTP user enters
        });

        return response.data
    } catch (error) {
        console.error("Error verifying token:", error.response?.data || error.message);
        throw new Error("Failed to verify token");
    }
}

export  {
    sendVerificationToken,
    verifyToken
}