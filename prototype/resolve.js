// #ESLit.resolve (promise resolved literals)
module.exports = (members, ...literals) => Promise.all(
	getResolvedPromises(literals)
).then(
	() => members.reduce(
		(previousValue, currentValue, currentIndex) => {
			const currentLiteral = literals[currentIndex - 1];

			const resolvedLiteral = Array.isArray(currentLiteral) ? currentLiteral.join('') : currentLiteral;

			return `${ previousValue }${ resolvedLiteral }${ currentValue }`;
		}
	)
);

const getResolvedPromises = (object) => {
	const promises = [];

	if (object && typeof object === 'object') {
		for (let key in object) {
			let element = object[key];

			if (element instanceof Promise) {
				promises.push(element.then((result) => {
					object[key] = result;
				}));
			}

			promises.push.apply(promises, getResolvedPromises(element));
		}
	}

	return promises;
};
