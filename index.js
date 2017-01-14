// ESLit
const ESLit = module.exports = function ESLit({
	cwd = ESLit.cwd,
	ext = ESLit.ext
} = {}, data = {}) {
	this.cwd  = cwd;
	this.ext  = ext;
	this.data = data;
};

// ESLit properties
Object.assign(ESLit, {
	cwd:    process.cwd(),
	ext:    '.html',
	import: (src = '.', data = {}, opts = {}) => (
		new ESLit(opts)
	).import(
		src,
		data
	),
	parse:  (content = '', data = {}, opts = {}) => (
		new ESLit(opts)
	).parse(content, data)
});

// ESLit instance properties
Object.assign(ESLit.prototype, {
	import:  require('./prototype/import'),
	parse:   require('./prototype/parse'),
	resolve: require('./prototype/resolve')
});
