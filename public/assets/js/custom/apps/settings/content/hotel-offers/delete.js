/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../public/src/js/custom/apps/settings/content/hotel-offers/delete.js":
/*!****************************************************************************!*\
  !*** ../public/src/js/custom/apps/settings/content/hotel-offers/delete.js ***!
  \****************************************************************************/
/***/ (() => {

eval("// Inside your KTContentHotelOfferDelete module\r\nvar KTContentHotelOfferDelete = (function () {\r\n    // Private function to initialize delete functionality\r\n    const initHotelOfferDelete = () => {\r\n        const deleteLinks = document.querySelectorAll(\r\n            '[data-kt-content-hotel-offers-table-filter=\"delete_row\"]'\r\n        );\r\n\r\n        deleteLinks.forEach((link) => {\r\n            link.addEventListener('click', function (e) {\r\n                e.preventDefault();\r\n\r\n                const hotelId = this.getAttribute('data-hotel-id');\r\n                const deleteUrl = this.getAttribute('href');\r\n\r\n                axios\r\n                    .delete(deleteUrl)\r\n                    .then((response) => {\r\n                        console.log('Hotel offer deleted successfully');\r\n                    })\r\n                    .catch((error) => {\r\n                        console.error('Error deleting hotel offer:', error);\r\n                    });\r\n            });\r\n        });\r\n    };\r\n\r\n    // Public functions\r\n    return {\r\n        init: function () {\r\n            initHotelOfferDelete();\r\n        },\r\n    };\r\n})();\r\n\r\n// Initialize the module on document ready\r\ndocument.addEventListener('DOMContentLoaded', function () {\r\n    KTContentHotelOfferDelete.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/settings/content/hotel-offers/delete.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/settings/content/hotel-offers/delete.js"]();
/******/ 	
/******/ })()
;