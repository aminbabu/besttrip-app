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

/***/ "../public/src/js/custom/apps/subscriptions/add/customer-select.js":
/*!*************************************************************************!*\
  !*** ../public/src/js/custom/apps/subscriptions/add/customer-select.js ***!
  \*************************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTModalCustomerSelect = function() {\r\n    // Private variables\r\n    var element;\r\n    var suggestionsElement;\r\n    var resultsElement;\r\n    var wrapperElement;\r\n    var emptyElement;\r\n    var searchObject;\r\n    \r\n    var modal;\r\n\r\n    // Private functions\r\n    var processs = function(search) {\r\n        var timeout = setTimeout(function() {\r\n            var number = KTUtil.getRandomInt(1, 6);\r\n\r\n            // Hide recently viewed\r\n            suggestionsElement.classList.add('d-none');\r\n\r\n            if (number === 3) {\r\n                // Hide results\r\n                resultsElement.classList.add('d-none');\r\n                // Show empty message \r\n                emptyElement.classList.remove('d-none');\r\n            } else {\r\n                // Show results\r\n                resultsElement.classList.remove('d-none');\r\n                // Hide empty message \r\n                emptyElement.classList.add('d-none');\r\n            }                  \r\n\r\n            // Complete search\r\n            search.complete();\r\n        }, 1500);\r\n    }\r\n\r\n    var clear = function(search) {\r\n        // Show recently viewed\r\n        suggestionsElement.classList.remove('d-none');\r\n        // Hide results\r\n        resultsElement.classList.add('d-none');\r\n        // Hide empty message \r\n        emptyElement.classList.add('d-none');\r\n    }    \r\n\r\n    // Public methods\r\n\treturn {\r\n\t\tinit: function() {\r\n            // Elements\r\n            element = document.querySelector('#kt_modal_customer_search_handler');\r\n            modal = new bootstrap.Modal(document.querySelector('#kt_modal_customer_search'));\r\n\r\n            if (!element) {\r\n                return;\r\n            }\r\n\r\n            wrapperElement = element.querySelector('[data-kt-search-element=\"wrapper\"]');\r\n            suggestionsElement = element.querySelector('[data-kt-search-element=\"suggestions\"]');\r\n            resultsElement = element.querySelector('[data-kt-search-element=\"results\"]');\r\n            emptyElement = element.querySelector('[data-kt-search-element=\"empty\"]');\r\n            \r\n            // Initialize search handler\r\n            searchObject = new KTSearch(element);\r\n\r\n            // Search handler\r\n            searchObject.on('kt.search.process', processs);\r\n\r\n            // Clear handler\r\n            searchObject.on('kt.search.clear', clear);\r\n\r\n            // Handle select\r\n            KTUtil.on(element, '[data-kt-search-element=\"customer\"]', 'click', function() {\r\n                modal.hide();\r\n            });\r\n\t\t}\r\n\t};\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n    KTModalCustomerSelect.init();\r\n});\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/subscriptions/add/customer-select.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/subscriptions/add/customer-select.js"]();
/******/ 	
/******/ })()
;