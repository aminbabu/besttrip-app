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

/***/ "../public/src/js/custom/utilities/modals/create-project/complete.js":
/*!***************************************************************************!*\
  !*** ../public/src/js/custom/utilities/modals/create-project/complete.js ***!
  \***************************************************************************/
/***/ ((module) => {

eval("\r\n\r\n// Class definition\r\nvar KTModalCreateProjectComplete = function () {\r\n\t// Variables\r\n\tvar startButton;\r\n\tvar form;\r\n\tvar stepper;\r\n\r\n\t// Private functions\r\n\tvar handleForm = function() {\r\n\t\tstartButton.addEventListener('click', function () {\r\n\t\t\tstepper.goTo(1);\r\n\t\t});\r\n\t}\r\n\r\n\treturn {\r\n\t\t// Public functions\r\n\t\tinit: function () {\r\n\t\t\tform = KTModalCreateProject.getForm();\r\n\t\t\tstepper = KTModalCreateProject.getStepperObj();\r\n\t\t\tstartButton = KTModalCreateProject.getStepper().querySelector('[data-kt-element=\"complete-start\"]');\r\n\r\n\t\t\thandleForm();\r\n\t\t}\r\n\t};\r\n}();\r\n\r\n// Webpack support\r\nif ( true && typeof module.exports !== 'undefined') {\r\n\twindow.KTModalCreateProjectComplete = module.exports = KTModalCreateProjectComplete;\r\n}\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/utilities/modals/create-project/complete.js?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("../public/src/js/custom/utilities/modals/create-project/complete.js");
/******/ 	
/******/ })()
;