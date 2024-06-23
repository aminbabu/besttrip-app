/**
 * @file /controllers/api/customers/create-customer.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2024
 * @update_date 23 June, 2024
 */

// dependencies
const { CUSTOMER_DEFAULT_PASSWORD } = require("../../../constants");
const { Customer } = require("../../../models");

// export create customer controller
module.exports = async (req, res, next) => {
  try {
    // get validated data
    const validatedData = req.body;

    // create customer
    const customer = new Customer({
      ...validatedData,
      password: CUSTOMER_DEFAULT_PASSWORD,
    });

    // save customer
    await customer.save();

    // return response
    return res.status(201).json({
      message: "Created customer successfully",
      customer,
    });
  } catch (error) {
    return next(error);
  }
};
