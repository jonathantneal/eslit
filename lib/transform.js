// external tooling
import babel from 'babel-core';

// transform(string)
export default (string) => babel.transform(
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
