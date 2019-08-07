/**
 * Internal dependencies
 */
import { Element } from '../src';

describe( 'Element', () => {
	it( 'fails to create without arguments', () => {
		expect( () => {
			new Element();
		} ).toThrow( 'Element needs a valid tagName' );
	} );

	it( 'is created with a tagName', () => {
		const element = new Element( 'div' );
		expect( element ).toBeDefined();
		expect( element.tagName ).toEqual( 'div' );
		expect( element.classNames ).toBeUndefined();
		expect( element.id ).toBeUndefined();
		expect( element.inspect() ).toBe( 'div' );
	} );

	it( 'is created with an ID', () => {
		const element = new Element( 'article', { id: 'main' } );
		expect( element ).toBeDefined();
		expect( element.tagName ).toEqual( 'article' );
		expect( element.classNames ).toBeUndefined();
		expect( element.id ).toEqual( 'main' );
		expect( element.inspect() ).toBe( 'article#main' );
	} );

	it( 'is created with multple classes', () => {
		const element = new Element( 'div', { className: 'block selected' } );
		expect( element ).toBeDefined();
		expect( element.tagName ).toEqual( 'div' );
		expect( element.classNames ).toEqual( [ 'block', 'selected' ] );
		expect( element.id ).toBeUndefined();
		expect( element.inspect() ).toBe( 'div.block.selected' );
	} );

	it( 'is created with ID and class names', () => {
		const element = new Element( 'div', { id: 'block-1', className: 'block selected' } );
		expect( element ).toBeDefined();
		expect( element.tagName ).toEqual( 'div' );
		expect( element.classNames ).toEqual( [ 'block', 'selected' ] );
		expect( element.id ).toEqual( 'block-1' );
		expect( element.inspect() ).toBe( 'div#block-1.block.selected' );
	} );
} );
