/**
 * @file /mails/confirm-email-verification.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 21 March, 2024
 * @update_date 09 June, 2024
 */

// dependencies
const fs = require('fs');
const ejs = require('ejs');
const { env } = require('../config');

// export confirm email verification mail
module.exports = async (user) => {
    let redirectTo;
    const appUrl =
        env.NODE_ENV === 'development'
            ? `${env.APP_URL}:${env.PORT}`
            : env.APP_URL;

    // read template file
    const template = fs.readFileSync(
        `${__dirname}/../templates/email/confirm-email-verification.ejs`,
        'utf-8'
    );

    // set redirect url
    if (user.role === 'customer') {
        redirectTo = `${appUrl}/auth/customers/login`;
    } else {
        redirectTo = `${appUrl}/dashboard/auth/login`;
    }

    // compile template
    const html = ejs.render(template, {
        title: 'Email Verification Confirmation',
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
            filename: 'icon-positive-vote-1.svg',
            path: `${__dirname}/../public/assets/media/email/icon-positive-vote-1.svg`,
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
        to: user?.email,
        subject: 'Email Verification Confirmation - Best Trip',
        text: 'Email verification has been successful. You can now login to your account',
        html,
        attachments,
    };
};
