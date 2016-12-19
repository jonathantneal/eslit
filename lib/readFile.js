// tooling
const fs = require('fs');

// readFile, then-ified
module.exports = (file) => new Promise(
	(resolve, reject) => fs.readFile(
		file,
		'utf8',
		(error, content) => error ? reject(error) : resolve(content)
	)
);
