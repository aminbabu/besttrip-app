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

eval("\n\n// Class definition\nvar KTUsersBookingHistory = (function () {\n    // Shared variables\n    const element = document.getElementById('kt_modal_booking-history');\n\n    if (!element) {\n        return;\n    }\n\n    const form = element.querySelector('#kt_modal_booking-history_form');\n    const modal = new bootstrap.Modal(element);\n\n    // Init add schedule modal\n    var initBookingHistory = () => {\n        // Close button handler\n        const closeButton = element.querySelector(\n            '[data-kt-booking-history-modal-action=\"close\"]'\n        );\n        closeButton.addEventListener('click', (e) => {\n            e.preventDefault();\n\n            Swal.fire({\n                text: 'Are you sure you would like to cancel?',\n                icon: 'warning',\n                showCancelButton: true,\n                buttonsStyling: false,\n                confirmButtonText: 'Yes, cancel it!',\n                cancelButtonText: 'No, return',\n                customClass: {\n                    confirmButton: 'btn btn-primary',\n                    cancelButton: 'btn btn-active-light',\n                },\n            }).then(function (result) {\n                if (result.value) {\n                    form.reset(); // Reset form\n                    modal.hide(); // Hide modal\n                } else if (result.dismiss === 'cancel') {\n                    Swal.fire({\n                        text: 'Your form has not been cancelled!.',\n                        icon: 'error',\n                        buttonsStyling: false,\n                        confirmButtonText: 'Ok, got it!',\n                        customClass: {\n                            confirmButton: 'btn btn-primary',\n                        },\n                    });\n                }\n            });\n        });\n    };\n\n    return {\n        // Public functions\n        init: function () {\n            initBookingHistory();\n        },\n    };\n})();\n\n// On document ready\nKTUtil.onDOMContentLoaded(function () {\n    KTUsersBookingHistory.init();\n});\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/booking-reference/booking-history.js?");

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