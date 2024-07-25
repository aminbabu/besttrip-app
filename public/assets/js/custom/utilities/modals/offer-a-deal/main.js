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

/***/ "../public/src/js/custom/utilities/modals/offer-a-deal/main.js":
/*!*********************************************************************!*\
  !*** ../public/src/js/custom/utilities/modals/offer-a-deal/main.js ***!
  \*********************************************************************/
/***/ ((module) => {

eval("\r\n\r\n// Class definition\r\nvar KTModalOfferADeal = function () {\r\n    // Private variables\r\n\tvar stepper;\r\n\tvar stepperObj;\r\n\tvar form;\t\r\n\r\n\t// Private functions\r\n\tvar initStepper = function () {\r\n\t\t// Initialize Stepper\r\n\t\tstepperObj = new KTStepper(stepper);\r\n\t}\r\n\r\n\treturn {\r\n\t\t// Public functions\r\n\t\tinit: function () {\r\n\t\t\tstepper = document.querySelector('#kt_modal_offer_a_deal_stepper');\r\n\t\t\tform = document.querySelector('#kt_modal_offer_a_deal_form');\r\n\r\n\t\t\tinitStepper();\r\n\t\t},\r\n\r\n\t\tgetStepper: function () {\r\n\t\t\treturn stepper;\r\n\t\t},\r\n\r\n\t\tgetStepperObj: function () {\r\n\t\t\treturn stepperObj;\r\n\t\t},\r\n\t\t\r\n\t\tgetForm: function () {\r\n\t\t\treturn form;\r\n\t\t}\r\n\t};\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n\tif (!document.querySelector('#kt_modal_offer_a_deal')) {\r\n\t\treturn;\r\n\t}\r\n\r\n    KTModalOfferADeal.init();\r\n    KTModalOfferADealType.init();\r\n    KTModalOfferADealDetails.init();\r\n    KTModalOfferADealFinance.init();\r\n    KTModalOfferADealComplete.init();\r\n});\r\n\r\n// Webpack support\r\nif ( true && typeof module.exports !== 'undefined') {\r\n\twindow.KTModalOfferADeal = module.exports = KTModalOfferADeal;\r\n}\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/utilities/modals/offer-a-deal/main.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("../public/src/js/custom/utilities/modals/offer-a-deal/main.js");
/******/ 	
/******/ })()
;