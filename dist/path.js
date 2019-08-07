"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertPath = assertPath;
exports.Path = void 0;

var _assert = require("./assert");

var _element = require("./element");

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Path =
/*#__PURE__*/
function () {
  function Path(element, ancestorPath) {
    _classCallCheck(this, Path);

    (0, _element.assertElement)(element);
    this.elements = [element];

    if (ancestorPath !== undefined) {
      var _this$elements;

      assertPath(ancestorPath);

      (_this$elements = this.elements).push.apply(_this$elements, _toConsumableArray(ancestorPath.elements));
    }
  }

  _createClass(Path, [{
    key: "length",
    value: function length() {
      return this.elements.length;
    }
  }, {
    key: "inspect",
    value: function inspect() {
      return this.elements.reverse().map(function (element) {
        return element.inspect();
      }).join('>');
    }
  }]);

  return Path;
}();

exports.Path = Path;

function assertPath(path) {
  (0, _assert.assertInstanceOf)(path, Path);
}