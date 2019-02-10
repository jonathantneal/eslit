// internal tooling
import fs from 'fs';

// readFile, then-ified
export default file => new Promise(
	(resolve, reject) => fs.readFile(
		file,
		'utf8',
		(error, content) => error ? reject(error) : resolve(content)
	)
);
