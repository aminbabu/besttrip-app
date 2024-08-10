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

/***/ "../public/src/js/custom/apps/ecommerce/customers/details/add-auth-app.js":
/*!********************************************************************************!*\
  !*** ../public/src/js/custom/apps/ecommerce/customers/details/add-auth-app.js ***!
  \********************************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTUsersAddAuthApp = function () {\r\n    // Shared variables\r\n    const element = document.getElementById('kt_modal_add_auth_app');\r\n    const modal = new bootstrap.Modal(element);\r\n\r\n    // Init add schedule modal\r\n    var initAddAuthApp = () => {\r\n\r\n        // Close button handler\r\n        const closeButton = element.querySelector('[data-kt-users-modal-action=\"close\"]');\r\n        closeButton.addEventListener('click', e => {\r\n            e.preventDefault();\r\n\r\n            Swal.fire({\r\n                text: \"Are you sure you would like to close?\",\r\n                icon: \"warning\",\r\n                showCancelButton: true,\r\n                buttonsStyling: false,\r\n                confirmButtonText: \"Yes, close it!\",\r\n                cancelButtonText: \"No, return\",\r\n                customClass: {\r\n                    confirmButton: \"btn btn-primary\",\r\n                    cancelButton: \"btn btn-active-light\"\r\n                }\r\n            }).then(function (result) {\r\n                if (result.value) {\r\n                    modal.hide(); // Hide modal\t\t\t\t\r\n                } \r\n            });\r\n        });\r\n\r\n    }\r\n\r\n    // QR code to text code swapper\r\n    var initCodeSwap = () => {\r\n        const qrCode = element.querySelector('[ data-kt-add-auth-action=\"qr-code\"]');\r\n        const textCode = element.querySelector('[ data-kt-add-auth-action=\"text-code\"]');\r\n        const qrCodeButton = element.querySelector('[ data-kt-add-auth-action=\"qr-code-button\"]');\r\n        const textCodeButton = element.querySelector('[ data-kt-add-auth-action=\"text-code-button\"]');\r\n        const qrCodeLabel = element.querySelector('[ data-kt-add-auth-action=\"qr-code-label\"]');\r\n        const textCodeLabel = element.querySelector('[ data-kt-add-auth-action=\"text-code-label\"]');\r\n\r\n        const toggleClass = () =>{\r\n            qrCode.classList.toggle('d-none');\r\n            qrCodeButton.classList.toggle('d-none');\r\n            qrCodeLabel.classList.toggle('d-none');\r\n            textCode.classList.toggle('d-none');\r\n            textCodeButton.classList.toggle('d-none');\r\n            textCodeLabel.classList.toggle('d-none');\r\n        }\r\n\r\n        // Swap to text code handler\r\n        textCodeButton.addEventListener('click', e =>{\r\n            e.preventDefault();\r\n\r\n            toggleClass();\r\n        });\r\n\r\n        qrCodeButton.addEventListener('click', e =>{\r\n            e.preventDefault();\r\n\r\n            toggleClass();\r\n        });\r\n    }\r\n\r\n    return {\r\n        // Public functions\r\n        init: function () {\r\n            initAddAuthApp();\r\n            initCodeSwap();\r\n        }\r\n    };\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n    KTUsersAddAuthApp.init();\r\n});\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/ecommerce/customers/details/add-auth-app.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/ecommerce/customers/details/add-auth-app.js"]();
/******/ 	
/******/ })()
;