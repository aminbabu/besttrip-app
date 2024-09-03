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

/***/ "../public/src/js/custom/apps/customers/view/payment-method.js":
/*!*********************************************************************!*\
  !*** ../public/src/js/custom/apps/customers/view/payment-method.js ***!
  \*********************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTCustomerViewPaymentMethod = function () {\r\n\r\n    // Private functions\r\n    var initPaymentMethod = function () {\r\n        // Define variables\r\n        const table = document.getElementById('kt_customer_view_payment_method');\r\n        const tableRows = table.querySelectorAll('[ data-kt-customer-payment-method=\"row\"]');\r\n\r\n        tableRows.forEach(row => {\r\n            // Select delete button\r\n            const deleteButton = row.querySelector('[data-kt-customer-payment-method=\"delete\"]');\r\n\r\n            // Delete button action\r\n            deleteButton.addEventListener('click', e => {\r\n                e.preventDefault();\r\n\r\n                // Popup confirmation\r\n                Swal.fire({\r\n                    text: \"Are you sure you would like to delete this card?\",\r\n                    icon: \"warning\",\r\n                    showCancelButton: true,\r\n                    buttonsStyling: false,\r\n                    confirmButtonText: \"Yes, delete it!\",\r\n                    cancelButtonText: \"No, return\",\r\n                    customClass: {\r\n                        confirmButton: \"btn btn-primary\",\r\n                        cancelButton: \"btn btn-active-light\"\r\n                    }\r\n                }).then(function (result) {\r\n                    if (result.value) {\r\n                        row.remove();\r\n                        modal.hide(); // Hide modal\t\t\t\t\r\n                    } else if (result.dismiss === 'cancel') {\r\n                        Swal.fire({\r\n                            text: \"Your card was not deleted!.\",\r\n                            icon: \"error\",\r\n                            buttonsStyling: false,\r\n                            confirmButtonText: \"Ok, got it!\",\r\n                            customClass: {\r\n                                confirmButton: \"btn btn-primary\",\r\n                            }\r\n                        });\r\n                    }\r\n                });\r\n            });\r\n        });\r\n    }\r\n\r\n    // Handle set as primary button\r\n    const handlePrimaryButton = () => {\r\n        // Define variable\r\n        const button = document.querySelector('[data-kt-payment-mehtod-action=\"set_as_primary\"]');\r\n\r\n        button.addEventListener('click', e => {\r\n            e.preventDefault();\r\n\r\n            // Popup confirmation\r\n            Swal.fire({\r\n                text: \"Are you sure you would like to set this card as primary?\",\r\n                icon: \"warning\",\r\n                showCancelButton: true,\r\n                buttonsStyling: false,\r\n                confirmButtonText: \"Yes, set it!\",\r\n                cancelButtonText: \"No, return\",\r\n                customClass: {\r\n                    confirmButton: \"btn btn-primary\",\r\n                    cancelButton: \"btn btn-active-light\"\r\n                }\r\n            }).then(function (result) {\r\n                if (result.value) {\r\n                    Swal.fire({\r\n                        text: \"Your card was set to primary!.\",\r\n                        icon: \"success\",\r\n                        buttonsStyling: false,\r\n                        confirmButtonText: \"Ok, got it!\",\r\n                        customClass: {\r\n                            confirmButton: \"btn btn-primary\",\r\n                        }\r\n                    });\r\n                } else if (result.dismiss === 'cancel') {\r\n                    Swal.fire({\r\n                        text: \"Your card was not set to primary!.\",\r\n                        icon: \"error\",\r\n                        buttonsStyling: false,\r\n                        confirmButtonText: \"Ok, got it!\",\r\n                        customClass: {\r\n                            confirmButton: \"btn btn-primary\",\r\n                        }\r\n                    });\r\n                }\r\n            });\r\n        });\r\n    };\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            initPaymentMethod();\r\n            handlePrimaryButton();\r\n        }\r\n    }\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n    KTCustomerViewPaymentMethod.init();\r\n});\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/customers/view/payment-method.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/customers/view/payment-method.js"]();
/******/ 	
/******/ })()
;