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

/***/ "../public/src/js/custom/utilities/search/horizontal.js":
/*!**************************************************************!*\
  !*** ../public/src/js/custom/utilities/search/horizontal.js ***!
  \**************************************************************/
/***/ (() => {

eval("\r\n \r\n// Class definition\r\nvar KTSearchHorizontal = function () {\r\n    // Private functions\r\n    var initAdvancedSearchForm = function () {\r\n       var form = document.querySelector('#kt_advanced_search_form');\r\n\r\n       // Init tags\r\n       var tags = form.querySelector('[name=\"tags\"]');\r\n       new Tagify(tags);\r\n    }\r\n\r\n    var handleAdvancedSearchToggle = function () {\r\n        var link = document.querySelector('#kt_horizontal_search_advanced_link');\r\n\r\n        link.addEventListener('click', function (e) {\r\n            e.preventDefault();\r\n            \r\n            if (link.innerHTML === \"Advanced Search\") {\r\n                link.innerHTML = \"Hide Advanced Search\";\r\n            } else {\r\n                link.innerHTML = \"Advanced Search\";\r\n            }\r\n        })\r\n    }\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            initAdvancedSearchForm();\r\n            handleAdvancedSearchToggle();\r\n        }\r\n    }     \r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n    KTSearchHorizontal.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/utilities/search/horizontal.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/utilities/search/horizontal.js"]();
/******/ 	
/******/ })()
;