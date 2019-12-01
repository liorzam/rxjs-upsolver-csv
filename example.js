
const log = require('gns-log');
const StreamBuilder = require('lib/stream-builder');

try {
	// non existent file
	new StreamBuilder({ path: '/Users/lior/Documents/projects/upsolver/data/9999.csv' })
		.filter('state', 'Delaware')
		.pluck('mark')
		.max()
		.run();
} catch (error) {
	log.error(error);
}

new StreamBuilder()
	.filter('mark', '80').pluck('mark').sum()
	.run();
