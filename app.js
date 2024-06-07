/* eslint-disable no-unused-vars */
/**
 * @file /app.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 07 June, 2024
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
const { expressCspHeader } = require('express-csp-header');
const { default: ipinfo } = require('ipinfo-express');

// config
const { mongoDB, env, expressFileUploadConf, cspDirectives, ipInfo } = require('./config');

// constants
const { WHITE_LIST } = require('./constants');

// dotenv config
dotenv.config();

// app
const app = express();

// database connection
mongoDB.connect();

// trust proxy
app.set('trust proxy', true);

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
app.use(expressCspHeader(cspDirectives));
app.use(ipinfo(ipInfo));

// routes
app.use('/api', require('./routes/api'));
app.use('/dashboard', require('./routes/dashboard'));

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
