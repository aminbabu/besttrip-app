/**
 * @file controllers/dashboard/customers/view-customers.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 14 June, 2024
 * @update_date 23 June, 2024
 */

// dependencies
const { countries } = require("countries-list");
const { Customer } = require("../../../models");
const moment = require("moment");

// export customers view controller
module.exports = async (req, res) => {
  try {
    // get customers
    let customers = await Customer.find()
      .populate("wallet")
      .sort({ createdAt: -1 });

    // formate data
    customers = customers.map((customer) => {
      const customerObj = { ...customer.toObject() };

      customerObj.createdAt = moment(customer.createdAt).format(
        "DD MMM YYYY, h:mm a"
      );

      return customerObj;
    });

    // return render view
    return res.render("dashboard/customers", {
      title: "Customers",
      user: req.user,
      customers,
      countries: Object.values(countries),
    });
  } catch (error) {
    return res.redirect("/error/500");
  }
};
