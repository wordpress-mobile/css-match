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
	} );

	it( 'is created with an ID', () => {
		const element = new Element( 'article', { id: 'main' } );
		expect( element ).toBeDefined();
		expect( element.tagName ).toEqual( 'article' );
		expect( element.classNames ).toBeUndefined();
		expect( element.id ).toEqual( 'main' );
	} );

	it( 'is created with multple classes', () => {
		const element = new Element( 'div', { className: 'block selected' } );
		expect( element ).toBeDefined();
		expect( element.tagName ).toEqual( 'div' );
		expect( element.classNames ).toEqual( [ 'block', 'selected' ] );
		expect( element.id ).toBeUndefined();
	} );

	describe( 'inspect', () => {
		it( 'shows string for tagName', () => {
			const element = new Element( 'div' );
			expect( element.inspect() ).toBe( 'div' );
		} );

		it( 'shows string for multiple class names', () => {
			const element = new Element( 'div', { className: 'block selected' } );
			expect( element.inspect() ).toBe( 'div.block.selected' );
		} );

		it( 'shows string for ID', () => {
			const element = new Element( 'article', { id: 'main' } );
			expect( element.inspect() ).toBe( 'article#main' );
		} );

		it( 'shows string for ID and class names', () => {
			const element = new Element( 'div', { id: 'block-1', className: 'block selected' } );
			expect( element.inspect() ).toBe( 'div#block-1.block.selected' );
		} );
	} );
} );
