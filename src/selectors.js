/**
 * External dependencies
 */
import { CssSelectorParser } from 'css-selector-parser';

function parseSelectorString( selectorString ) {
	const parser = new CssSelectorParser();
	parser.registerNestingOperators( '>', '+', '~' );
	parser.registerAttrEqualityMods( '^', '$', '*', '~' );
	const parsedRules = parser.parse( selectorString );

	/*
	CssSelectorParser converts a selector string into it's own structure.

	- For an empty string, it will return null.
	- If the string contains a single selector, it will return an object
	  of type ruleSet.
	- If the string contains multiple selectors, it will return an object
	  of type selectors, containing multiple ruleSets.
	*/

	let rules;
	if ( ! parsedRules ) {
		return [];
	} else if ( parsedRules.type === 'ruleSet' ) {
		rules = [ parsedRules.rule ];
	} else if ( parsedRules.type === 'selectors' ) {
		rules = parsedRules.selectors.map( ( ruleSet ) => ruleSet.rule );
	} else {
		throw new Error( `Unexpected selector type ${ parsedRules.type }` );
	}

	return rules.map( ( rule ) => reverseRule( rule ) );
}

function reverseRule( rule, parent ) {
	const currentSelector = new Selector( rule, parent );
	if ( rule.rule === undefined ) {
		return currentSelector;
	}

	const { nestingOperator, ...childRule } = rule.rule;
	return reverseRule( childRule, new SelectorParent( nestingOperator, currentSelector ) );
}

class SelectorParent {
	constructor( nestingOperator, selector ) {
		this.nestingOperator = nestingOperator;
		this.selector = selector;
	}
}

class Selector {
	constructor( { tagName, classNames, pseudos, id, attrs }, parent ) {
		this.tagName = tagName;
		this.classNames = classNames;
		this.pseudos = pseudos;
		this.id = id;
		this.attributes = attrs;
		this.parent = parent;
	}
}

export { parseSelectorString, Selector, SelectorParent };
