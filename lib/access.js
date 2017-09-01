// internal tooling
import fs from 'fs';

// access file
export default (pathname) => new Promise(
	(resolve, reject) => fs.access(
		pathname,
		(error) => error ? reject(error) : resolve([pathname])
	)
);
