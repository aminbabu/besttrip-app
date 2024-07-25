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

/***/ "../public/src/js/custom/apps/contacts/view-contact.js":
/*!*************************************************************!*\
  !*** ../public/src/js/custom/apps/contacts/view-contact.js ***!
  \*************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTAppContactView = function () {\r\n    // Private functions\r\n    const handleDeleteButton = () => {\r\n        // Select form\r\n        const deleteButton = document.getElementById('kt_contact_delete');\r\n\r\n        if (!deleteButton) {\r\n            return;\r\n        }\r\n\r\n        deleteButton.addEventListener('click', e => {\r\n            // Prevent default button action\r\n            e.preventDefault();\r\n\r\n            // Show popup confirmation \r\n            Swal.fire({\r\n                text: \"Delete contact confirmation\",\r\n                icon: \"warning\",\r\n                buttonsStyling: false,\r\n                showCancelButton: true,\r\n                confirmButtonText: \"Yes, delete it!\",\r\n                cancelButtonText: \"No, return\",\r\n                customClass: {\r\n                    confirmButton: \"btn btn-danger\",\r\n                    cancelButton: \"btn btn-active-light\"\r\n                }\r\n            }).then(function (result) {\r\n                if (result.value) {\r\n                    Swal.fire({\r\n                        text: \"Contact has been deleted!\",\r\n                        icon: \"success\",\r\n                        buttonsStyling: false,\r\n                        confirmButtonText: \"Ok, got it!\",\r\n                        customClass: {\r\n                            confirmButton: \"btn btn-primary\"\r\n                        }\r\n                    }).then(function (result) {\r\n                        if (result.value) {\r\n                            // Redirect to customers list page\r\n                            window.location = deleteButton.getAttribute(\"data-kt-redirect\");\r\n                        }\r\n                    });\r\n                } else if (result.dismiss === 'cancel') {\r\n                    Swal.fire({\r\n                        text: \"Contact has not been deleted!.\",\r\n                        icon: \"error\",\r\n                        buttonsStyling: false,\r\n                        confirmButtonText: \"Ok, got it!\",\r\n                        customClass: {\r\n                            confirmButton: \"btn btn-primary\",\r\n                        }\r\n                    });\r\n                }\r\n            });\r\n        });\r\n    }\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n\r\n            handleDeleteButton();\r\n\r\n        }\r\n    };\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n    KTAppContactView.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/contacts/view-contact.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/contacts/view-contact.js"]();
/******/ 	
/******/ })()
;