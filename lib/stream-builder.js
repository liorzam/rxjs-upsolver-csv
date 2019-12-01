
const { from } = require('rxjs');
const operators = require('rxjs/operators');
const log = require('gns-log');

const { csv: csvConfig } = require('config');
const { isFileExists, isDirExists } = require('lib/utils');

const { fromStream } = require('lib/rxjs-from-stream');
const { csvFileToReadeableStream, getCsvFiles } = require('lib/csv-parser');


const filterNonNumericOperator = operators.filter(val => /^-?\d+\.?\d*$/.test(val));
const convertToNumberOperator = operators.map(item => +item);

const number = () => [
	filterNonNumericOperator,
	convertToNumberOperator,
	operators.take(10),
];

class StreamBuilder {
	constructor({ path = csvConfig.path } = { }) {

		if (isFileExists(path)) {
			this.csvFiles = [path];
		} else if (isDirExists(path)) {
			this.csvFiles = getCsvFiles(path);
		} else {
			throw new Error(`Invalid path: ${path}`);
		}

		this.pipes = [];
	}

	sum() {
		this.pipes.push(...[
			...number(),
			operators.reduce((acc, val) => val + acc),
		]);
		return this;
	}

	avg() {
		this.pipes.push(...[
			...number(),
			operators.reduce((prev, cur) => ({
				sum: prev.sum + cur,
				count: prev.count + 1,
			}), { sum: 0, count: 0 }),
			operators.map(o => o.sum / o.count),
		]);
		return this;
	}

	ciel() {
		this.pipes.push(...[
			...number(),
			operators.map(val => Math.ceil(val)),
		]);
		return this;
	}

	max() {
		this.pipes.push(...[
			...number(),
			operators.max(),
		]);

		return this;
	}

	min() {
		this.pipes.push(...[
			...number(),
			operators.min(),
		]);

		return this;
	}

	filter(field, value) {
		this.pipes.push(operators.filter(val => val[field] === value));

		return this;
	}

	pluck(field) {
		this.pipes.push(operators.pluck(field));

		return this;
	}

	run() {
		const transformCsvStreamToOvservable = csvFile => fromStream(csvFileToReadeableStream(csvFile));

		from(this.csvFiles)
			.pipe(...[operators.flatMap(transformCsvStreamToOvservable), ...this.pipes])
			.subscribe(val => log.info(val),
				error => log.error(error));
	}
}

module.exports = StreamBuilder;
