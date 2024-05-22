/**
 * @file /middlewares/global/csp.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 May, 2024
 * @update_date 22 May, 2024
 */

// export csp middleware
module.exports = (req, res, next) => {
    // allow google fonts, google analytics and google tag manager,
    // inlined scripts and styles, eval and self

    // set csp header
    res.setHeader(
        'Content-Security-Policy',
        "default-src 'self'; font-src 'self' https://fonts.gstatic.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://www.google-analytics.com; connect-src 'self' https://www.google-analytics.com; frame-src 'self' https://www.googletagmanager.com;"
    );

    next();
};
