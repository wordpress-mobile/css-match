function assert( value, message = 'Assertion failed' ) {
	if ( ! value ) {
		throw message;
	}
}

function assertInstanceOf( value, Class ) {
	assert( value instanceof Class, `Expected an instance of ${ Class.name }, got: ${ value }` );
}

export { assert, assertInstanceOf };
