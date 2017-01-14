// tooling
const ESLit        = require('..');
const nodeResolve  = require('../lib/node-resolve');
const path         = require('path');
const readFile     = require('../lib/read-file');
const regexpEscape = require('../lib/regexp-escape');

// #ESLit.import (import template from a file with data)
module.exports = function (src = '.', data) {
	// if data is an object
	if (Object(data) === data) {
		// override data
		this.data = data;
	}

	// source #1 (as is)
	const src1 = path.resolve(this.cwd, src);

	// source #2 (with extension)
	const src2 = src1.replace(
		RegExp(`(${ regexpEscape(this.ext) })?$`),
		this.ext
	);

	return readFile(src1).then(
		// source #1 (as is)
		(content) => ({
			file: src1,
			content
		}),
		() => readFile(src2).then(
			// source #2 (with extension)
			(content) => ({
				file: src2,
				content
			}),
			// source #3 (node resolved)
			() => nodeResolve(src, {
				basedir: this.cwd,
				packageFilter: (pkg) => {
					// if content exists
					if (pkg.template) {
						// re-assign content to main
						pkg.main = pkg.template;
					}

					return pkg;
				}
			}).then(
				(src3) => readFile(src3).then(
					(content) => ({
						file: src3,
						content
					})
				)
			)
		)
	).then(
		({
			file,
			content
		}) => ESLit.parse(
			content,
			this.data,
			Object.assign(
				{},
				this,
				{
					cwd: path.dirname(file)
				}
			)
		)
	);
};
