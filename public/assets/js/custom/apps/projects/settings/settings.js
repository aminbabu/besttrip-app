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

/***/ "../public/src/js/custom/apps/projects/settings/settings.js":
/*!******************************************************************!*\
  !*** ../public/src/js/custom/apps/projects/settings/settings.js ***!
  \******************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTProjectSettings = (function () {\r\n    // Private functions\r\n    var handleForm = function () {\r\n        // Init Datepicker --- For more info, please check Flatpickr's official documentation: https://flatpickr.js.org/\r\n        $('#kt_datepicker_1').flatpickr({\r\n            enableTime: false,\r\n            dateFormat: 'Y-m-d',\r\n            maxDate: 'today',\r\n        });\r\n\r\n        // Form validation\r\n        var validation;\r\n        var _form = document.getElementById('kt_project_settings_form');\r\n        var submitButton = _form.querySelector('#kt_project_settings_submit');\r\n\r\n        // Init form validation rules. For more info check the FormValidation plugin's official documentation:https://formvalidation.io/\r\n        validation = FormValidation.formValidation(_form, {\r\n            fields: {\r\n                name: {\r\n                    validators: {\r\n                        notEmpty: {\r\n                            message: 'Project name is required',\r\n                        },\r\n                    },\r\n                },\r\n                type: {\r\n                    validators: {\r\n                        notEmpty: {\r\n                            message: 'Project type is required',\r\n                        },\r\n                    },\r\n                },\r\n                description: {\r\n                    validators: {\r\n                        notEmpty: {\r\n                            message: 'Project Description is required',\r\n                        },\r\n                    },\r\n                },\r\n                date: {\r\n                    validators: {\r\n                        notEmpty: {\r\n                            message: 'Due Date is required',\r\n                        },\r\n                    },\r\n                },\r\n            },\r\n            plugins: {\r\n                trigger: new FormValidation.plugins.Trigger(),\r\n                submitButton: new FormValidation.plugins.SubmitButton(),\r\n                //defaultSubmit: new FormValidation.plugins.DefaultSubmit(), // Uncomment this line to enable normal button submit after form validation\r\n                bootstrap: new FormValidation.plugins.Bootstrap5({\r\n                    rowSelector: '.fv-row',\r\n                }),\r\n            },\r\n        });\r\n\r\n        submitButton.addEventListener('click', function (e) {\r\n            e.preventDefault();\r\n\r\n            validation.validate().then(function (status) {\r\n                if (status == 'Valid') {\r\n                    swal.fire({\r\n                        text: \"Thank you! You've updated your project settings\",\r\n                        icon: 'success',\r\n                        buttonsStyling: false,\r\n                        confirmButtonText: 'Ok, got it!',\r\n                        customClass: {\r\n                            confirmButton: 'btn fw-bold btn-light-primary',\r\n                        },\r\n                    });\r\n                } else {\r\n                    swal.fire({\r\n                        text: 'Sorry, looks like there are some errors detected, please try again.',\r\n                        icon: 'error',\r\n                        buttonsStyling: false,\r\n                        confirmButtonText: 'Ok, got it!',\r\n                        customClass: {\r\n                            confirmButton: 'btn fw-bold btn-light-primary',\r\n                        },\r\n                    });\r\n                }\r\n            });\r\n        });\r\n    };\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            handleForm();\r\n        },\r\n    };\r\n})();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n    KTProjectSettings.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/projects/settings/settings.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/projects/settings/settings.js"]();
/******/ 	
/******/ })()
;