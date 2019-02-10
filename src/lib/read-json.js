// internal tooling
import fs from 'fs';

// read json from pathname
export default ([ pathname ]) => new Promise(
	(resolve, reject) => fs.readFile(
		pathname,
		'utf8',
		(error, result) => error ? reject(error) : resolve(
			JSON.parse(result)
		)
	)
);
