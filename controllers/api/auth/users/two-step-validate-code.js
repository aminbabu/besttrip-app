/**
 * @file /controllers/api/auth/users/two-step-validate-code.js
 * @project best-trip
 * @version 0.1.0
 * @author best-trip
 * @date 16 June, 2024
 * @update_date 16 June, 2024
 */

// Dependencies
const { User } = require('../../../../models');

// Two-step authentication validation controller
module.exports = async (req, res, next) => {
    try {
        // Extract the code and email from the request body
        const { code, email } = req.body;

        // Verify if a user with the provided email and two-step code exists
        const user = await User.findOne({ email, twoStepCode: code });

        // If the user is not found, return a 404 error with a relevant message
        if (!user) {
            return res.status(404).json({
                message: 'Invalid code. Please try again.',
            });
        }

        // Check if the code is still valid
        if (user.twoStepCodeValidity && new Date() > user.twoStepCodeValidity) {
            return res.status(400).json({
                message:
                    'The verification code has expired. Please request a new code.',
            });
        }

        // Clear the two-step code and its validity from the user's record
        user.twoStepCode = '';
        user.twoStepCodeValidity = '';

        // Save the updated user document
        await user.save();

        // Respond with a success message indicating the current 2FA status
        return res.status(200).json({
            message: `Two-factor authentication successfully.`,
            user,
        });
    } catch (error) {
        // Pass any errors to the next middleware or error handler
        return next(error);
    }
};
