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

/***/ "../public/src/js/custom/apps/customers/statement-list-table.js":
/*!**********************************************************************!*\
  !*** ../public/src/js/custom/apps/customers/statement-list-table.js ***!
  \**********************************************************************/
/***/ (() => {

eval("\r\n\r\nvar KTContentStatementTable = (function () {\r\n    // Define shared variables\r\n    var table;\r\n    var datatable;\r\n\r\n    // Private functions\r\n    var initDatatable = function () {\r\n        // Init DataTable\r\n        datatable = $(table).DataTable({\r\n            info: false,\r\n            order: [],\r\n            pageLength: 10,\r\n            columnDefs: [\r\n                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)\r\n            ],\r\n        });\r\n    };\r\n\r\n    return {\r\n        // Public functions\r\n        init: function () {\r\n            table = document.getElementById('kt_general_ledger_table');\r\n\r\n            if (!table) {\r\n                return;\r\n            }\r\n\r\n            initDatatable();\r\n        },\r\n    };\r\n})();\r\n\r\n// On document ready\r\n$(document).ready(function () {\r\n    KTContentStatementTable.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/customers/statement-list-table.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/customers/statement-list-table.js"]();
/******/ 	
/******/ })()
;