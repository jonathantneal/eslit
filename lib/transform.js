// tooling
const babel = require('babel-core');

// transform(string)
module.exports = (string) => babel.transform(
	`(function () {\n  "use strict";\n  return\`${ string }\`;\n})();`,
	{
		plugins: [
			() => ({
				visitor: {
					TemplateLiteral(tPath) {
						// whether the Template Literal is tagged
						const isTaggedTemplateExpression = tPath.parentPath.isTaggedTemplateExpression();

						if (!isTaggedTemplateExpression) {
							// tag the Template Literal
							tPath.replaceWith(babel.types.taggedTemplateExpression(babel.types.identifier('include.resolve'), tPath.node));
						}
					}
				}
			})
		]
	}
).code.slice(14, -5);
