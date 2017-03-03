// tooling
const fs = require('fs');

// read json from pathname
module.exports = ([ pathname ]) => new Promise(
	(resolve, reject) => fs.readFile(
		pathname,
		'utf8',
		(error, result) => error ? reject(error) : resolve(
			JSON.parse(result)
		)
	)
);
