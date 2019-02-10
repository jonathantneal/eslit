// external tooling
import babel from '@babel/core';
import babelPluginSyntaxDynamicImport from '@babel/plugin-syntax-dynamic-import';

// transform(string)
export default string => babel.transform(
	`(function () {\n  "use strict";\n  return\`${string}\`;\n})();`,
	{
		plugins: [
			babelPluginSyntaxDynamicImport,
			() => ({
				visitor: {
					CallExpression(tPath) {
						if (tPath.node.callee.type === 'Import') {
							tPath.replaceWith(
								babel.types.callExpression(
									babel.types.identifier('include'),
									tPath.node.arguments
								)
							);
						}
					},
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
