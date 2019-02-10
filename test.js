// internal tooling
const fs = require('fs');

// local tooling
const eslit = require('.');

// read file
const readFile = file => new Promise(
	(resolve, reject) => fs.readFile(
		file,
		'utf8',
		(error, content) => error ? reject(error) : resolve(content)
	)
);

// constants
const testPath = 'test/basic';

const testData = {
	heading: Promise.resolve('Guest List'),
	people: [{
		given: 'Martin',
		family: 'Brody'
	}, {
		given: 'Bruce',
		family: 'Shark'
	}]
};

// testing
eslit(testPath, testData).then(
	result => readFile('test/basic.expect.html').then(
		expect => result === expect ? result : Promise.reject(`Result does not match expectation\n${ JSON.stringify({
			result,
			expect
		}, null, '  ') }`)
	)
).then(
	result => console.log(`${result}\n✔ Passed`) || process.exit(0),
	error  => console.log(`${error}\n✖ Failed`)  || process.exit(1)
);
