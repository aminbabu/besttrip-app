/**
 * @file /models/customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 18 March, 2024
 * @update_date 23 June, 2024
 */

// dependencies
const { model } = require("mongoose");
const bcrypt = require("bcrypt");
const moment = require("moment");
const { customerSchema } = require("../schemas/mongoose");
const { Wallet } = require("./wallet");

// hash password before saving
customerSchema.pre("save", async function (next) {
  try {
    // check if password is not modified
    if (!this.isModified("password")) {
      return next();
    }

    // hash password
    this.password = await bcrypt.hash(this.password, 10);

    return next();
  } catch (error) {
    return next(error);
  }
});

// generate customer id before saving
customerSchema.pre("save", async function (next) {
  try {
    // check if customer is new
    if (!this.isNew) {
      return next();
    }

    // Get the last customer ID if any
    const lastCustomer = await this.constructor.findOne(
      {},
      {},
      { sort: { createdAt: -1 } }
    );

    // get count from the last customer ID if any or set to 0
    let count = lastCustomer
      ? parseInt(lastCustomer.customerID.slice(11), 10)
      : 0;

    // check pad count with 0 if less than 4 digits and increment by 1
    count = count > 9999 ? count + 1 : (count + 1).toString().padStart(4, "0");

    // customer ID based on date (YYYYMMDD) and count (0001, 0002, ...) with prefix 'BTC'
    this.customerID = `BTC${moment().format("YYYYMMDD")}${count}`;

    return next();
  } catch (error) {
    return next(error);
  }
});

// manage customer wallet before saving
customerSchema.pre("save", async function (next) {
  try {
    // check if customer is new
    if (!this.isNew) {
      return next();
    }

    // create wallet for customer
    const wallet = new Wallet({
      customer: this._id,
    });

    // save wallet
    await wallet.save();

    // set wallet id
    this.wallet = wallet._id;

    return next();
  } catch (error) {
    return next(error);
  }
});

// export model
module.exports = model("Customer", customerSchema);
