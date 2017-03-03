// tooling
const transform = require('./transform');

// parse (parse content using data)
module.exports = function (string = '', rawdata, rawopts) {
	// assigned data
	const data = Object.assign({}, rawdata);

	// keys from data
	const keys = Object.keys(data);

	// args from data
	const args = keys.map(
		(key) => data[key]
	);

	const eslitRequire = (newsrc, newdata, newopts) => require('./eslit-include')(
		newsrc,
		Object.assign({}, rawdata, newdata),
		Object.assign({}, rawopts, newopts)
	);

	eslitRequire.parse = (newstring, newdata, newopts) => module.exports(
		newstring,
		Object.assign({}, rawdata, newdata),
		Object.assign({}, rawopts, newopts)
	);

	eslitRequire.resolve = require('./eslit-resolve');

	// function constructor bound to keys
	const ESLitFunction = Function.prototype.bind.call(Function, null, 'include', ...keys);

	// new ESLit Function returning resolving template literals
	const newESLitFunction = new ESLitFunction(
		transform(string)
	);

	// executed function returning resolving template literals
	const promise = newESLitFunction(eslitRequire, ...args);

	return promise;
};
