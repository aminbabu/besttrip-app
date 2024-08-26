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

/***/ "../public/src/js/custom/apps/file-manager/settings.js":
/*!*************************************************************!*\
  !*** ../public/src/js/custom/apps/file-manager/settings.js ***!
  \*************************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTAppFileManagerSettings = function () {\r\n    var form;\r\n\r\n\t// Private functions\r\n\tvar handleForm = function() {\r\n\t\tconst saveButton = form.querySelector('#kt_file_manager_settings_submit');\r\n\r\n        saveButton.addEventListener('click', e => {\r\n            e.preventDefault();\r\n\r\n            saveButton.setAttribute(\"data-kt-indicator\", \"on\");\r\n\r\n            // Simulate process for demo only\r\n            setTimeout(function(){\r\n                toastr.options = {\r\n                    \"closeButton\": true,\r\n                    \"debug\": false,\r\n                    \"newestOnTop\": false,\r\n                    \"progressBar\": false,\r\n                    \"positionClass\": \"toast-top-right\",\r\n                    \"preventDuplicates\": false,\r\n                    \"showDuration\": \"300\",\r\n                    \"hideDuration\": \"1000\",\r\n                    \"timeOut\": \"5000\",\r\n                    \"extendedTimeOut\": \"1000\",\r\n                    \"showEasing\": \"swing\",\r\n                    \"hideEasing\": \"linear\",\r\n                    \"showMethod\": \"fadeIn\",\r\n                    \"hideMethod\": \"fadeOut\"\r\n                };\r\n\r\n                toastr.success('File manager settings have been saved');\r\n\r\n                saveButton.removeAttribute(\"data-kt-indicator\");\r\n            }, 1000);\r\n        });\r\n\t}\r\n\r\n\t// Public methods\r\n\treturn {\r\n\t\tinit: function(element) {\r\n            form = document.querySelector('#kt_file_manager_settings');\r\n\r\n\t\t\thandleForm();\r\n        }\r\n\t};\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function () {\r\n    KTAppFileManagerSettings.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/file-manager/settings.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/file-manager/settings.js"]();
/******/ 	
/******/ })()
;