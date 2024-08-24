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

/***/ "../public/src/js/custom/pages/testimonials/testimonials-1.js":
/*!********************************************************************!*\
  !*** ../public/src/js/custom/pages/testimonials/testimonials-1.js ***!
  \********************************************************************/
/***/ ((module) => {

eval("\r\n\r\n// Class definition\r\nvar KTChartMap = function () {\r\n    // Charts widgets\r\n    var initChartMap = function() {\r\n        var element = document.getElementById(\"chartdiv\");\r\n\r\n        if ( !element ) {\r\n            return;\r\n        } \r\n        \r\n        // Create root and chart\r\nvar root = am5.Root.new(\"chartdiv\"); \r\n\r\n// Set themes\r\nroot.setThemes([\r\n  am5themes_Animated.new(root)\r\n]);\r\n\r\nvar chart = root.container.children.push(\r\n  am5map.MapChart.new(root, {\r\n    panX: \"rotateX\",\r\n    projection: am5map.geoNaturalEarth1()\r\n  })\r\n);\r\n\r\n// Create polygon series\r\nvar polygonSeries = chart.series.push(\r\n  am5map.MapPolygonSeries.new(root, {\r\n    geoJSON: am5geodata_continentsLow,\r\n    exclude: [\"antarctica\"]\r\n  })\r\n);\r\n\r\npolygonSeries.mapPolygons.template.setAll({\r\n  tooltipText: \"{name}\",\r\n  interactive: true,\r\n  templateField: \"settings\"\r\n});\r\n\r\npolygonSeries.mapPolygons.template.states.create(\"hover\", {\r\n  fill: am5.color(0x677935)\r\n});\r\n\r\nvar colors = am5.ColorSet.new(root, {});\r\n\r\npolygonSeries.data.setAll([{\r\n  id: \"europe\",\r\n  settings: {\r\n    fill: colors.next(),\r\n    fillPattern: am5.LinePattern.new(root, {\r\n      color: am5.color(0xffffff),\r\n      rotation: 45,\r\n      strokeWidth: 1\r\n    })\r\n  }\r\n}, {\r\n  id: \"asia\",\r\n  settings: {\r\n    fill: colors.next(),\r\n    fillPattern: am5.RectanglePattern.new(root, {\r\n      color: am5.color(0xffffff),\r\n      checkered: true\r\n    })\r\n  }\r\n}, {\r\n  id: \"africa\",\r\n  settings: {\r\n    fill: colors.next(),\r\n    fillPattern: am5.CirclePattern.new(root, {\r\n      color: am5.color(0xffffff),\r\n      checkered: true\r\n    })\r\n  }\r\n}, {\r\n  id: \"northAmerica\",\r\n  settings: {\r\n    fill: colors.next(),\r\n    fillPattern: am5.CirclePattern.new(root, {\r\n      color: am5.color(0xffffff)\r\n    })\r\n  }\r\n}, {\r\n  id: \"southAmerica\",\r\n  settings: {\r\n    fill: colors.next(),\r\n    fillPattern: am5.LinePattern.new(root, {\r\n      color: am5.color(0xffffff),\r\n      rotation: 90,\r\n      strokeWidth: 2\r\n    })\r\n  }\r\n}, {\r\n  id: \"oceania\",\r\n  settings: {\r\n    fill: colors.next(),\r\n    fillPattern: am5.LinePattern.new(root, {\r\n      color: am5.color(0xffffff),\r\n    })\r\n  }\r\n}])\r\n\r\n\r\n        // Init chart\r\n        initChart();\r\n\r\n        // Update chart on theme mode change\r\n        KTThemeMode.on(\"kt.thememode.change\", function() {                \r\n            if (chart.rendered) {\r\n                chart.self.destroy();\r\n            }\r\n\r\n            initChart();\r\n        });              \r\n    }   \r\n     \r\n \r\n\r\n    // Public methods\r\n    return {\r\n        init: function () {            \r\n            // Charts widgets\r\n            initChartMap();              \r\n        }   \r\n    }\r\n}();\r\n\r\n// Webpack support\r\nif ( true && typeof module.exports !== 'undefined') {\r\n    module.exports = KTChartMap;\r\n}\r\n\r\n// On document ready\r\nKTUtil.onDOMContentLoaded(function() {\r\n    KTChartMap.init();\r\n});\r\n\n\n//# sourceURL=webpack://besttripbd/../public/src/js/custom/pages/testimonials/testimonials-1.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module is referenced by other modules so it can't be inlined
/******/ 	var __webpack_exports__ = __webpack_require__("../public/src/js/custom/pages/testimonials/testimonials-1.js");
/******/ 	
/******/ })()
;