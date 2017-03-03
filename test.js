// tooling
const eslit = require('.');
const readFile = require('./lib/read-file');

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
	(result) => readFile('test/basic.expect.html').then(
		(expect) => result.slice(0, -1) === expect ? result : Promise.reject(`Result does not match expectation\n${ JSON.stringify({
			result,
			expect
		}, null, '  ') }`)
	)
).then(
	(result) => console.log(`${ result }\n✔ Passed`) || process.exit(0),
	(error)  => console.log(`${ error }\n✖ Failed`)  || process.exit(1)
);
