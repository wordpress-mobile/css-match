/**
 * Internal dependencies
 */
import { assert, assertInstanceOf } from './assert';

class Element {
	constructor( tagName, attributes ) {
		assert( tagName !== undefined, 'Element needs a valid tagName' );

		this.tagName = tagName;
		if ( attributes !== undefined ) {
			const { className, id } = attributes;
			this.id = id;
			this.classNames = className ? className.split( ' ' ) : undefined;
		}
	}

	inspect() {
		const classNamesJoined = this.classNames ?
			this.classNames.map( ( cls ) => '.' + cls ).join( '' ) :
			'';
		const id = this.id ? `#${ this.id }` : '';
		return `${ this.tagName }${ id }${ classNamesJoined }`;
	}
}

function assertElement( element ) {
	assertInstanceOf( element, Element );
}

export { assertElement, Element };
