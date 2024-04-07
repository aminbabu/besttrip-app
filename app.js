/* eslint-disable no-unused-vars */
/**
 * @file /app.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 07 April, 2024
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

// routers
const multer = require('multer');
const { authRouter, customersRouter, settingsRouter } = require('./routes/index');
const { WHITE_LIST } = require('./constants');
const { env } = require('./utils');

// config
dotenv.config();

// app
const app = express();

// database connection
require('./config/database')();

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
app.use(xssInstance.xssShield(WHITE_LIST));
app.use(cors());

// routes
app.use('/auth', authRouter);
app.use('/customers', customersRouter);
app.use('/settings', settingsRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    next(createError(404));
});

// error handler
app.use((err, req, res, next) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // check if error is a multer error
    if (err instanceof multer.MulterError) {
        return res.status(400).json({
            status: 400,
            message: err.field || err.message,
        });
    }

    // render the error page
    return res.status(err.status || 500).json({
        status: err.status || 500,
        message: err.message,
    });
});

module.exports = app;
