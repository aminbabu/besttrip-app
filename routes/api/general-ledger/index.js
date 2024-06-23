/**
 * @file routes/api/general-ledger/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 23 June, 2021
 * @update_date 23 June, 2021
 */

// dependencies
const express = require("express");

// express router
const router = express.Router();

// controllers
const {
  getGeneralLedger,
  getGeneralLedgerById,
  createGeneralLedger,
  updateGeneralLedger,
  deleteGeneralLedger,
} = require("../../../controllers/api/general-ledger");

// middlewares
const { isAuthorized, isAllowed } = require("../../../middlewares/api/auth");
const {
  validateGeneralLedgerId,
  validateGeneralLedger,
} = require("../../../middlewares/api/validators/general-ledger");

/**
 * @description check if user is authorized
 * @param {string} path - /api/general-ledger
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get general ledger
 * @param {string} path - /api/general-ledger
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getGeneralLedger']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get("/", isAllowed(["admin"]), getGeneralLedger);

/**
 * @description get general ledger by id
 * @param {string} path - /api/general-ledger/:id
 * @param {function} middleware - ['validateGeneralLedgerId']
 * @param {function} controller - ['getGeneralLedgerById']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get("/:id", validateGeneralLedgerId, getGeneralLedgerById);

/**
 * @description create general ledger
 * @param {string} path - /api/general-ledger
 * @param {function} middleware - ['validateGeneralLedger']
 * @param {function} controller - ['createGeneralLedger']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post("/", validateGeneralLedger, createGeneralLedger);

/**
 * @description update general ledger
 * @param {string} path - /api/general-ledger/:id
 * @param {function} middleware - ['validateGeneralLedgerId', 'validateGeneralLedger']
 * @param {function} controller - ['updateGeneralLedger']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
  "/:id",
  validateGeneralLedgerId,
  validateGeneralLedger,
  updateGeneralLedger
);

/**
 * @description delete general ledger
 * @param {string} path - /api/general-ledger/:id
 * @param {function} middleware - ['validateGeneralLedgerId']
 * @param {function} controller - ['deleteGeneralLedger']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete("/:id", validateGeneralLedgerId, deleteGeneralLedger);

// export router
module.exports = router;
