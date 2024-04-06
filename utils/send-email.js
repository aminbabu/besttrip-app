/**
 * @file /utils/send-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 22 March, 2024
 */

// dependencies
const nodemailer = require('nodemailer');
const {
    EMAIL_FROM,
    EMAIL_PASSWORD,
    EMAIL_USERNAME,
    EMAIL_HOST,
    EMAIL_PORT,
    APP_NAME,
} = require('./env');

// send email
const sendEmail = async function (
    to,
    subject = '',
    text = '',
    html = '',
    attachments = [],
    callback = () => {}
) {
    // create transporter
    const transporter = nodemailer.createTransport({
        host: EMAIL_HOST,
        port: EMAIL_PORT,
        auth: {
            user: EMAIL_USERNAME,
            pass: EMAIL_PASSWORD,
        },
    });

    // mail options
    const mailOptions = {
        from: `${APP_NAME} <${EMAIL_FROM}>`,
        to,
        subject,
        text,
        html,
        attachments,
    };

    // send mail
    try {
        const info = await transporter.sendMail(mailOptions);
        console.log('Mail sent successfully as %s', info.messageId);

        return callback(null, info);
    } catch (error) {
        console.error(error);
        return process.exit(1);
    }
};

// export module
module.exports = sendEmail;
