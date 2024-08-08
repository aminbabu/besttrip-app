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

/***/ "../public/src/js/custom/apps/projects/users/users.js":
/*!************************************************************!*\
  !*** ../public/src/js/custom/apps/projects/users/users.js ***!
  \************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTProjectUsers = function () {\r\n\r\n    var initTable = function () {\r\n        // Set date data order\r\n        const table = document.getElementById('kt_project_users_table');\r\n\r\n        if (!table) {\r\n            return;\r\n        }\r\n        \r\n        const tableRows = table.querySelectorAll('tbody tr');\r\n        \r\n        tableRows.forEach(row => {\r\n            const dateRow = row.querySelectorAll('td');\r\n            const realDate = moment(dateRow[1].innerHTML, \"MMM D, YYYY\").format();\r\n            dateRow[1].setAttribute('data-order', realDate);\r\n        });\r\n\r\n        // Init datatable --- more info on datatables: https://datatables.net/manual/\r\n        const datatable = $(table).DataTable({\r\n            \"info\": false,\r\n            'order': [],\r\n            \"columnDefs\": [{\r\n                \"targets\": 4,\r\n                \"orderable\": false\r\n            }]\r\n        });\r\n\r\n        // Search --- official docs reference: https://datatables.net/reference/api/search()\r\n        var filterSearch = document.getElementById('kt_filter_search');\r\n        if (filterSearch) {\r\n            filterSearch.addEventListener('keyup', function (e) {\r\n                datatable.search(e.target.value).draw();\r\n            });\r\n        }        \r\n    }\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            initTable();\r\n        }\r\n    }\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function() {\r\n    KTProjectUsers.init();\r\n});\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/projects/users/users.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/projects/users/users.js"]();
/******/ 	
/******/ })()
;