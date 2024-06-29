/**
 * @file /utils/send-email.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 29 June, 2024
 */

// dependencies
const nodemailer = require("nodemailer");
const { env } = require("../../config");

// send email
const sendEmail = async function (
  to,
  subject = "",
  text = "",
  html = "",
  attachments = [],
  callback = () => {}
) {
  // create transporter
  const transporter = nodemailer.createTransport({
    host: env.EMAIL_HOST,
    port: env.EMAIL_PORT,
    secure: env.EMAIL_PORT === 465,
    auth: {
      user: env.EMAIL_USERNAME,
      pass: env.EMAIL_PASSWORD,
    },
  });

  // mail options
  const mailOptions = {
    from: `${env.APP_NAME} <${env.EMAIL_FROM}>`,
    to,
    subject,
    text,
    html,
    attachments,
  };

  // send mail
  try {
    const info = await transporter.sendMail(mailOptions);
    console.log("Mail sent successfully as %s", info.messageId);

    return callback(null, info);
  } catch (error) {
    console.error(error);
    return process.exit(1);
  }
};

// export module
module.exports = sendEmail;
