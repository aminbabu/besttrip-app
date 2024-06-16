/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "../public/src/js/custom/apps/payment-requests/rejected.js":
/*!*****************************************************************!*\
  !*** ../public/src/js/custom/apps/payment-requests/rejected.js ***!
  \*****************************************************************/
/***/ (() => {

eval("// Class definition\nconst KTPaymentRequestRejected = (function () {\n    // Shared variables\n    let element;\n    let modal;\n\n    // Init add schedule modal\n    const initRejectedModal = () => {\n        // Close button handler\n        const closeButton = element.querySelectorAll(\n            '[data-kt-reject-payment-request-modal-action=\"close\"]'\n        );\n        closeButton.forEach((closeButton) => {\n            closeButton.addEventListener('click', (e) => {\n                e.preventDefault();\n\n                modal.hide();\n            });\n        });\n    };\n\n    // Get payment request data on modal show\n    const showPaymentRequestData = () => {\n        const triggers = document.querySelectorAll(\n            '[data-kt-trigger=\"kt_payment_requests_rejected_reason\"]'\n        );\n\n        triggers.forEach((trigger) => {\n            trigger.addEventListener('click', (e) => {\n                e.preventDefault();\n                const url = trigger.getAttribute('href');\n                const messageEl = element.querySelector('#kt_payment_requests_rejected_reason');\n\n                // Check axios library docs: https://axios-http.com/docs/intro\n                axios\n                    .get(url)\n                    .then((response) => {\n                        if (response) {\n                            // Fill the fields\n                            const { paymentRequest } = response.data;\n\n                            if (!paymentRequest?.notes) {\n                                paymentRequest.notes = 'No reason provided';\n                            }\n\n                            messageEl.innerHTML = paymentRequest.notes;\n                        } else {\n                            // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/\n                            Swal.fire({\n                                text: 'Sorry, something went wrong. Please try again.',\n                                icon: 'error',\n                                buttonsStyling: false,\n                                confirmButtonText: 'Ok, got it!',\n                                customClass: {\n                                    confirmButton: 'btn btn-primary',\n                                },\n                            });\n                        }\n                    })\n                    .catch((error) => {\n                        const errors = error.response.data.message\n                            ? error.response.data.message\n                            : error.response.data.errors;\n\n                        Swal.fire({\n                            html: `${\n                                errors instanceof Array\n                                    ? `<ul class=\"text-start\">${Object.values(\n                                          error.response.data.errors\n                                      )\n                                          .map((err) => `<li>${err?.message}</li>`)\n                                          .join('')}</ul>`\n                                    : errors\n                            }`,\n                            icon: 'error',\n                            buttonsStyling: false,\n                            confirmButtonText: 'Ok, got it!',\n                            customClass: {\n                                confirmButton: 'btn btn-primary',\n                            },\n                        });\n                    });\n            });\n        });\n    };\n\n    return {\n        // Public functions\n        init() {\n            element = document.getElementById('kt-reject-reason-payment-request-modal');\n\n            if (!element) {\n                return;\n            }\n\n            modal = new bootstrap.Modal(element);\n\n            initRejectedModal();\n            showPaymentRequestData();\n        },\n    };\n}());\n\n// On document ready\nKTUtil.onDOMContentLoaded(() => {\n    KTPaymentRequestRejected.init();\n});\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/payment-requests/rejected.js?");

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