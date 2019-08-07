/**
 * Internal dependencies
 */
import { assertInstanceOf } from './assert';
import { assertElement } from './element';

class Path {
	constructor( element, ancestorPath ) {
		assertElement( element );
		this.elements = [ element ];
		if ( ancestorPath !== undefined ) {
			assertPath( ancestorPath );
			this.elements.push( ...ancestorPath.elements );
		}
	}

	length() {
		return this.elements.length;
	}

	inspect() {
		return this.elements
			.reverse()
			.map( ( element ) => element.inspect() )
			.join( '>' );
	}
}

function assertPath( path ) {
	assertInstanceOf( path, Path );
}

export { assertPath, Path };
