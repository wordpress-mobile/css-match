function matchElementName( element, selector ) {
	return selector.tagName === undefined ||
		selector.tagName === '*' ||
		selector.tagName === element.tagName;
}

export { matchElementName };
