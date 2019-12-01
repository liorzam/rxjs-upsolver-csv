const fs = require('fs');

const isFileExists = (path) => {
	try {
		return fs.statSync(path).isFile();
	} catch (e) {
		if (e.code === 'ENOENT') { // no such file or directory. File really does not exist
			return false;
		}
		throw e; // something else went wrong, we don't have permissions, ...
	}
};

const isDirExists = (path) => {
	let stat;
	try {
		stat = fs.statSync(path);
	} catch (e) {
		if (e.code === 'ENOENT') return false;
		throw e;
	}

	if (!stat.isDirectory()) { return false; }

	return true;
};

module.exports = {
	isFileExists,
	isDirExists,
};
