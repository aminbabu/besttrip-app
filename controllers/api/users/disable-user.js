/**
 * @file /controllers/api/users/disable-user.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 22 June, 2024
 * @update_date 22 June, 2024
 */

// dependencies
const { User } = require("../../../models");

// export disable user controller
module.exports = async (req, res, next) => {
  try {
    // get user id
    const { id } = req.params;

    // find user
    const user = await User.findById(id);

    // check if user exists
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // set user status to disabled
    user.set({ status: "disabled" });

    // save user
    await user.save();

    // return response
    return res.json({ message: "Disabled user successfully", user });
  } catch (error) {
    return next(error);
  }
};
