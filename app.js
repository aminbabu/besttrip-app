/* eslint-disable no-unused-vars */
/**
 * @file /app.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 09 May, 2024
 */

// dependencies
const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const helmet = require('helmet');
const { default: xssInstance } = require('xss-shield');
const cors = require('cors');
const expressFileUpload = require('express-fileupload');

// config
const { createDBConnection, env, expressFileUploadConf } = require('./config');

// constants
const { WHITE_LIST } = require('./constants');

// config
dotenv.config();

// app
const app = express();

// database connection
createDBConnection();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// middlewares
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser(env.COOKIE_SECRET));
app.use(express.static(path.join(__dirname, 'public')));
app.use(helmet());
app.use(cors());
app.use(expressFileUpload(expressFileUploadConf));
app.use(xssInstance.xssShield(WHITE_LIST));

// routes
app.use('/auth/users', require('./routes/auth/users'));
app.use('/auth/customers', require('./routes/auth/customers'));
app.use('/users', require('./routes/users'));
app.use('/customers', require('./routes/customers'));
app.use('/settings/site/general', require('./routes/settings/site/general'));
app.use('/settings/site/contact', require('./routes/settings/site/contact'));
app.use('/settings/site/policy', require('./routes/settings/site/policy'));
app.use('/settings/site/meta', require('./routes/settings/site/meta'));
app.use('/settings/payments', require('./routes/settings/payments'));
app.use('/settings/content/sections', require('./routes/settings/content/sections'));
app.use(
    '/settings/content/exclusive-offers',
    require('./routes/settings/content/exclusive-offers')
);
app.use('/settings/content/hotel-offers', require('./routes/settings/content/hotel-offers'));
app.use('/settings/content/flight-offers', require('./routes/settings/content/flight-offers'));
app.use('/settings/content/umrah-offers', require('./routes/settings/content/umrah-offers'));
app.use('/settings/content/blog-posts', require('./routes/settings/content/blog-posts'));
app.use('/settings/themes', require('./routes/settings/themes'));
app.use('/payment-requests', require('./routes/payment-requests'));
app.use('/umrah/packages', require('./routes/umrah/packages'));
app.use('/umrah/package-durations', require('./routes/umrah/package-durations'));
app.use('/umrah/package-types', require('./routes/umrah/package-types'));

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // send error response
    return res.status(err.status || 500).json({
        message: err.message,
    });

    // render the error page
    // return res.status(err.status || 500).render('error');
});

module.exports = app;
