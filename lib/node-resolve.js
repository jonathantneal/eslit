// tooling
const nodeResolve = require('resolve');

// resolve, then-ified, package path and contents
module.exports = (id, opts = {}) => new Promise(
	(resolve, reject) => nodeResolve(
		id,
		opts,
		(error, result) => error ? reject(error) : resolve(result)
	)
);
