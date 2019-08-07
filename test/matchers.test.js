/**
 * Internal dependencies
 */
import { Element, matchElementName, parseSelectorString } from '../src';

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
