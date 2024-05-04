/**
 * @file /routes/umrah/extranets/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 04 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getUmrahExtranets,
    getUmrahExtranet,
    createUmrahExtranet,
    updateUmrahExtranet,
    deleteUmrahExtranet,
} = require('../../../controllers/umrah/extranets');

// middlewares
const { isAuthorized, isAllowed } = require('../../../middlewares/auth');
const {
    validateUmrahExtranetTumbnail,
    validateUmrahExtranetGallery,
    validateMakkahHotelTumbnail,
    validateMakkahHotelGallery,
    validateMadinahHotelTumbnail,
    validateMadinahHotelGallery,
    validateUmrahPackageThumbnail,
    validateUmrahExtranetId,
    validateUmrahExtranet,
} = require('../../../middlewares/validators/umrah/extranets');
const {
    uploadExtranetThumbnail,
    uploadExtranetGallery,
    uploadExtranetMakkaHotelThumbnail,
    uploadExtranetMakkaHotelGallery,
    uploadExtranetMadinahHotelThumbnail,
    uploadExtranetMadinahHotelGallery,
    uploadExtranetUmrahPackageThumbnail,
} = require('../../../middlewares/umrah/extranets');

/**
 * @description check if user is authorized
 * @param {string} path - /customers
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all umrah extranets packages
 * @param {string} path - /umrah/extranets
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getUmrahExtranets']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isAllowed(['admin']), getUmrahExtranets);

/**
 * @description get umrah extranet package
 * @param {string} path - /umrah/extranets/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahExtranetId']
 * @param {function} controller - ['getUmrahExtranet']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id', isAllowed(['admin']), validateUmrahExtranetId, getUmrahExtranet);

/**
 * @description create umrah extranet package
 * @param {string} path - /umrah/extranets
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahExtranetTumbnail', 'validateUmrahExtranetGallery']
 * @param {function} validator - ['validateMakkahHotelTumbnail', 'validateMakkahHotelGallery']
 * @param {function} validator - ['validateMadinahHotelTumbnail', 'validateMadinahHotelGallery']
 * @param {function} validator - ['validateUmrahPackageThumbnail']
 * @param {function} middleware - ['uploadExtranetThumbnail', 'uploadExtranetGallery']
 * @param {function} middleware - [
 * 'uploadExtranetMakkaHotelThumbnail', 'uploadExtranetMakkaHotelGallery'
 * ]
 * @param {function} middleware - [
 * 'uploadExtranetMadinahHotelThumbnail', 'uploadExtranetMadinahHotelGallery'
 * ]
 * @param {function} middleware - ['uploadExtranetUmrahPackageThumbnail']
 * @param {function} validator - ['validateUmrahExtranet']
 * @param {function} controller - ['createUmrahExtranet']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post(
    '/',
    isAllowed(['admin']),
    validateUmrahExtranetTumbnail,
    validateUmrahExtranetGallery,
    validateMakkahHotelTumbnail,
    validateMakkahHotelGallery,
    validateMadinahHotelTumbnail,
    validateMadinahHotelGallery,
    validateUmrahPackageThumbnail,
    uploadExtranetThumbnail,
    uploadExtranetGallery,
    uploadExtranetMakkaHotelThumbnail,
    uploadExtranetMakkaHotelGallery,
    uploadExtranetMadinahHotelThumbnail,
    uploadExtranetMadinahHotelGallery,
    uploadExtranetUmrahPackageThumbnail,
    validateUmrahExtranet,
    createUmrahExtranet
);

/**
 * @description update umrah extranet package
 * @param {string} path - /umrah/extranets/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahExtranetId', 'validateUmrahExtranetTumbnail']
 * @param {function} validator - ['validateUmrahExtranetGallery', 'validateMakkahHotelTumbnail']
 * @param {function} validator - ['validateMakkahHotelGallery', 'validateMadinahHotelTumbnail']
 * @param {function} validator - ['validateMadinahHotelGallery', 'validateUmrahPackageThumbnail']
 * @param {function} middleware - ['uploadExtranetThumbnail', 'uploadExtranetGallery']
 * @param {function} middleware - [
 * 'uploadExtranetMakkaHotelThumbnail', 'uploadExtranetMakkaHotelGallery'
 * ]
 * @param {function} middleware - [
 * 'uploadExtranetMadinahHotelThumbnail', 'uploadExtranetMadinahHotelGallery'
 * ]
 * @param {function} middleware - ['uploadExtranetUmrahPackageThumbnail']
 * @param {function} validator - ['validateUmrahExtranet']
 * @param {function} controller - ['updateUmrahExtranet']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAllowed(['admin']),
    validateUmrahExtranetId,
    validateUmrahExtranetTumbnail,
    validateUmrahExtranetGallery,
    validateMakkahHotelTumbnail,
    validateMakkahHotelGallery,
    validateMadinahHotelTumbnail,
    validateMadinahHotelGallery,
    validateUmrahPackageThumbnail,
    uploadExtranetThumbnail,
    uploadExtranetGallery,
    uploadExtranetMakkaHotelThumbnail,
    uploadExtranetMakkaHotelGallery,
    uploadExtranetMadinahHotelThumbnail,
    uploadExtranetMadinahHotelGallery,
    uploadExtranetUmrahPackageThumbnail,
    validateUmrahExtranet,
    updateUmrahExtranet
);

/**
 * @description delete umrah extranet package
 * @param {string} path - /umrah/extranets/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahExtranetId']
 * @param {function} controller - ['deleteUmrahExtranet']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete('/:id', isAllowed(['admin']), validateUmrahExtranetId, deleteUmrahExtranet);

// export router
module.exports = router;
