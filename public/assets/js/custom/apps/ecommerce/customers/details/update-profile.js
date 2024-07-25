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

/***/ "../public/src/js/custom/apps/ecommerce/customers/details/update-profile.js":
/*!**********************************************************************************!*\
  !*** ../public/src/js/custom/apps/ecommerce/customers/details/update-profile.js ***!
  \**********************************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTEcommerceUpdateProfile = function () {\r\n    var submitButton;\r\n    var validator;\r\n    var form;\r\n\r\n    // Init form inputs\r\n    var handleForm = function () {\r\n        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/\r\n\t\tvalidator = FormValidation.formValidation(\r\n\t\t\tform,\r\n\t\t\t{\r\n\t\t\t\tfields: {\r\n                    'name': {\r\n\t\t\t\t\t\tvalidators: {\r\n\t\t\t\t\t\t\tnotEmpty: {\r\n\t\t\t\t\t\t\t\tmessage: 'Name is required'\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t},\r\n\t\t\t\t\t'gen_email': {\r\n\t\t\t\t\t\tvalidators: {\r\n\t\t\t\t\t\t\tnotEmpty: {\r\n\t\t\t\t\t\t\t\tmessage: 'General Email is required'\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t}\r\n\t\t\t\t\t}\r\n\t\t\t\t},\r\n\t\t\t\tplugins: {\r\n\t\t\t\t\ttrigger: new FormValidation.plugins.Trigger(),\r\n\t\t\t\t\tbootstrap: new FormValidation.plugins.Bootstrap5({\r\n\t\t\t\t\t\trowSelector: '.fv-row',\r\n                        eleInvalidClass: '',\r\n                        eleValidClass: ''\r\n\t\t\t\t\t})\r\n\t\t\t\t}\r\n\t\t\t}\r\n\t\t);\r\n\r\n\t\t// Action buttons\r\n\t\tsubmitButton.addEventListener('click', function (e) {\r\n\t\t\te.preventDefault();\r\n\r\n\t\t\t// Validate form before submit\r\n\t\t\tif (validator) {\r\n\t\t\t\tvalidator.validate().then(function (status) {\r\n\t\t\t\t\tconsole.log('validated!');\r\n\r\n\t\t\t\t\tif (status == 'Valid') {\r\n\t\t\t\t\t\tsubmitButton.setAttribute('data-kt-indicator', 'on');\r\n\r\n\t\t\t\t\t\t// Disable submit button whilst loading\r\n\t\t\t\t\t\tsubmitButton.disabled = true;\r\n\r\n\t\t\t\t\t\tsetTimeout(function() {\r\n\t\t\t\t\t\t\tsubmitButton.removeAttribute('data-kt-indicator');\r\n\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t\tSwal.fire({\r\n\t\t\t\t\t\t\t\ttext: \"Your profile has been saved!\",\r\n\t\t\t\t\t\t\t\ticon: \"success\",\r\n\t\t\t\t\t\t\t\tbuttonsStyling: false,\r\n\t\t\t\t\t\t\t\tconfirmButtonText: \"Ok, got it!\",\r\n\t\t\t\t\t\t\t\tcustomClass: {\r\n\t\t\t\t\t\t\t\t\tconfirmButton: \"btn btn-primary\"\r\n\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t}).then(function (result) {\r\n\t\t\t\t\t\t\t\tif (result.isConfirmed) {\r\n\t\t\t\t\t\t\t\t\t// Enable submit button after loading\r\n\t\t\t\t\t\t\t\t\tsubmitButton.disabled = false;\r\n\t\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t\t});\t\t\t\t\t\t\t\r\n\t\t\t\t\t\t}, 2000);   \t\t\t\t\t\t\r\n\t\t\t\t\t} else {\r\n\t\t\t\t\t\tSwal.fire({\r\n\t\t\t\t\t\t\ttext: \"Sorry, looks like there are some errors detected, please try again.\",\r\n\t\t\t\t\t\t\ticon: \"error\",\r\n\t\t\t\t\t\t\tbuttonsStyling: false,\r\n\t\t\t\t\t\t\tconfirmButtonText: \"Ok, got it!\",\r\n\t\t\t\t\t\t\tcustomClass: {\r\n\t\t\t\t\t\t\t\tconfirmButton: \"btn btn-primary\"\r\n\t\t\t\t\t\t\t}\r\n\t\t\t\t\t\t});\r\n\t\t\t\t\t}\r\n\t\t\t\t});\r\n\t\t\t}\r\n\t\t});\r\n    }\r\n\r\n    return {\r\n        // Public functions\r\n        init: function () {\r\n            // Elements\r\n            form = document.querySelector('#kt_ecommerce_customer_profile');\r\n            submitButton = form.querySelector('#kt_ecommerce_customer_profile_submit');\r\n\r\n            handleForm();\r\n        }\r\n    };\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n\tKTEcommerceUpdateProfile.init();\r\n});\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/ecommerce/customers/details/update-profile.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/ecommerce/customers/details/update-profile.js"]();
/******/ 	
/******/ })()
;