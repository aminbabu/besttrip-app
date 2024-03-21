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

/***/ "../public/src/js/custom/apps/payment-requests/rejected.js":
/*!*****************************************************************!*\
  !*** ../public/src/js/custom/apps/payment-requests/rejected.js ***!
  \*****************************************************************/
/***/ (() => {

eval("\n\n// Class definition\nvar KTPaymentRequestRejected = (function () {\n  // Shared variables\n  const element = document.getElementById(\"kt-reject-payment-request-modal\");\n  const modal = new bootstrap.Modal(element);\n\n  // Init add schedule modal\n  var initRejectedModal = () => {\n    // Close button handler\n    const closeButton = element.querySelectorAll(\n      '[data-kt-reject-payment-request-modal-action=\"close\"]'\n    );\n    closeButton.forEach((closeButton) => {\n      closeButton.addEventListener(\"click\", (e) => {\n        e.preventDefault();\n\n        modal.hide();\n      });\n    });\n  };\n\n  return {\n    // Public functions\n    init: function () {\n      initRejectedModal();\n    },\n  };\n})();\n\n// On document ready\nKTUtil.onDOMContentLoaded(function () {\n  KTPaymentRequestRejected.init();\n});\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/payment-requests/rejected.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/payment-requests/rejected.js"]();
/******/ 	
/******/ })()
;