"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assertElement = assertElement;
exports.Element = void 0;

var _assert = require("./assert");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Element =
/*#__PURE__*/
function () {
  function Element(tagName, attributes) {
    _classCallCheck(this, Element);

    (0, _assert.assert)(tagName !== undefined, 'Element needs a valid tagName');
    this.tagName = tagName;

    if (attributes !== undefined) {
      var className = attributes.className,
          id = attributes.id;
      this.id = id;
      this.classNames = className ? className.split(' ') : undefined;
    }
  }

  _createClass(Element, [{
    key: "inspect",
    value: function inspect() {
      var classNamesJoined = this.classNames ? this.classNames.map(function (cls) {
        return '.' + cls;
      }).join('') : '';
      var id = this.id ? "#".concat(this.id) : '';
      return "".concat(this.tagName).concat(id).concat(classNamesJoined);
    }
  }]);

  return Element;
}();

exports.Element = Element;

function assertElement(element) {
  (0, _assert.assertInstanceOf)(element, Element);
}