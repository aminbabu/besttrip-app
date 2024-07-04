/**
 * @file /mails/forgot-password.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const fs = require('fs');
const ejs = require('ejs');
const { env } = require('../config');

// export forgot password
module.exports = ({ user, token }) => {
    let redirectTo;
    const appUrl =
        env.NODE_ENV === 'development'
            ? `${env.APP_URL}:${env.PORT}`
            : env.APP_URL;

    // read template file
    const template = fs.readFileSync(
        `${__dirname}/../templates/email/reset-password.ejs`,
        'utf-8'
    );

    // set redirect url
    if (user.role === 'customer') {
        redirectTo = `${appUrl}/auth/customers/reset-password?token=${token}`;
    } else {
        redirectTo = `${appUrl}/dashboard/auth/reset-password?token=${token}`;
    }

    // compile template
    const html = ejs.render(template, {
        title: 'Reset Password',
        company: {
            name: env.APP_NAME,
            address: '123, Best Trip Street, Best Trip City',
            phone: '+1234567890',
            email: env.EMAIL_FROM,
            website: `${appUrl}`,
        },
        user,
        redirectTo,
    });

    // attachments
    const attachments = [
        {
            filename: 'favicon.ico',
            path: `${__dirname}/../public/assets/media/logos/favicon.ico`,
            cid: 'favicon',
        },
        {
            filename: 'logo-1.svg',
            path: `${__dirname}/../public/assets/media/email/logo-1.svg`,
            cid: 'logo',
        },
        {
            filename: 'icon-positive-vote-2.svg',
            path: `${__dirname}/../public/assets/media/email/icon-positive-vote-2.svg`,
            cid: 'positiveVote',
        },
        {
            filename: 'icon-linkedin.svg',
            path: `${__dirname}/../public/assets/media/email/icon-linkedin.svg`,
            cid: 'linkedin',
        },
        {
            filename: 'icon-dribbble.svg',
            path: `${__dirname}/../public/assets/media/email/icon-dribbble.svg`,
            cid: 'dribbble',
        },
        {
            filename: 'icon-facebook.svg',
            path: `${__dirname}/../public/assets/media/email/icon-facebook.svg`,
            cid: 'facebook',
        },
        {
            filename: 'icon-twitter.svg',
            path: `${__dirname}/../public/assets/media/email/icon-twitter.svg`,
            cid: 'twitter',
        },
    ];

    // return mail options
    return {
        from: env.EMAIL_FROM,
        to: user.email,
        subject: `Reset Your ${env.APP_NAME} Password`,
        text: `Reset your password to ${env.APP_NAME} by clicking the link below`,
        html,
        attachments,
    };
};
