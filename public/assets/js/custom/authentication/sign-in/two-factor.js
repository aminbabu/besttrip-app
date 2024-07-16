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

/***/ "../public/src/js/custom/authentication/sign-in/two-factor.js":
/*!********************************************************************!*\
  !*** ../public/src/js/custom/authentication/sign-in/two-factor.js ***!
  \********************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class Definition\r\nvar KTSigninTwoFactor = (function () {\r\n  // Elements\r\n  var form;\r\n  var submitButton;\r\n  var validator;\r\n\r\n  // Handle form\r\n  var handleForm = function (e) {\r\n    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/\r\n    validator = FormValidation.formValidation(form, {\r\n      fields: {\r\n        code: {\r\n          validators: {\r\n            notEmpty: {\r\n              message: \"Verification code is required\",\r\n            },\r\n          },\r\n        },\r\n      },\r\n      plugins: {\r\n        trigger: new FormValidation.plugins.Trigger(),\r\n        bootstrap: new FormValidation.plugins.Bootstrap5({\r\n          rowSelector: \".fv-row\",\r\n          eleInvalidClass: \"\",\r\n          eleValidClass: \"\",\r\n        }),\r\n      },\r\n    });\r\n\r\n    // Handle form submit\r\n    submitButton.addEventListener(\"click\", function (e) {\r\n      e.preventDefault();\r\n\r\n      // Validate form before submit\r\n      if (validator) {\r\n        validator.validate().then(function (status) {\r\n          if (status == \"Valid\") {\r\n            submitButton.setAttribute(\"data-kt-indicator\", \"on\");\r\n\r\n            // Disable submit button whilst loading\r\n            submitButton.disabled = true;\r\n\r\n            setTimeout(function () {\r\n              submitButton.removeAttribute(\"data-kt-indicator\");\r\n\r\n              Swal.fire({\r\n                text: \"You have successfully verified your account.\",\r\n                icon: \"success\",\r\n                buttonsStyling: false,\r\n                confirmButtonText: \"Ok, got it!\",\r\n                customClass: {\r\n                  confirmButton: \"btn btn-primary\",\r\n                },\r\n              }).then(function (result) {\r\n                if (result.isConfirmed) {\r\n                  // Enable submit button after loading\r\n                  submitButton.disabled = false;\r\n\r\n                  // Redirect to customers list page\r\n                  window.location = form.getAttribute(\"data-kt-redirect-url\");\r\n                }\r\n              });\r\n            }, 2000);\r\n          } else {\r\n            Swal.fire({\r\n              text: \"Please enter a valid verification code to proceed.\",\r\n              icon: \"error\",\r\n              buttonsStyling: false,\r\n              confirmButtonText: \"Ok, got it!\",\r\n              customClass: {\r\n                confirmButton: \"btn btn-primary\",\r\n              },\r\n            });\r\n          }\r\n        });\r\n      }\r\n    });\r\n  };\r\n\r\n  // Public functions\r\n  return {\r\n    // Initialization\r\n    init: function () {\r\n      form = document.querySelector(\"#kt_sing_in_two_factor_form\");\r\n      submitButton = document.querySelector(\"#kt_sing_in_two_factor_submit\");\r\n\r\n      handleForm();\r\n    },\r\n  };\r\n})();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n  KTSigninTwoFactor.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/authentication/sign-in/two-factor.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/authentication/sign-in/two-factor.js"]();
/******/ 	
/******/ })()
;