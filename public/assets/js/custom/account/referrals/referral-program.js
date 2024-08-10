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

/***/ "../public/src/js/custom/account/referrals/referral-program.js":
/*!*********************************************************************!*\
  !*** ../public/src/js/custom/account/referrals/referral-program.js ***!
  \*********************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTAccountReferralsReferralProgram = function () {\r\n    // Private functions\r\n\r\n    var initReferralProgrammClipboard = function() {\r\n        var button = document.querySelector('#kt_referral_program_link_copy_btn');\r\n        var input = document.querySelector('#kt_referral_link_input');\r\n        var clipboard = new ClipboardJS(button);\r\n\r\n        clipboard.on('success', function(e) {\r\n            var buttonCaption = button.innerHTML;\r\n            //Add bgcolor\r\n            input.classList.add('bg-success');\r\n            input.classList.add('text-inverse-success');\r\n\r\n            button.innerHTML = 'Copied!';\r\n\r\n            setTimeout(function() {\r\n                button.innerHTML = buttonCaption;\r\n\r\n                // Remove bgcolor\r\n                input.classList.remove('bg-success'); \r\n                input.classList.remove('text-inverse-success'); \r\n            }, 3000);  // 3seconds\r\n\r\n            e.clearSelection();\r\n        });\r\n    }\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            initReferralProgrammClipboard();\r\n        }\r\n    }\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function() {\r\n    KTAccountReferralsReferralProgram.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/account/referrals/referral-program.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/account/referrals/referral-program.js"]();
/******/ 	
/******/ })()
;