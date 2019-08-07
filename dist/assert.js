"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.assert = assert;
exports.assertInstanceOf = assertInstanceOf;

function assert(value) {
  var message = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'Assertion failed';

  if (!value) {
    throw message;
  }
}

function assertInstanceOf(value, Class) {
  assert(value instanceof Class, "Expected an instance of ".concat(Class.name, ", got: ").concat(value));
}