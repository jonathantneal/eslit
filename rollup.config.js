// external tooling
import babelPresetEnv from '@babel/preset-env';
import rollupPluginBabel from 'rollup-plugin-babel';
import { terser } from 'rollup-plugin-terser';

// export rollup configuration
export default {
	input: 'src/index.js',
	output: [
		{ file: 'index.js', format: 'cjs', sourcemap: true },
		{ file: 'index.mjs', format: 'esm', sourcemap: true }
	],
	external: [
		'@babel/core',
		'@babel/plugin-syntax-dynamic-import',
		'fs',
		'glob',
		'path'
	],
	plugins: [
		rollupPluginBabel({
			babelrc: false,
			presets: [
				[
					babelPresetEnv,
					{
						loose: true,
						modules: false,
						targets: { node: 6 },
						useBuiltIns: 'entry'
					}
				]
			]
		}),
		terser()
	]
};
