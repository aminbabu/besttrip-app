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

/***/ "../public/src/js/custom/apps/booking-reference/booking-history.js":
/*!*************************************************************************!*\
  !*** ../public/src/js/custom/apps/booking-reference/booking-history.js ***!
  \*************************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTUsersBookingHistory = (function () {\r\n    // Shared variables\r\n    const element = document.getElementById('kt_modal_booking-history');\r\n\r\n    if (!element) {\r\n        return;\r\n    }\r\n\r\n    const form = element.querySelector('#kt_modal_booking-history_form');\r\n    const modal = new bootstrap.Modal(element);\r\n\r\n    // Init add schedule modal\r\n    var initBookingHistory = () => {\r\n        // Close button handler\r\n        const closeButton = element.querySelector(\r\n            '[data-kt-booking-history-modal-action=\"close\"]'\r\n        );\r\n        closeButton.addEventListener('click', (e) => {\r\n            e.preventDefault();\r\n\r\n            Swal.fire({\r\n                text: 'Are you sure you would like to cancel?',\r\n                icon: 'warning',\r\n                showCancelButton: true,\r\n                buttonsStyling: false,\r\n                confirmButtonText: 'Yes, cancel it!',\r\n                cancelButtonText: 'No, return',\r\n                customClass: {\r\n                    confirmButton: 'btn btn-primary',\r\n                    cancelButton: 'btn btn-active-light',\r\n                },\r\n            }).then(function (result) {\r\n                if (result.value) {\r\n                    form.reset(); // Reset form\r\n                    modal.hide(); // Hide modal\r\n                } else if (result.dismiss === 'cancel') {\r\n                    Swal.fire({\r\n                        text: 'Your form has not been cancelled!.',\r\n                        icon: 'error',\r\n                        buttonsStyling: false,\r\n                        confirmButtonText: 'Ok, got it!',\r\n                        customClass: {\r\n                            confirmButton: 'btn btn-primary',\r\n                        },\r\n                    });\r\n                }\r\n            });\r\n        });\r\n    };\r\n\r\n    return {\r\n        // Public functions\r\n        init: function () {\r\n            initBookingHistory();\r\n        },\r\n    };\r\n})();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n    KTUsersBookingHistory.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/booking-reference/booking-history.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/booking-reference/booking-history.js"]();
/******/ 	
/******/ })()
;