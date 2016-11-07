// tooling
import * as babel from 'babel-core';
import * as fs from 'fs';
import * as path from 'path';

// Resolving Literal Template
export default class Literally {
	constructor(cwd) {
		// source directory
		this.cwd = cwd || process.cwd();
	}

	import(rawsrc, rawdata) {
		// initialized arguments object
		const data = this.data = rawdata || this.data || {};

		// import source extension
		const ext = path.extname(rawsrc) ? '' : Literally.extension;

		// resolved import source path
		const src = path.resolve(this.cwd, rawsrc + ext);

		// promise file contents as Literally
		return new Promise((resolve, reject) => fs.readFile(src, 'utf8', (error, content) => {
			if (error) {
				reject(error);
			} else {
				// import source directory
				const cwd = path.dirname(src);

				// Literally using existing data
				const newLiterally = new Literally(cwd, data);

				// resolve Literally with file contents and current data
				resolve(newLiterally.parse(content, data));
			}
		}));
	}

	parse(content, rawdata) {
		// initialized arguments object
		const data = this.data = rawdata || this.data || {};

		const keys = this.keys = Object.keys(data);

		// transformed template
		const code = babel.transform('`' + content + '`', {
			plugins: [() => ({
				visitor: {
					TemplateLiteral(tlPath) {
						// whether the Template Literal is tagged
						const isTaggedTemplateExpression = tlPath.parentPath.isTaggedTemplateExpression();

						if (!isTaggedTemplateExpression) {
							// tag the Template Literal
							tlPath.replaceWith(babel.types.taggedTemplateExpression(babel.types.identifier('this.resolve'), tlPath.node));
						}
					}
				}
			})]
		}).code;

		// Function constructor bound by arguments
		const FunctionConstructorArgs = [null].concat(keys, '"use strict";return ' + code);
		const FunctionConstructor = Function.prototype.bind.apply(Function, FunctionConstructorArgs);

		// method returning the transformed template using the instance and its data
		const getNewLiterallyArgs = keys.map((key) => data[key]);

		const getNewLiterally = new FunctionConstructor();

		// results of the method using arguments
		return getNewLiterally.apply(this, getNewLiterallyArgs);
	}

	resolve(members, ...literals) {
		return Promise.all(this.getResolvedPromises(literals)).then(
			() => members.reduce(
				(previousValue, currentValue, currentIndex) => {
					const currentLiteral = literals[currentIndex - 1];

					const resolvedLiteral = Array.isArray(currentLiteral) ? currentLiteral.join('') : currentLiteral;

					return previousValue + resolvedLiteral + currentValue;
				}
			)
		);
	}

	getResolvedPromises(object) {
		const promises = [];

		if (object && typeof object === 'object') {
			for (let key in object) {
				let element = object[key];

				if (element instanceof Promise) {
					promises.push(element.then((result) => {
						object[key] = result;
					}));
				}

				promises.push.apply(promises, this.getResolvedPromises(element));
			}
		}

		return promises;
	}
}

Object.assign(Literally, {
	extension: '.lit',
	import(rawsrc, data, cwd) {
		const newLiterally = new Literally(cwd);

		return newLiterally.import(rawsrc, data);
	},
	parse(rawsrc, data, cwd) {
		const newLiterally = new Literally(cwd);

		return newLiterally.parse(rawsrc, data);
	}
});
