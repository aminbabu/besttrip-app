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

/***/ "../public/src/js/custom/apps/projects/list/list.js":
/*!**********************************************************!*\
  !*** ../public/src/js/custom/apps/projects/list/list.js ***!
  \**********************************************************/
/***/ (() => {

eval("\r\n\r\n// Class definition\r\nvar KTProjectList = function () {    \r\n    var initChart = function () {\r\n        // init chart\r\n        var element = document.getElementById(\"kt_project_list_chart\");\r\n\r\n        if (!element) {\r\n            return;\r\n        }\r\n\r\n        var config = {\r\n            type: 'doughnut',\r\n            data: {\r\n                datasets: [{\r\n                    data: [30, 45, 25],\r\n                    backgroundColor: ['#00A3FF', '#50CD89', '#E4E6EF']\r\n                }],\r\n                labels: ['Active', 'Completed', 'Yet to start']\r\n            },\r\n            options: {\r\n                chart: {\r\n                    fontFamily: 'inherit'\r\n                },\r\n                borderWidth: 0,\r\n                cutout: '75%',\r\n                cutoutPercentage: 65,\r\n                responsive: true,\r\n                maintainAspectRatio: false,\r\n                title: {\r\n                    display: false\r\n                },\r\n                animation: {\r\n                    animateScale: true,\r\n                    animateRotate: true\r\n                },\r\n                stroke: {\r\n                    width: 0\r\n                },\r\n                tooltips: {\r\n                    enabled: true,\r\n                    intersect: false,\r\n                    mode: 'nearest',\r\n                    bodySpacing: 5,\r\n                    yPadding: 10,\r\n                    xPadding: 10,\r\n                    caretPadding: 0,\r\n                    displayColors: false,\r\n                    backgroundColor: '#20D489',\r\n                    titleFontColor: '#ffffff',\r\n                    cornerRadius: 4,\r\n                    footerSpacing: 0,\r\n                    titleSpacing: 0\r\n                },\r\n                plugins: {\r\n                    legend: {\r\n                        display: false\r\n                    }\r\n                }                \r\n            }\r\n        };\r\n\r\n        var ctx = element.getContext('2d');\r\n        var myDoughnut = new Chart(ctx, config);\r\n    }\r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {\r\n            initChart();\r\n        }\r\n    }\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function() {\r\n    KTProjectList.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/projects/list/list.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/projects/list/list.js"]();
/******/ 	
/******/ })()
;