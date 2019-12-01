const fs = require('fs');
const csv = require('csv-stream');
const log = require('gns-log');
const { isDirExists } = require('lib/utils');
const path = require('path');

const csvFileToReadeableStream = (csvFile) => {
	log.info(`Creating stream for: ${path.basename(csvFile)}`);
	const csvStream = csv.createStream();
	return fs.createReadStream(csvFile).pipe(csvStream);
};

const getCsvFiles = (dirPath) => {
	const resolvedPath = path.resolve(process.cwd(), dirPath);

	if (!isDirExists(resolvedPath)) {
		throw new Error('Not a directory');
	}

	return fs
		.readdirSync(resolvedPath)
		.filter(file => (file.indexOf('.') !== 0) && (file.slice(-4) === '.csv'))
		.map(file => path.join(resolvedPath, file));
};

module.exports = {
	csvFileToReadeableStream,
	getCsvFiles,
};
