/**
 * @file /middlewares/api/validators/send-two-step-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 27 May, 2024
 */

const { welcome, sendTwoStep } = require('../../../../mails');
const { User, Token } = require('../../../../models');
const { sendEmail } = require('../../../../utils');
const { generateRandomCode } = require('../../../../utils/global');

// dependencies

// export validate forgot password middleware
module.exports = async (req, res, next) => {
    const { email } = req.body;

    const user = User.findOne({ email, twoStepAuth: true });

    if (!user) {
        // proceed to next middleware
        return next();
    }

    const randomCode = generateRandomCode();

    const info = sendTwoStep({ user: user.toObject(), randomCode });

    // send email
    await sendEmail(
        info.to,
        info.subject,
        info.text,
        info.html,
        info.attachments,
        (err, info) => (err ? console.log(err) : console.log(info))
    );
};
