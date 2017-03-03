// tooling
const fs = require('fs');

// access file
module.exports = (pathname) => new Promise(
	(resolve, reject) => fs.access(
		pathname,
		(error) => error ? reject(error) : resolve([pathname])
	)
);
