import axios from 'axios'
import { TERMII_API_KEY, TERMII_VERIFY_URL } from './env.js'

const verifyToken = async (pin, pinId) => {
    try {
        const response = await axios.post(TERMII_VERIFY_URL, {
            api_key: TERMII_API_KEY,
            pin_id: pinId, // returned from sendVerificationToken
            pin: pin       // the OTP user enters
        });

        return response.data
    } catch (error) {
        console.error("Error verifying token:", error.response?.data || error.message);
        throw new Error("Failed to verify token");
    }
}

export default verifyToken;