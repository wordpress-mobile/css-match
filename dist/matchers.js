"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.matchClassNames = matchClassNames;
exports.matchCSSPathWithSelector = matchCSSPathWithSelector;
exports.matchCSSPathWithSelectorString = matchCSSPathWithSelectorString;
exports.matchElement = matchElement;
exports.matchElementName = matchElementName;
exports.matchId = matchId;
exports.matchPseudos = matchPseudos;

var _selectors = require("./selectors");

/**
 * Internal dependencies
 */
function matchElementName(element, selector) {
  return selector.tagName === undefined || selector.tagName === '*' || selector.tagName === element.tagName;
}

function matchClassNames(element, selector) {
  var _selector$classNames = selector.classNames,
      selectorClassNames = _selector$classNames === void 0 ? [] : _selector$classNames;
  var _element$classNames = element.classNames,
      elementClassNames = _element$classNames === void 0 ? [] : _element$classNames;
  var _iteratorNormalCompletion = true;
  var _didIteratorError = false;
  var _iteratorError = undefined;

  try {
    for (var _iterator = selectorClassNames[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
      var selectorClassName = _step.value;

      if (!elementClassNames.includes(selectorClassName)) {
        return false;
      }
    }
  } catch (err) {
    _didIteratorError = true;
    _iteratorError = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion && _iterator["return"] != null) {
        _iterator["return"]();
      }
    } finally {
      if (_didIteratorError) {
        throw _iteratorError;
      }
    }
  }

  return true;
}

function matchId(element, selector) {
  if (selector.id === undefined) {
    return true;
  }

  return selector.id === element.id;
}

function matchPseudos(element, selector) {
  if (selector.pseudos === undefined) {
    return true;
  } // We don't support pseudos yet, strict equality will ensure that we
  // don't have false positives until we have full support.


  return selector.pseudos === element.pseudos;
}

function matchElement(element, selector) {
  return matchElementName(element, selector) && matchClassNames(element, selector) && matchId(element, selector) && matchPseudos(element, selector);
}

function matchParent(path, selector) {
  var parent = selector.parent;

  if (parent === undefined) {
    return true;
  }

  var parentSelector = parent.selector,
      nestingOperator = parent.nestingOperator;

  if (!!nestingOperator) {
    // Only descendant operator suported for now
    return false;
  }

  var parentPath = path;

  while ((parentPath = parentPath.tail()) && parentPath.length() > 0) {
    if (matchCSSPathWithSelector(parentPath, parentSelector)) {
      return true;
    }
  }

  return false;
}

function matchCSSPathWithSelector(path, selector) {
  var element = path.head();

  if (element === undefined) {
    return false;
  }

  return matchElement(element, selector) && matchParent(path, selector);
}
/* throws */


function matchCSSPathWithSelectorString(path, selectorString) {
  var selectors = (0, _selectors.parseSelectorString)(selectorString);
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = selectors[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var selector = _step2.value;

      if (matchCSSPathWithSelector(path, selector)) {
        return true;
      }
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2["return"] != null) {
        _iterator2["return"]();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }

  return false;
}