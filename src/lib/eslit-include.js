// internal tooling
import path from 'path';

// local tooling
import access from './access';
import glob from './glob';
import json from './read-json';
import parse from './eslit-parse';
import read from './read-file';

// return array of closest path(s)
export default (rawsrc, rawdata, rawopts) => {
	const {
		// current working directory
		cwd        = process.cwd(),
		// array of prefixes
		prefixes   = ['_'],
		// array of extensions
		extensions = ['.html', '.jsx'],
		// glob options
		globopts   = {}
	} = Object(rawopts);

	const src  = path.relative(cwd, path.isAbsolute(String(rawsrc)) ? rawsrc : path.join(cwd, String(rawsrc)));
	const srcs = src.split(path.sep);
	const cwds = cwd.split(path.sep);

	const hasPaths = srcs.length > 1;

	return [].concat(
		// assemble extension combinations
		Array.isArray(extensions) ? extensions.map(
			extension => ['', extension]
		) : []
	).concat(
		// assemble prefix combinations
		Array.isArray(prefixes) ? prefixes.map(
			prefix => [prefix, '']
		) : []
	).concat(
		// assemble prefix + extension combinations
		Array.isArray(prefixes) ? prefixes.map(
			prefix => Array.isArray(extensions) ? extensions.map(
				extension => [prefix, extension]
			) : []
		) : []
	).reduce(
		// return accessible src, src+extension, prefix+src, or prefix+src+extension
		(promise, [ prefix, extension ]) => promise.catch(
			() => access(
				path.join(
					cwd,
					...( // eslint-disable-line no-extra-parens
						hasPaths ? srcs.slice(0, -1).concat(
							prefix + srcs.slice(-1)[0] + extension
						) : [prefix + src + extension]
					)
				)
			)
		),
		access(
			path.join(cwd, src)
		)
	).catch(
		// return accessible glob src
		() => glob(
			src,
			cwd,
			globopts
		)
	).catch(
		() => cwds.map(
			// assemble module combinations
			(eachcwd, index) => path.join(
				cwds.slice(0, index + 1).join(path.sep),
				'node_modules',
				srcs[0],
				...( // eslint-disable-line no-extra-parens
					hasPaths ? srcs.slice(1) : ['package.json']
				)
			)
		).reverse().reduce(
			// return accessible module src, or module src+package.json file
			(promise, pathname) => promise.catch(
				() => hasPaths ? access(pathname) : access(pathname).then(json).then(
					pkg => getPackageFile(
						path.dirname(pathname),
						pkg
					)
				)
			),
			Promise.reject()
		)
	).catch(
		() => []
	).then(
		allsrcs => Promise.all(
			allsrcs.map(
				eachsrc => read(eachsrc).catch(
					error => error.code === 'EISDIR' ? json([
						path.join(eachsrc, 'package.json')
					]).then(
						pkg => getPackageFile(eachsrc, pkg).then(
							([ innersrc ]) => read(innersrc)
						)
					) : Promise.reject(error)
				)
			)
		).then(
			strings => parse(
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

const getPackageFile = (dirname, pkg) => access(
	path.join(
		dirname,
		pkg.template || pkg.main || 'index.html'
	)
);
