"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchElementName = matchElementName;

function matchElementName(element, selector) {
  return selector.tagName === undefined || selector.tagName === '*' || selector.tagName === element.tagName;
}