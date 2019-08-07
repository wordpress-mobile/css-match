/**
 * Internal dependencies
 */
import { parseSelectorString, Selector, SelectorParent } from '../src';

describe( 'parseSelectorString', () => {
	it( 'should return an empty array from an empty string', () => {
		const selectors = parseSelectorString( '' );
		expect( selectors ).toBeInstanceOf( Array );
	} );

	it( 'should parse a single selector', () => {
		const selectors = parseSelectorString( 'article#post-12.post.published' );
		expect( selectors ).toBeInstanceOf( Array );
		expect( selectors.length ).toBe( 1 );

		const selector = selectors[ 0 ];
		expect( selector ).toBeInstanceOf( Selector );
		expect( selector.tagName ).toBe( 'article' );
		expect( selector.classNames ).toEqual( [ 'post', 'published' ] );
		expect( selector.id ).toBe( 'post-12' );
		expect( selector.pseudos ).toBeUndefined();
		expect( selector.attributes ).toBeUndefined();
		expect( selector.parent ).toBeUndefined();
	} );

	it( 'should parse a selector with descendants', () => {
		const selectors = parseSelectorString( 'main#main>article#post-12.post.published>h1.post-title' );
		expect( selectors ).toBeInstanceOf( Array );
		expect( selectors.length ).toBe( 1 );

		const headingSelector = selectors[ 0 ];
		expect( headingSelector ).toBeInstanceOf( Selector );
		expect( headingSelector.tagName ).toBe( 'h1' );
		expect( headingSelector.classNames ).toEqual( [ 'post-title' ] );
		expect( headingSelector.id ).toBeUndefined();
		expect( headingSelector.attributes ).toBeUndefined();
		expect( headingSelector.pseudos ).toBeUndefined();
		expect( headingSelector.parent ).toBeInstanceOf( SelectorParent );
		expect( headingSelector.parent.nestingOperator ).toBe( '>' );
		expect( headingSelector.parent.selector ).toBeDefined();

		const postSelector = headingSelector.parent.selector;
		expect( postSelector ).toBeInstanceOf( Selector );
		expect( postSelector.tagName ).toBe( 'article' );
		expect( postSelector.classNames ).toEqual( [ 'post', 'published' ] );
		expect( postSelector.id ).toBe( 'post-12' );
		expect( postSelector.attributes ).toBeUndefined();
		expect( postSelector.pseudos ).toBeUndefined();
		expect( postSelector.parent ).toBeInstanceOf( SelectorParent );
		expect( postSelector.parent.nestingOperator ).toBe( '>' );
		expect( postSelector.parent.selector ).toBeDefined();

		const mainSelector = postSelector.parent.selector;
		expect( mainSelector ).toBeInstanceOf( Selector );
		expect( mainSelector.tagName ).toBe( 'main' );
		expect( mainSelector.classNames ).toBeUndefined();
		expect( mainSelector.id ).toBe( 'main' );
		expect( mainSelector.attributes ).toBeUndefined();
		expect( mainSelector.pseudos ).toBeUndefined();
		expect( mainSelector.parent ).toBeUndefined();
	} );

	it( 'should parse a selector with attributes', () => {
		const selectors = parseSelectorString( 'a[target=_blank]' );
		expect( selectors ).toBeInstanceOf( Array );
		expect( selectors.length ).toBe( 1 );

		const selector = selectors[ 0 ];
		expect( selector ).toBeInstanceOf( Selector );
		expect( selector.tagName ).toBe( 'a' );
		expect( selector.classNames ).toBeUndefined();
		expect( selector.id ).toBeUndefined();
		expect( selector.pseudos ).toBeUndefined();
		expect( selector.attributes ).toMatchObject( [ {
			name: 'target',
			value: '_blank',
			operator: '=',
		} ] );
		expect( selector.parent ).toBeUndefined();
	} );
} );
