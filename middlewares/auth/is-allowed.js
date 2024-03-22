/**
 * @file /middlewares/auth/is-allowed.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 March 2024
 * @update_date 22 March 2024
 */

// dependencies
const { User } = require("../../models");

// is allowed middleware
module.exports =
  (roles = ["admin"]) =>
  async (req, res, next) => {
    try {
      // get user id from request
      const { _id } = req.user;

      // get user by id
      const user = await User.findById(_id);

      // check if user is allowed
      if (!roles.includes(user.role)) {
        return res.status(403).json({
          message: "You are not allowed to access this resource",
        });
      }

      // continue
      next();
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: "Internal server error",
      });
    }
  };
