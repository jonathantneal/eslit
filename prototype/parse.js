// tooling
const babel = require('babel-core');

// #ESLit.parse (parse content using data)
module.exports = function (content = '', data) {
	// if data is an object
	if (Object(data) === data) {
		// override data
		this.data = data;
	}

	// content, keys
	this.content = content;
	this.keys    = Object.keys(data);

	// transformed template
	this.code = babel.transform(
		`\`${ content }\``,
		{
			plugins: [
				() => ({
					visitor: {
						TemplateLiteral(tPath) {
							// whether the Template Literal is tagged
							const isTaggedTemplateExpression = tPath.parentPath.isTaggedTemplateExpression();

							if (!isTaggedTemplateExpression) {
								// tag the Template Literal
								tPath.replaceWith(babel.types.taggedTemplateExpression(babel.types.identifier('this.resolve'), tPath.node));
							}
						}
					}
				})
			]
		}
	).code;

	// function constructor bound to keys
	const ESLitFunction = Function.prototype.bind.call(Function, null, ...this.keys);

	// new ESLit Function returning code
	const newESLitFunction = new ESLitFunction(`"use strict";return ${ this.code }`);

	// ESLit Function with scope and key values
	return newESLitFunction.call(
		this,
		...this.keys.map(
			(key) => this.data[key]
		)
	);
};
