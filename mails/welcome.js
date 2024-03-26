/**
 * @file /mails/welcome.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const fs = require('fs');
const ejs = require('ejs');
const { APP_NAME, EMAIL_FROM, APP_URL, PORT } = require('../utils/env');

// welcome mail
const welcome = ({ user, token }) => {
    // read template file
    const template = fs.readFileSync(
        `${__dirname}/../templates/email/welcome-message.ejs`,
        'utf-8'
    );

    // compile template
    const html = ejs.render(template, {
        company: {
            name: APP_NAME,
            address: '123, Best Trip Street, Best Trip City',
            phone: '+1234567890',
            email: EMAIL_FROM,
            website: `${APP_URL}:${PORT}`,
        },
        user,
        redirectTo: `${APP_URL}/auth/verify-email?token=${token}`,
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
        subject: `Welcome to ${APP_NAME}`,
        text: `Welcome to ${APP_NAME}, ${user?.name}. Please verify your email by clicking the link below.`,
        html,
        attachments,
    };
};

// export
module.exports = welcome;
