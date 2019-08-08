/**
 * Internal dependencies
 */
import {
	Element,
	matchClassNames,
	matchCSSPathWithSelector,
	matchCSSPathWithSelectorString,
	matchId,
	matchElement,
	matchElementName,
	matchPseudos,
	Path,
	parseSelectorString,
} from '../src';

describe( 'matchElementName', () => {
	it( 'should match an explicit tag name', () => {
		const selectors = parseSelectorString( 'article' );
		const element = new Element( 'article' );

		expect( matchElementName( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should match the universal selector', () => {
		const selectors = parseSelectorString( '*' );
		const element = new Element( 'article' );

		expect( matchElementName( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should match if the selector does not contain a tag name', () => {
		const selectors = parseSelectorString( '.article' );
		const element = new Element( 'article' );

		expect( matchElementName( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should not match if the selector contains a different tag name', () => {
		const selectors = parseSelectorString( 'div' );
		const element = new Element( 'article' );

		expect( matchElementName( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );
} );

describe( 'matchClassNames', () => {
	it( 'should match anything if the selector has no class names', () => {
		const selectors = parseSelectorString( 'div' );
		const element = new Element( 'div', { className: 'article' } );

		expect( matchClassNames( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should match if neither the selector or the element has any class names', () => {
		const selectors = parseSelectorString( 'div' );
		const element = new Element( 'article' );

		expect( matchClassNames( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should not match anything if the element has no class names', () => {
		const selectors = parseSelectorString( '.article' );
		const element = new Element( 'div' );

		expect( matchClassNames( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );

	it( 'should match if there is a 1:1 match', () => {
		const selectors = parseSelectorString( '.article' );
		const element = new Element( 'div', { className: 'article' } );

		expect( matchClassNames( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should match if the selector includes one of the element classes', () => {
		const selectors = parseSelectorString( '.article' );
		const element = new Element( 'div', { className: 'post article' } );

		expect( matchClassNames( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should not match if the selector includes more than the element classes', () => {
		const selectors = parseSelectorString( '.article.post' );
		const element = new Element( 'div', { className: 'article' } );

		expect( matchClassNames( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );
} );

describe( 'matchId', () => {
	it( 'should match when neither the element or selector have an id', () => {
		const selectors = parseSelectorString( 'div' );
		const element = new Element( 'article' );

		expect( matchId( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should match when the element and selector have the same id', () => {
		const selectors = parseSelectorString( 'div#post-12' );
		const element = new Element( 'article', { id: 'post-12' } );

		expect( matchId( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should match when the element has an id but the selector does not', () => {
		const selectors = parseSelectorString( 'div' );
		const element = new Element( 'article', { id: 'post-12' } );

		expect( matchId( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should not match when the selector has an id but the element does not', () => {
		const selectors = parseSelectorString( 'div#post-12' );
		const element = new Element( 'article' );

		expect( matchId( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );

	it( 'should not match when the element and selector have a different id', () => {
		const selectors = parseSelectorString( 'div#post-12' );
		const element = new Element( 'article', { id: 'post-20' } );

		expect( matchId( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );
} );

describe( 'matchPseudos', () => {
	it( 'should match when the selector does not have pseudos', () => {
		const selectors = parseSelectorString( 'div' );
		const element = new Element( 'article' );

		expect( matchPseudos( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should not match when the selector has pseudos', () => {
		const selectors = parseSelectorString( 'div:last-child' );
		const element = new Element( 'article' );

		expect( matchPseudos( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );
} );

describe( 'matchElement', () => {
	it( 'should match when all components match exactly', () => {
		const selectors = parseSelectorString( 'div#block-1.block.selected' );
		const element = new Element( 'div', { id: 'block-1', className: 'block selected' } );

		expect( matchElement( element, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should not match when ID differs', () => {
		const selectors = parseSelectorString( 'div#block-2.block.selected' );
		const element = new Element( 'div', { id: 'block-1', className: 'block selected' } );

		expect( matchElement( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );

	it( 'should not match when class name differs', () => {
		const selectors = parseSelectorString( 'div#block-1.block.selected' );
		const element = new Element( 'div', { id: 'block-1', className: 'block' } );

		expect( matchElement( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );

	it( 'should not match when tagName differs', () => {
		const selectors = parseSelectorString( 'div#block-1.block.selected' );
		const element = new Element( 'section', { id: 'block-1', className: 'block selected' } );

		expect( matchElement( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );

	it( 'should not match when pseudos differ', () => {
		const selectors = parseSelectorString( 'div#block-1.block.selected:last-child' );
		const element = new Element( 'div', { id: 'block-1', className: 'block selected' } );

		expect( matchElement( element, selectors[ 0 ] ) ).not.toBeTruthy();
	} );
} );

describe( 'matchCSSPathWithSelector', () => {
	it( 'should match a selector with a single rule', () => {
		const selectors = parseSelectorString( 'div#block-1.block.selected' );
		const element = new Element( 'div', { id: 'block-1', className: 'block selected' } );
		const path = new Path( element );

		expect( matchCSSPathWithSelector( path, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should match a selector with a descendant', () => {
		const selectors = parseSelectorString( '#main .post .post-title' );
		const main = new Element( 'main', { id: 'main' } );
		const article = new Element( 'article', { id: 'post-12', className: 'post published' } );
		const title = new Element( 'h1', { className: 'post-title' } );
		const path = new Path(
			title,
			new Path(
				article,
				new Path(
					main
				)
			)
		);

		expect( matchCSSPathWithSelector( path, selectors[ 0 ] ) ).toBeTruthy();
	} );

	it( 'should match a selector with an unsupported descendant operator', () => {
		const selectors = parseSelectorString( '#main>.post>.post-title' );
		const main = new Element( 'main', { id: 'main' } );
		const article = new Element( 'article', { id: 'post-12', className: 'post published' } );
		const title = new Element( 'h1', { className: 'post-title' } );
		const path = new Path(
			title,
			new Path(
				article,
				new Path(
					main
				)
			)
		);

		expect( matchCSSPathWithSelector( path, selectors[ 0 ] ) ).not.toBeTruthy();
	} );

	it( 'should not match a selector if the element does not have a matching parent', () => {
		const selectors = parseSelectorString( '.post .post-title' );
		const title = new Element( 'h1', { className: 'post-title' } );
		const path = new Path(
			title
		);

		expect( matchCSSPathWithSelector( path, selectors[ 0 ] ) ).not.toBeTruthy();
	} );

	it( 'should not match a selector with a descendant when one of the elements doesn not match', () => {
		const selectors = parseSelectorString( '#main .post .post-title' );
		const main = new Element( 'main' );
		const article = new Element( 'article', { id: 'post-12', className: 'post published' } );
		const title = new Element( 'h1', { className: 'post-title' } );
		const path = new Path(
			title,
			new Path(
				article,
				new Path(
					main
				)
			)
		);

		expect( matchCSSPathWithSelector( path, selectors[ 0 ] ) ).not.toBeTruthy();
	} );
} );

describe( 'matchCSSPathWithSelectorString', () => {
	it( 'should match a selector when one of the rules match', () => {
		const selectorString = 'main .post .post-title, #main .post .post-title';
		const main = new Element( 'main', { id: 'main' } );
		const article = new Element( 'article', { id: 'post-12', className: 'post published' } );
		const title = new Element( 'h1', { className: 'post-title' } );
		const path = new Path(
			title,
			new Path(
				article,
				new Path(
					main
				)
			)
		);

		expect( matchCSSPathWithSelectorString( path, selectorString ) ).toBeTruthy();
	} );

	it( 'should not match a selector when none of the rules match', () => {
		const selectorString = 'article .post .post-title, .article .post .post-title';
		const main = new Element( 'main', { id: 'main' } );
		const article = new Element( 'article', { id: 'post-12', className: 'post published' } );
		const title = new Element( 'h1', { className: 'post-title' } );
		const path = new Path(
			title,
			new Path(
				article,
				new Path(
					main
				)
			)
		);

		expect( matchCSSPathWithSelectorString( path, selectorString ) ).not.toBeTruthy();
	} );
} );
