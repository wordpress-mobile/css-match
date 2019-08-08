/**
 * Internal dependencies
 */
import { parseSelectorString } from './selectors';

function matchElementName( element, selector ) {
	return selector.tagName === undefined ||
		selector.tagName === '*' ||
		selector.tagName === element.tagName;
}

function matchClassNames( element, selector ) {
	const { classNames: selectorClassNames = [] } = selector;
	const { classNames: elementClassNames = [] } = element;

	for ( const selectorClassName of selectorClassNames ) {
		if ( ! elementClassNames.includes( selectorClassName ) ) {
			return false;
		}
	}
	return true;
}

function matchId( element, selector ) {
	if ( selector.id === undefined ) {
		return true;
	}
	return selector.id === element.id;
}

function matchPseudos( element, selector ) {
	if ( selector.pseudos === undefined ) {
		return true;
	}
	// We don't support pseudos yet, strict equality will ensure that we
	// don't have false positives until we have full support.
	return selector.pseudos === element.pseudos;
}

function matchElement( element, selector ) {
	return matchElementName( element, selector ) &&
		matchClassNames( element, selector ) &&
		matchId( element, selector ) &&
		matchPseudos( element, selector );
}

function matchParent( path, selector ) {
	const { parent } = selector;
	if ( parent === undefined ) {
		return true;
	}

	const { selector: parentSelector, nestingOperator } = parent;
	if ( !! nestingOperator ) {
		// Only descendant operator suported for now
		return false;
	}

	let parentPath = path;
	while ( ( parentPath = parentPath.tail() ) && parentPath.length() > 0 ) {
		if ( matchCSSPathWithSelector( parentPath, parentSelector ) ) {
			return true;
		}
	}

	return false;
}

function matchCSSPathWithSelector( path, selector ) {
	const element = path.head();

	if ( element === undefined ) {
		return false;
	}

	return matchElement( element, selector ) &&
		matchParent( path, selector );
}

/* throws */
function matchCSSPathWithSelectorString( path, selectorString ) {
	const selectors = parseSelectorString( selectorString );

	for ( const selector of selectors ) {
		if ( matchCSSPathWithSelector( path, selector ) ) {
			return true;
		}
	}
	return false;
}

export {
	matchClassNames,
	matchCSSPathWithSelector,
	matchCSSPathWithSelectorString,
	matchElement,
	matchElementName,
	matchId,
	matchPseudos,
};
