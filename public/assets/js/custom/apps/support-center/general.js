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

/***/ "../public/src/js/custom/apps/support-center/general.js":
/*!**************************************************************!*\
  !*** ../public/src/js/custom/apps/support-center/general.js ***!
  \**************************************************************/
/***/ (() => {

eval("\r\n\r\nvar KTSupportCenterGeneral = function() {\r\n    var menuWrapper;\r\n\r\n    var initInstance = function(element) {\r\n        var elements = element;\r\n\r\n        if ( typeof elements === 'undefined' ) {\r\n            elements = document.querySelectorAll('.highlight');\r\n        }\r\n\r\n        if ( elements && elements.length > 0 ) {\r\n            for ( var i = 0; i < elements.length; ++i ) {\r\n                var highlight = elements[i];\r\n                var copy = highlight.querySelector('.highlight-copy');\r\n\r\n                if ( copy ) {\r\n                    var clipboard = new ClipboardJS(copy, {\r\n                        target: function(trigger) {\r\n                            var highlight = trigger.closest('.highlight');\r\n                            var el = highlight.querySelector('.tab-pane.active');\r\n\r\n                            if ( el == null ) {\r\n                                el = highlight.querySelector('.highlight-code');\r\n                            }\r\n\r\n                            return el;\r\n                        }\r\n                    });\r\n\r\n                    clipboard.on('success', function(e) {\r\n                        var caption = e.trigger.innerHTML;\r\n\r\n                        e.trigger.innerHTML = 'copied';\r\n                        e.clearSelection();\r\n\r\n                        setTimeout(function() {\r\n                            e.trigger.innerHTML = caption;\r\n                        }, 2000);\r\n                    });\r\n                }\r\n            }\r\n        }\r\n    }\r\n\r\n    var handleMenuScroll = function() {\r\n        var menuActiveItem = menuWrapper.querySelector(\".menu-link.active\");\r\n\r\n        if ( !menuActiveItem ) {\r\n            return;\r\n        } \r\n\r\n        if ( KTUtil.isVisibleInContainer(menuActiveItem, menuWrapper) === true) {\r\n            return;\r\n        }\r\n\r\n        menuWrapper.scroll({\r\n            top: KTUtil.getRelativeTopPosition(menuActiveItem, menuWrapper),\r\n            behavior: 'smooth'\r\n        });\r\n    }\r\n\r\n    return {\r\n        init: function() {\r\n            initInstance();\r\n        }\r\n    };\r\n}();\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function() {\r\n    KTSupportCenterGeneral.init();\r\n});\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/apps/support-center/general.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["../public/src/js/custom/apps/support-center/general.js"]();
/******/ 	
/******/ })()
;