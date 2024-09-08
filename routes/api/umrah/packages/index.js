/**
 * @file /routes/api/umrah/packages/index.js
 * @project best-trip
 * @version 0.0.0
 * @author best-trip
 * @date 25 April, 2024
 * @update_date 18 May, 2024
 */

// dependencies
const express = require('express');

// express router
const router = express.Router();

// controllers
const {
    getUmrahPackages,
    getUmrahPackage,
    getUmrahPackageCustomer,
    createUmrahPackage,
    updateUmrahPackage,
    deleteUmrahPackage,
    getUmrahPackagesForCustomers,
    duplicatePackage,
} = require('../../../../controllers/api/umrah/packages');

// middlewares
const { isAuthorized, isAllowed } = require('../../../../middlewares/api/auth');
const {
    validateUmrahPackageId,
    validateUmrahPackagesForCustomers,
    validateUmrahPackageThumbnail,
    validateUmrahPackage,
    validateUmrahPackageGallery,
    validateUmrahOutbound,
    validateMakkahHotelTumbnail,
    validateMakkahHotelGallery,
    validateMakkahHotel,
    validateMadinahHotelTumbnail,
    validateMadinahHotelGallery,
    validateMadinahHotel,
    validateUmrahInbound,
    validateUmrahVisa,
    validateUmrahTransportation,
    validateUmrahZiyarah,
    validateDayWiseItineraryThumbnails,
    validateUmrahDayWiseItinerary,
    validateUmrahThumbnail,
    validateUmrah,
    validateTermsAndConditions,
} = require('../../../../middlewares/api/validators/umrah/packages');
const {
    uploadPackageThumbnail,
    uploadPackageGallery,
    uploadMakkahHotelThumbnail,
    uploadMakkahHotelGallery,
    uploadMadinahHotelThumbnail,
    uploadMadinahHotelGallery,
    uploadUmrahDayWiseItineraryThumbnails,
    uploadUmrahThumbnail,
} = require('../../../../middlewares/api/umrah/packages');

/**
 * @description get all umrah packages for customers
 * @param {string} path - /umrah/packages/customer
 * @param {function} validator - ['validateUmrahPackagesForCustomers']
 * @param {function} controller - ['getUmrahPackagesForCustomers']
 * @returns {object} - router
 * @access public
 * @method POST
 */
router.post(
    '/customer',
    validateUmrahPackagesForCustomers,
    getUmrahPackagesForCustomers
);

/**
 * @description get umrah package package
 * @param {string} path - /umrah/packages/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageId']
 * @param {function} controller - ['getUmrahPackage']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id', getUmrahPackage);

/**
 * @description check if user is authorized
 * @param {string} path - /customers
 * @param {function} middleware - ['isAuthorized']
 * @returns {object} - router
 * @method USE
 */
router.use(isAuthorized);

/**
 * @description get all umrah packages packages
 * @param {string} path - /umrah/packages
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['getUmrahPackages']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/', isAllowed(['admin']), getUmrahPackages);

/**
 * @description duplicate umrah package
 * @param {string} path - /umrah/packages/:id/duplicate
 * @param {function} middleware - ['isAllowed']
 * @param {function} controller - ['duplicatePackage']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post('/:id/duplicate', isAllowed(['admin']), duplicatePackage);

/**
 * @description get umrah package package
 * @param {string} path - /umrah/packages/:id/customers
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageId']
 * @param {function} controller - ['getUmrahPackage']
 * @returns {object} - router
 * @access private - ['admin']
 * @method GET
 */
router.get('/:id/customers', validateUmrahPackageId, getUmrahPackageCustomer);

/**
 * @description create umrah package package
 * @param {string} path - /umrah/packages
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageThumbnail', 'validateUmrahPackage']
 * @param {function} validator - ['validateUmrahPackageGallery', 'validateMakkahHotelTumbnail']
 * @param {function} validator - ['validateMakkahHotelGallery', 'validateMadinahHotelTumbnail']
 * @param {function} validator - ['validateMadinahHotelGallery', 'validateUmrahPackageThumbnail']
 * @param {function} middleware - ['uploadPackageThumbnail', 'uploadPackageGallery']
 * @param {function} middleware - ['uploadMakkahHotelThumbnail', 'uploadMakkahHotelGallery']
 * @param {function} middleware - ['uploadMadinahHotelThumbnail', 'uploadMadinahHotelGallery']
 * @param {function} middleware - ['uploadUmrahThumbnail']
 * @param {function} controller - ['createUmrahPackage']
 * @returns {object} - router
 * @access private - ['admin']
 * @method POST
 */
router.post(
    '/',
    isAllowed(['admin']),
    (req, res, next) => {
        [
            {
                key: 'kt_repeater_visa_required',
                modifiedKey: 'visaOptions',
            },
            {
                key: 'kt_repeater_transport_service',
                modifiedKey: 'transportServices',
            },
            {
                key: 'kt_repeater_ziyara_makkah_details',
                modifiedKey: 'ziyarahMakkahDetails',
            },
            {
                key: 'kt_repeater_ziyara_madinah_details',
                modifiedKey: 'ziyarahMadinahDetails',
            },
            {
                key: 'kt_repeater_ziyara_taif_details',
                modifiedKey: 'ziyarahTaifDetails',
            },
        ].forEach(({ key, modifiedKey }) => {
            req.body[modifiedKey] = req.body[key]?.map(
                (item) => item[modifiedKey]
            );

            delete req.body[key];
        });

        // console.log(req.body);

        return next();
    },
    (req, res, next) => {
        const arr = [];
        let i = 1;

        while (req.body[`day_wise_itineary_title_${i}`] !== undefined) {
            arr.push({
                thumbnail: req.files[`day_wise_itineary_thumbnail_${i}`] || '',
                title: req.body[`day_wise_itineary_title_${i}`],
                description: req.body[`day_wise_itineary_description_${i}`],
            });

            delete req.body[`day_wise_itineary_title_${i}`];
            delete req.body[`day_wise_itineary_description_${i}`];

            i++;
        }

        req.body.itineraryDays = arr;

        return next();
    },
    validateUmrahPackageThumbnail,
    validateUmrahPackage,
    validateUmrahPackageGallery,
    validateUmrahOutbound,
    validateMakkahHotelTumbnail,
    validateMakkahHotelGallery,
    validateMakkahHotel,
    validateMadinahHotelTumbnail,
    validateMadinahHotelGallery,
    validateMadinahHotel,
    validateUmrahInbound,
    validateUmrahVisa,
    validateUmrahTransportation,
    validateUmrahZiyarah,
    validateDayWiseItineraryThumbnails,
    validateUmrahDayWiseItinerary,
    validateUmrahThumbnail,
    validateUmrah,
    validateTermsAndConditions,
    uploadPackageThumbnail('/umrah/package'),
    uploadPackageGallery('/umrah/package'),
    uploadMakkahHotelThumbnail('/umrah/package'),
    uploadMakkahHotelGallery('/umrah/package'),
    uploadMadinahHotelThumbnail('/umrah/package'),
    uploadMadinahHotelGallery('/umrah/package'),
    uploadUmrahDayWiseItineraryThumbnails('/umrah/package'),
    uploadUmrahThumbnail('/umrah/package'),
    createUmrahPackage
);

/**
 * @description update umrah package package
 * @param {string} path - /umrah/packages/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageThumbnail', 'validateUmrahPackage']
 * @param {function} validator - ['validateUmrahPackageGallery', 'validateMakkahHotelTumbnail']
 * @param {function} validator - ['validateMakkahHotelGallery', 'validateMadinahHotelTumbnail']
 * @param {function} validator - ['validateMadinahHotelGallery', 'validateUmrahPackageThumbnail']
 * @param {function} middleware - ['uploadPackageThumbnail', 'uploadPackageGallery']
 * @param {function} middleware - ['uploadMakkahHotelThumbnail', 'uploadMakkahHotelGallery']
 * @param {function} middleware - ['uploadMadinahHotelThumbnail', 'uploadMadinahHotelGallery']
 * @param {function} middleware - ['uploadUmrahThumbnail']
 * @param {function} controller - ['updateUmrahPackage']
 * @returns {object} - router
 * @access private - ['admin']
 * @method PATCH
 */
router.patch(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageId,
    isAllowed(['admin']),
    (req, res, next) => {
        [
            {
                key: 'kt_repeater_visa_required',
                modifiedKey: 'visaOptions',
            },
            {
                key: 'kt_repeater_transport_service',
                modifiedKey: 'transportServices',
            },
            {
                key: 'kt_repeater_ziyara_makkah_details',
                modifiedKey: 'ziyarahMakkahDetails',
            },
            {
                key: 'kt_repeater_ziyara_madinah_details',
                modifiedKey: 'ziyarahMadinahDetails',
            },
            {
                key: 'kt_repeater_ziyara_taif_details',
                modifiedKey: 'ziyarahTaifDetails',
            },
        ].forEach(({ key, modifiedKey }) => {
            req.body[modifiedKey] = req.body[key]?.map(
                (item) => item[modifiedKey]
            );

            delete req.body[key];
        });

        // Replace the value of 'umrahDescription' and 'termsConditions' with their second array item
        const replaceSecondItem = (key) => {
            if (Array.isArray(req.body[key]) && req.body[key].length > 1) {
                req.body[key] = req.body[key][1]; // Replace with the second item
            }
        };

        replaceSecondItem('umrahDescription');
        replaceSecondItem('termsConditions');

        return next();
    },
    (req, res, next) => {
        return console.log(req.body);
    },
    (req, res, next) => {
        const arr = [];
        let i = 1;

        while (req.body[`day_wise_itineary_title_${i}`] !== undefined) {
            arr.push({
                thumbnail: req.files[`day_wise_itineary_thumbnail_${i}`] || '',
                title: req.body[`day_wise_itineary_title_${i}`],
                description: req.body[`day_wise_itineary_description_${i}`],
            });

            delete req.body[`day_wise_itineary_title_${i}`];
            delete req.body[`day_wise_itineary_description_${i}`];

            i++;
        }

        if (Number(req.body?.itemsToRemoveFromItineary)) {
            arr.splice(
                -Number(req.body.itemsToRemoveFromItineary),
                Number(req.body.itemsToRemoveFromItineary)
            );

            delete req.body.itemsToRemoveFromItineary;
        }

        req.body.itineraryDays = arr;

        return next();
    },

    validateUmrahPackageThumbnail,
    validateUmrahPackage,
    validateUmrahPackageGallery,
    validateUmrahOutbound,
    validateMakkahHotelTumbnail,
    validateMakkahHotelGallery,
    validateMakkahHotel,
    validateMadinahHotelTumbnail,
    validateMadinahHotelGallery,
    validateMadinahHotel,
    validateUmrahInbound,
    validateUmrahVisa,
    validateUmrahTransportation,
    validateUmrahZiyarah,
    validateDayWiseItineraryThumbnails,
    validateUmrahDayWiseItinerary,
    validateUmrahThumbnail,
    validateUmrah,
    validateTermsAndConditions,
    uploadPackageThumbnail('/umrah/package'),
    uploadPackageGallery('/umrah/package'),
    uploadMakkahHotelThumbnail('/umrah/package'),
    uploadMakkahHotelGallery('/umrah/package'),
    uploadMadinahHotelThumbnail('/umrah/package'),
    uploadMadinahHotelGallery('/umrah/package'),
    uploadUmrahDayWiseItineraryThumbnails('/umrah/package'),
    uploadUmrahThumbnail('/umrah/package'),
    updateUmrahPackage
);

/**
 * @description delete umrah package package
 * @param {string} path - /umrah/packages/:id
 * @param {function} middleware - ['isAllowed']
 * @param {function} validator - ['validateUmrahPackageId']
 * @param {function} controller - ['deleteUmrahPackage']
 * @returns {object} - router
 * @access private - ['admin']
 * @method DELETE
 */
router.delete(
    '/:id',
    isAllowed(['admin']),
    validateUmrahPackageId,
    deleteUmrahPackage
);

// export router
module.exports = router;
