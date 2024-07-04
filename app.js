/* eslint-disable no-unused-vars */
/**
 * @file /app.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 04 Jul, 2024
 */

// dependencies
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

// constants
const { WHITE_LIST } = require('./constants');

// utils
const { notFound, routeUrl, errorHandler } = require('./middlewares/utils');

// config
const {
    mongoDB,
    env,
    expressFileUploadConf,
    cspDirectives,
    ipInfo,
} = require('./config');

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
app.use(routeUrl);

// routes
app.use('/api', require('./routes/api'));
app.use('/dashboard', require('./routes/dashboard'));

// catch 404 and forward to error handler
app.use(notFound);

// error handler
app.use(errorHandler);

module.exports = app;
