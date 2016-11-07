import fs from 'fs';
import lit from '.';

const data = {
	heading: Promise.resolve('Guest List'),
	people: [{
		given: 'Martin',
		family: 'Brody'
	}, {
		given: 'Bruce',
		family: 'Shark'
	}]
};

lit.import('test/basic', data).then((content) => {
	return new Promise((resolve, reject) => {
		fs.readFile('test/basic.expect.html', 'utf8', (fserror, fscontent) => {
			if (fserror) {
				reject(fserror);
			} else if (fscontent === content) {
				resolve(content);
			} else {
				reject({
					expect: fscontent,
					result: content
				});
			}
		});
	});
}).then(() => {
	console.log('✔ Passed\n');

	process.exit(0);
}, (error) => {
	console.log('✖ Failed\n');

	console.warn(error);

	process.exit(1);
});
