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

/***/ "../public/src/js/custom/pages/pricing/general.js":
/*!********************************************************!*\
  !*** ../public/src/js/custom/pages/pricing/general.js ***!
  \********************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTPricingGeneral = function () {\r\n    // Private variables\r\n    var element;\r\n\tvar planPeriodMonthButton;\r\n\tvar planPeriodAnnualButton;\r\n\r\n\tvar changePlanPrices = function(type) {\r\n\t\tvar items = [].slice.call(element.querySelectorAll('[data-kt-plan-price-month]'));\r\n\r\n\t\titems.map(function (item) {\r\n\t\t\tvar monthPrice = item.getAttribute('data-kt-plan-price-month');\r\n\t\t\tvar annualPrice = item.getAttribute('data-kt-plan-price-annual');\r\n\r\n\t\t\tif ( type === 'month' ) {\r\n\t\t\t\titem.innerHTML = monthPrice;\r\n\t\t\t} else if ( type === 'annual' ) {\r\n\t\t\t\titem.innerHTML = annualPrice;\r\n\t\t\t}\r\n\t\t});\r\n\t}\r\n\r\n    var handlePlanPeriodSelection = function(e) {\r\n\r\n        // Handle period change\r\n        planPeriodMonthButton.addEventListener('click', function (e) {\r\n            e.preventDefault();\r\n\r\n            planPeriodMonthButton.classList.add('active');\r\n            planPeriodAnnualButton.classList.remove('active');\r\n\r\n            changePlanPrices('month');\r\n        });\r\n\r\n\t\tplanPeriodAnnualButton.addEventListener('click', function (e) {\r\n            e.preventDefault();\r\n\r\n            planPeriodMonthButton.classList.remove('active');\r\n            planPeriodAnnualButton.classList.add('active');\r\n            \r\n            changePlanPrices('annual');\r\n        });\r\n    }\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            element = document.querySelector('#kt_pricing');\r\n\t\t\tplanPeriodMonthButton = element.querySelector('[data-kt-plan=\"month\"]');\r\n\t\t\tplanPeriodAnnualButton = element.querySelector('[data-kt-plan=\"annual\"]');\r\n\r\n            // Handlers\r\n            handlePlanPeriodSelection();\r\n        }\r\n    }\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function() {\r\n    KTPricingGeneral.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/pages/pricing/general.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/pages/pricing/general.js"]();
/******/ 	
/******/ })()
;