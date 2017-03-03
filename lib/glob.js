// tooling
const glob = require('glob');
const path = require('path');

// glob
module.exports = (id, cwd, opts) => new Promise(
	(resolve, reject) => glob(
		id,
		Object.assign(
			{
				cwd: cwd,
				nodir: true
			},
			opts
		),
		(error, files) => error ? reject(error) : files.length ? resolve(
			files.map(
				(file) => path.join(cwd, file)
			)
		) : reject(files)
	)
);
