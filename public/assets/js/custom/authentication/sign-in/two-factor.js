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

eval("\n\n// Class Definition\nvar KTSigninTwoFactor = (function () {\n  // Elements\n  var form;\n  var submitButton;\n  var validator;\n\n  // Handle form\n  var handleForm = function (e) {\n    // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/\n    validator = FormValidation.formValidation(form, {\n      fields: {\n        code: {\n          validators: {\n            notEmpty: {\n              message: \"Verification code is required\",\n            },\n          },\n        },\n      },\n      plugins: {\n        trigger: new FormValidation.plugins.Trigger(),\n        bootstrap: new FormValidation.plugins.Bootstrap5({\n          rowSelector: \".fv-row\",\n          eleInvalidClass: \"\",\n          eleValidClass: \"\",\n        }),\n      },\n    });\n\n    // Handle form submit\n    submitButton.addEventListener(\"click\", function (e) {\n      e.preventDefault();\n\n      // Validate form before submit\n      if (validator) {\n        validator.validate().then(function (status) {\n          console.log(\"validated!\");\n\n          if (status == \"Valid\") {\n            submitButton.setAttribute(\"data-kt-indicator\", \"on\");\n\n            // Disable submit button whilst loading\n            submitButton.disabled = true;\n\n            setTimeout(function () {\n              submitButton.removeAttribute(\"data-kt-indicator\");\n\n              Swal.fire({\n                text: \"You have successfully verified your account.\",\n                icon: \"success\",\n                buttonsStyling: false,\n                confirmButtonText: \"Ok, got it!\",\n                customClass: {\n                  confirmButton: \"btn btn-primary\",\n                },\n              }).then(function (result) {\n                if (result.isConfirmed) {\n                  // Enable submit button after loading\n                  submitButton.disabled = false;\n\n                  // Redirect to customers list page\n                  window.location = form.getAttribute(\"data-kt-redirect-url\");\n                }\n              });\n            }, 2000);\n          } else {\n            Swal.fire({\n              text: \"Please enter a valid verification code to proceed.\",\n              icon: \"error\",\n              buttonsStyling: false,\n              confirmButtonText: \"Ok, got it!\",\n              customClass: {\n                confirmButton: \"btn btn-primary\",\n              },\n            });\n          }\n        });\n      }\n    });\n  };\n\n  // Public functions\n  return {\n    // Initialization\n    init: function () {\n      form = document.querySelector(\"#kt_sing_in_two_factor_form\");\n      submitButton = document.querySelector(\"#kt_sing_in_two_factor_submit\");\n\n      handleForm();\n    },\n  };\n})();\n\n// On document ready\nKTUtil.onDOMContentLoaded(function () {\n  KTSigninTwoFactor.init();\n});\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/authentication/sign-in/two-factor.js?");

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