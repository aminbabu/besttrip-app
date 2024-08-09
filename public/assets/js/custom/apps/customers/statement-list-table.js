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

eval("\n\nvar KTContentStatementTable = (function () {\n    // Define shared variables\n    var table;\n    var datatable;\n\n    // Private functions\n    var initDatatable = function () {\n        // Init DataTable\n        datatable = $(table).DataTable({\n            info: false,\n            order: [],\n            pageLength: 10,\n            columnDefs: [\n                { orderable: false, targets: 0 }, // Disable ordering on column 0 (checkbox)\n            ],\n        });\n    };\n\n    return {\n        // Public functions\n        init: function () {\n            table = document.getElementById('kt_general_ledger_table');\n\n            if (!table) {\n                return;\n            }\n\n            initDatatable();\n        },\n    };\n})();\n\n// On document ready\n$(document).ready(function () {\n    KTContentStatementTable.init();\n});\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/customers/statement-list-table.js?");

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