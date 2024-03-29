/**
 * @file /routes/wallet/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 29 March 2024
 * @update_date 29 March 2024
 */

// dependencies
const express = require('express');

const router = express.Router();

// controllers
const {
    createWallet,
    getAllWallets,
    getWalletById,
    updateWalletById,
    deleteWalletById,
} = require('../../controllers');

// middlewares
const { isAuthorized } = require('../../middlewares/auth');
const { updateWalletByCustomerId } = require('../../controllers/customers');

/**
 * @description create wallet
 * @param {string} path - /wallet/create
 * @param {function} middleware - ['isAutorized']
 * @param {function} controller - ['wallet.createWallet']
 * @returns {object} - router
 * @access private
 * @method POST
 */
router.post('/create', isAuthorized, createWallet);

/**
 * @description get all wallets
 * @param {string} path - /wallet/
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['wallet.getAllWallets']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/', isAuthorized, getAllWallets);

/**
 * @description get wallet by mongo id
 * @param {string} path - /wallet/:id
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['wallet.getWalletById']
 * @returns {object} - router
 * @access private
 * @method GET
 */
router.get('/:id', isAuthorized, getWalletById);

/**
 * @description update wallet by mongo id
 * @param {string} path - /wallet/:id
 * @param {function} middleware - ['isAutorized']
 * @param {function} controller - ['wallet.updateWalletById']
 * @returns {object} - router
 * @access private
 * @method PATCH
 */
router.patch('/:id', isAuthorized, updateWalletById);

/**
 * @description update wallet by customer mongo id
 * @param {string} path - /wallet/customer/:id
 * @param {function} middleware - ['isAutorized']
 * @param {function} controller - ['wallet.updateWalletByCustomerId']
 * @returns {object} - router
 * @access private
 * @method PATCH
 */
router.patch('/customer/:id', isAuthorized, updateWalletByCustomerId);

/**
 * @description delete wallet by mongo id
 * @param {string} path - /wallet/:id
 * @param {function} middleware - ['isAuthorized']
 * @param {function} controller - ['wallet.deleteWalletById']
 * @returns {object} - router
 * @access private
 * @method DELETE
 */
router.delete('/:id', isAuthorized, deleteWalletById);

// export
module.exports = router;
