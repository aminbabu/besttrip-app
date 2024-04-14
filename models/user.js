/**
 * @file /models/user.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 14 April, 2024
 */

// dependencies
const { model } = require('mongoose');
const bcrypt = require('bcrypt');
const moment = require('moment');
const { userSchema } = require('../schemas/mongoose');

// hash password before saving
userSchema.pre('save', async function (next) {
    try {
        // check if password is modified
        if (!this.isModified('password')) {
            return next();
        }

        // hash password
        this.password = await bcrypt.hash(this.password, 10);

        return next();
    } catch (error) {
        return next(error);
    }
});

// generate user id before saving
userSchema.pre('save', async function (next) {
    try {
        // check if user is new
        if (!this.isNew) {
            return next();
        }

        // Get the last user ID if any
        const lastUser = await this.constructor.findOne({}, {}, { sort: { createdAt: -1 } });

        // get count from the last user ID if any or set to 0
        let count = lastUser ? parseInt(lastUser.userID.slice(11), 10) : 0;

        // check pad count with 0 if less than 4 digits and increment by 1
        count = count > 9999 ? count + 1 : (count + 1).toString().padStart(4, '0');

        // user ID based on date (YYYYMMDD) and count (0001, 0002, ...) with prefix 'BT'
        this.userID = `BT${moment().format('YYYYMMDD')}${count}`;

        return next();
    } catch (error) {
        return next(error);
    }
});

// export model
module.exports = model('User', userSchema);
