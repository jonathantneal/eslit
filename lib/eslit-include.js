// tooling
const access = require('./access');
const glob   = require('./glob');
const json   = require('./read-json');
const path   = require('path');
const read   = require('./read-file');

// return array of closest path(s)
module.exports = (rawsrc, rawdata, rawopts = {}) => {
	const {
		// current working directory
		cwd        = process.cwd(),
		// array of prefixes
		prefixes   = ['_'],
		// array of extensions
		extensions = ['.html', '.jsx'],
		// path separator
		separator  = '/',
		// glob options
		globopts   = {}
	} = rawopts;

	const src  = rawsrc[0] === separator ? path.relative(cwd, rawsrc.split(separator).join(path.sep)) : rawsrc.split(separator).join(path.sep);
	const srcs = src.split(path.sep);
	const cwds = cwd.split(path.sep);

	const hasPaths = srcs.length > 1;

	return [].concat(
		// assemble extension combinations
		Array.isArray(extensions) ? extensions.map(
			(extension) => ['', extension]
		) : []
	).concat(
		// assemble prefix combinations
		Array.isArray(prefixes) ? prefixes.map(
			(prefix) => [prefix, '']
		) : []
	).concat(
		// assemble prefix + extension combinations
		...(
			Array.isArray(prefixes) ? prefixes.map(
				(prefix) => Array.isArray(extensions) ? extensions.map(
					(extension) => [prefix, extension]
				) : []
			) : []
		)
	).reduce(
		// return accessible src, src+extension, prefix+src, or prefix+src+extension
		(promise, [ prefix, extension ]) => promise.catch(
			() => access(
				path.join(
					path.sep,
					...cwds,
					...(
						hasPaths ? srcs.slice(0, -1).concat(
							prefix + srcs.slice(-1)[0] + extension
						) : [prefix + src + extension]
					)
				)
			)
		),
		access(
			path.join(path.sep, ...cwds, src)
		)
	).catch(
		// return accessible glob src
		() => glob(
			src,
			path.join(path.sep, ...cwds),
			globopts
		)
	).catch(
		() => cwds.map(
			// assemble module combinations
			(eachcwd, index) => path.join(
				path.sep,
				...cwds.slice(0, index + 1),
				'node_modules',
				srcs[0],
				...(
					hasPaths ? srcs.slice(1) : ['package.json']
				)
			)
		).reverse().reduce(
			// return accessible module src, or module src+package.json file
			(promise, pathname) => promise.catch(
				() => hasPaths ? access(pathname) : access(pathname).then(json).then(
					(pkg) => access(
						path.join(
							path.dirname(pathname),
							pkg.template || pkg.main || 'index.html'
						)
					)
				)
			),
			Promise.reject()
		)
	).catch(
		() => []
	).then(
		(allsrcs) => Promise.all(
			allsrcs.map(
				(eachsrc) => read(eachsrc)
			)
		).then(
			(strings) => require('./eslit-parse')(
				strings.join(''),
				rawdata,
				Object.assign(
					{},
					rawopts,
					{
						cwd: path.dirname(allsrcs[0])
					}
				)
			)
		)
	);
};
