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

/***/ "../public/src/js/custom/apps/projects/targets/targets.js":
/*!****************************************************************!*\
  !*** ../public/src/js/custom/apps/projects/targets/targets.js ***!
  \****************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTProjectTargets = function () {\r\n\r\n    var initDatatable = function () {\r\n        const table = document.getElementById('kt_profile_overview_table');\r\n\r\n        // set date data order\r\n        const tableRows = table.querySelectorAll('tbody tr');\r\n        tableRows.forEach(row => {\r\n            const dateRow = row.querySelectorAll('td');\r\n            const realDate = moment(dateRow[1].innerHTML, \"MMM D, YYYY\").format();\r\n            dateRow[1].setAttribute('data-order', realDate);\r\n        });\r\n\r\n        // init datatable --- more info on datatables: https://datatables.net/manual/\r\n        const datatable = $(table).DataTable({\r\n            \"info\": false,\r\n            'order': [],\r\n            \"paging\": false,\r\n        });\r\n\r\n    }\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            initDatatable();\r\n        }\r\n    }\r\n}();\r\n\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function() {\r\n    KTProjectTargets.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/projects/targets/targets.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/projects/targets/targets.js"]();
/******/ 	
/******/ })()
;