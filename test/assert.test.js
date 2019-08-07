/**
 * Internal dependencies
 */
import { assert } from '../src';

describe( 'assert', () => {
	it( 'should throw with a false value', () => {
		expect( () => {
			assert( false );
		} ).toThrow( 'Assertion failed' );
	} );

	it( 'should throw with a false value and a custom message', () => {
		expect( () => {
			assert( false, 'This should never happen' );
		} ).toThrow( 'This should never happen' );
	} );

	it( 'should not throw with a true value', () => {
		expect( () => {
			assert( true );
		} ).not.toThrow();
	} );
} );
