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

eval("// Class definition\r\nconst KTPaymentRequestRejected = (function () {\r\n    // Shared variables\r\n    let element;\r\n    let modal;\r\n\r\n    // Init add schedule modal\r\n    const initRejectedModal = () => {\r\n        // Close button handler\r\n        const closeButton = element.querySelectorAll(\r\n            '[data-kt-reject-payment-request-modal-action=\"close\"]'\r\n        );\r\n        closeButton.forEach((closeButton) => {\r\n            closeButton.addEventListener('click', (e) => {\r\n                e.preventDefault();\r\n\r\n                modal.hide();\r\n            });\r\n        });\r\n    };\r\n\r\n    // Get payment request data on modal show\r\n    const showPaymentRequestData = () => {\r\n        const triggers = document.querySelectorAll(\r\n            '[data-kt-payment-requests-rejected-reason-action=\"trigger\"]'\r\n        );\r\n\r\n        triggers.forEach((trigger) => {\r\n            trigger.addEventListener('click', (e) => {\r\n                e.preventDefault();\r\n                const url = trigger.getAttribute('href');\r\n                const messageEl = element.querySelector(\r\n                    '#kt_payment_requests_rejected_reason'\r\n                );\r\n\r\n                // Check axios library docs: https://axios-http.com/docs/intro\r\n                axios\r\n                    .get(url)\r\n                    .then((response) => {\r\n                        if (response) {\r\n                            // Fill the fields\r\n                            const { paymentRequest } = response.data;\r\n\r\n                            if (!paymentRequest?.note) {\r\n                                paymentRequest.note = 'No reason provided';\r\n                            }\r\n\r\n                            messageEl.innerHTML = paymentRequest.note;\r\n                        } else {\r\n                            // Show error popup. For more info check the plugin's official documentation: https://sweetalert2.github.io/\r\n                            Swal.fire({\r\n                                text: 'Sorry, something went wrong. Please try again.',\r\n                                icon: 'error',\r\n                                buttonsStyling: false,\r\n                                confirmButtonText: 'Ok, got it!',\r\n                                customClass: {\r\n                                    confirmButton: 'btn btn-primary',\r\n                                },\r\n                            });\r\n                        }\r\n                    })\r\n                    .catch((error) => {\r\n                        const errors = error.response?.data?.message\r\n                            ? error.response?.data?.message\r\n                            : error?.response?.data?.errors;\r\n\r\n                        Swal.fire({\r\n                            html: `${\r\n                                errors instanceof Array\r\n                                    ? `<ul class=\"text-start\">${Object.values(\r\n                                          error.response.data.errors\r\n                                      )\r\n                                          .map(\r\n                                              (err) =>\r\n                                                  `<li>${err?.message}</li>`\r\n                                          )\r\n                                          .join('')}</ul>`\r\n                                    : errors\r\n                            }`,\r\n                            icon: 'error',\r\n                            buttonsStyling: false,\r\n                            confirmButtonText: 'Ok, got it!',\r\n                            customClass: {\r\n                                confirmButton: 'btn btn-primary',\r\n                            },\r\n                        });\r\n                    });\r\n            });\r\n        });\r\n    };\r\n\r\n    return {\r\n        // Public functions\r\n        init() {\r\n            element = document.getElementById(\r\n                'kt-reject-reason-payment-request-modal'\r\n            );\r\n\r\n            if (!element) {\r\n                return;\r\n            }\r\n\r\n            modal = new bootstrap.Modal(element);\r\n\r\n            initRejectedModal();\r\n            showPaymentRequestData();\r\n        },\r\n    };\r\n})();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(() => {\r\n    KTPaymentRequestRejected.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/payment-requests/rejected.js?");

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