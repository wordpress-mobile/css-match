/**
 * Internal dependencies
 */
import { Element, Path } from '../src';

describe( 'Path', () => {
	it( 'should only initialize with an Element', () => {
		expect( () => {
			new Path( 'div' );
		} ).toThrow( 'Expected an instance of Element' );
	} );

	it( 'should initialize with an Element', () => {
		const element = new Element( 'div' );
		const path = new Path( element );

		expect( path ).toBeDefined();
		expect( path.length() ).toBe( 1 );
		expect( path.inspect() ).toBe( 'div' );
	} );

	it( 'should initialize with an Element and ancestor path', () => {
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

		expect( path ).toBeDefined();
		expect( path.length() ).toBe( 3 );
		expect( path.inspect() ).toBe( 'main#main>article#post-12.post.published>h1.post-title' );
	} );
} );
