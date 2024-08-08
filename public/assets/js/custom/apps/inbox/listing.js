/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "../public/src/js/custom/apps/inbox/listing.js":
/*!*****************************************************!*\
  !*** ../public/src/js/custom/apps/inbox/listing.js ***!
  \*****************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTAppInboxListing = function () {\r\n    var table;\r\n    var datatable;\r\n\r\n    // Private functions\r\n    var initDatatable = function () {\r\n        // Init datatable --- more info on datatables: https://datatables.net/manual/\r\n        datatable = $(table).DataTable({\r\n            \"info\": false,\r\n            'order': [],\r\n            // 'paging': false,\r\n            // 'pageLength': false,      \r\n        });\r\n\r\n        datatable.on('draw', function () {\r\n            handleDatatableFooter();\r\n        });\r\n    }\r\n\r\n    // Handle datatable footer spacings\r\n    var handleDatatableFooter = () => {\r\n        const footerElement = document.querySelector('#kt_inbox_listing_wrapper > .row');\r\n        const spacingClasses = ['px-9', 'pt-3', 'pb-5'];\r\n        footerElement.classList.add(...spacingClasses);\r\n    }\r\n\r\n    // Search Datatable --- official docs reference: https://datatables.net/reference/api/search()\r\n    var handleSearchDatatable = () => {\r\n        const filterSearch = document.querySelector('[data-kt-inbox-listing-filter=\"search\"]');\r\n        filterSearch.addEventListener('keyup', function (e) {\r\n            datatable.search(e.target.value).draw();\r\n        });\r\n    }\r\n\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            table = document.querySelector('#kt_inbox_listing');\r\n\r\n            if (!table) {\r\n                return;\r\n            }\r\n\r\n            initDatatable();\r\n            handleSearchDatatable();\r\n            handleDatatableFooter();\r\n        }\r\n    };\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n    KTAppInboxListing.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/inbox/listing.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/inbox/listing.js"]();
/******/ 	
/******/ })()
;