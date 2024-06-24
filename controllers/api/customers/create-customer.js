/**
 * @file /controllers/api/customers/create-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2024
 * @update_date 24 June, 2024
 */

// dependencies
const { CUSTOMER_DEFAULT_PASSWORD } = require("../../../constants");
const { welcome } = require("../../../mails");
const { Customer, Token } = require("../../../models");
const { sendEmail, generateToken } = require("../../../utils");

// export create customer controller
module.exports = async (req, res, next) => {
  try {
    // get validated data
    const validatedData = req.body;

    // get customer by email or phone
    const customer = await Customer.findOne({
      $or: [{ email: validatedData.email }, { phone: validatedData.phone }],
    });

    console.log("customer", validatedData, customer);

    // check if customer already exists
    if (customer) {
      return res.status(400).json({
        message: "Customer already exists",
      });
    }

    // create customer
    const newCustomer = new Customer({
      ...validatedData,
      password: CUSTOMER_DEFAULT_PASSWORD,
    });

    // delete existing expired tokens
    await Token.deleteMany({
      customer: newCustomer._id,
      type: "verify-email",
      expiresAt: { $lt: new Date() },
    });

    // generate token
    const token = generateToken(newCustomer.toObject());

    // store token in db
    const tokenDoc = new Token({
      customer: newCustomer._id,
      token,
      type: "verify-email",
    });

    // prepare email
    const info = welcome({ user: newCustomer.toObject(), token });

    // save customer
    await newCustomer.save();

    // save token
    await tokenDoc.save();

    // send email
    await sendEmail(
      info.to,
      info.subject,
      info.text,
      info.html,
      info.attachments
    );

    // return response
    return res.status(201).json({
      message: "Created customer successfully",
      customer,
    });
  } catch (error) {
    return next(error);
  }
};
