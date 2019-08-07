"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.parseSelectorString = parseSelectorString;
exports.SelectorParent = exports.Selector = void 0;

var _cssSelectorParser = require("css-selector-parser");

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function parseSelectorString(selectorString) {
  var parser = new _cssSelectorParser.CssSelectorParser();
  parser.registerNestingOperators('>', '+', '~');
  parser.registerAttrEqualityMods('^', '$', '*', '~');
  var parsedRules = parser.parse(selectorString);
  /*
  CssSelectorParser converts a selector string into it's own structure.
  	- For an empty string, it will return null.
  - If the string contains a single selector, it will return an object
    of type ruleSet.
  - If the string contains multiple selectors, it will return an object
    of type selectors, containing multiple ruleSets.
  */

  var rules;

  if (!parsedRules) {
    return [];
  } else if (parsedRules.type === 'ruleSet') {
    rules = [parsedRules.rule];
  } else if (parsedRules.type === 'selectors') {
    rules = parsedRules.selectors.map(function (ruleSet) {
      return ruleSet.rule;
    });
  } else {
    throw new Error("Unexpected selector type ".concat(parsedRules.type));
  }

  return rules.map(function (rule) {
    return reverseRule(rule);
  });
}

function reverseRule(rule, parent) {
  var currentSelector = new Selector(rule, parent);

  if (rule.rule === undefined) {
    return currentSelector;
  }

  var _rule$rule = rule.rule,
      nestingOperator = _rule$rule.nestingOperator,
      childRule = _objectWithoutProperties(_rule$rule, ["nestingOperator"]);

  return reverseRule(childRule, new SelectorParent(nestingOperator, currentSelector));
}

var SelectorParent = function SelectorParent(nestingOperator, selector) {
  _classCallCheck(this, SelectorParent);

  this.nestingOperator = nestingOperator;
  this.selector = selector;
};

exports.SelectorParent = SelectorParent;

var Selector = function Selector(_ref, parent) {
  var tagName = _ref.tagName,
      classNames = _ref.classNames,
      pseudos = _ref.pseudos,
      id = _ref.id,
      attrs = _ref.attrs;

  _classCallCheck(this, Selector);

  this.tagName = tagName;
  this.classNames = classNames;
  this.pseudos = pseudos;
  this.id = id;
  this.attributes = attrs;
  this.parent = parent;
};

exports.Selector = Selector;