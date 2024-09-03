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

/***/ "../public/src/js/custom/utilities/modals/share-earn.js":
/*!**************************************************************!*\
  !*** ../public/src/js/custom/utilities/modals/share-earn.js ***!
  \**************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTModalShareEarn = function () {\r\n    // Private functions\r\n    var handleForm = function() {\r\n        var button = document.querySelector('#kt_share_earn_link_copy_button');\r\n        var input = document.querySelector('#kt_share_earn_link_input');\r\n        var clipboard = new ClipboardJS(button);\r\n\r\n        if (!clipboard) {\r\n            return;\r\n        }\r\n\r\n        //  Copy text to clipboard. For more info check the plugin's documentation: https://clipboardjs.com/\r\n        clipboard.on('success', function(e) {\r\n            var buttonCaption = button.innerHTML;\r\n            //Add bgcolor\r\n            input.classList.add('bg-success');\r\n            input.classList.add('text-inverse-success');\r\n\r\n            button.innerHTML = 'Copied!';\r\n\r\n            setTimeout(function() {\r\n                button.innerHTML = buttonCaption;\r\n\r\n                // Remove bgcolor\r\n                input.classList.remove('bg-success'); \r\n                input.classList.remove('text-inverse-success'); \r\n            }, 3000);  // 3seconds\r\n\r\n            e.clearSelection();\r\n        });\r\n    }\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            handleForm();\r\n        }\r\n    }\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function() {\r\n    KTModalShareEarn.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/utilities/modals/share-earn.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/utilities/modals/share-earn.js"]();
/******/ 	
/******/ })()
;