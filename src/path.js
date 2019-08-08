/**
 * Internal dependencies
 */
import { assertInstanceOf } from './assert';
import { assertElement } from './element';

class Path {
	constructor( element, ancestorPath ) {
		if ( element instanceof Array ) {
			element.forEach( assertElement );
			this.elements = element;
		} else {
			assertElement( element );
			this.elements = [ element ];
		}
		if ( ancestorPath !== undefined ) {
			assertPath( ancestorPath );
			this.elements.push( ...ancestorPath.elements );
		}
	}

	head() {
		return this.elements[ 0 ];
	}

	tail() {
		const tailElements = this.elements.slice( 1 );

		if ( tailElements && tailElements.length > 0 ) {
			return new Path( tailElements );
		}

		return null;
	}

	length() {
		return this.elements.length;
	}

	inspect() {
		return this.elements
			.slice() // Make a copy since reverse() would change the original
			.reverse()
			.map( ( element ) => element.inspect() )
			.join( '>' );
	}
}

function assertPath( path ) {
	assertInstanceOf( path, Path );
}

export { assertPath, Path };
