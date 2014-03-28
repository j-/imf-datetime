var assert = require('assert');
var DateTime = require('../');

describe('DateTime', function () {
	describe('constructor', function () {
		it('should use the current date by default', function () {
			// no reliable way to test if default time is current
			// instead we test if date is initialized
			var datetime = new DateTime();
			assert(!isNaN(datetime.date.getTime()));
		});
		it('should allow initialization with date object', function () {
			var date = new Date();
			date.setUTCFullYear(2008, 7, 16);
			var datetime = new DateTime(date);
			assert.equal(datetime.date.toISOString(), date.toISOString());
		});
		it('should allow initialization with date string', function () {
			var string = '2014-03-29T13:52:31.866Z';
			var datetime = new DateTime(string);
			assert.equal(datetime.date.toISOString(), string);
		});
	});
	describe('#toString', function () {
		it('should return the formatted value', function () {
			var datetime = new DateTime();
			assert.equal(datetime.format(), datetime.toString(), 'toString() does not match format()');
		});
	});
	describe('#getValue', function () {
		it('should return the same value that the instance was initialized with', function () {
			var input = new Date(1990, 7, 16, 0, 0, 0);
			var datetime = new DateTime(input);
			var output = datetime.getValue();
			assert.equal(input.toISOString(), output.toISOString(), 'Date strings do not match');
		});
	});
	describe('#setValue', function () {
		it('should change the internal date object', function () {
			var oldDate = new Date(); oldDate.setUTCFullYear(2014, 2, 29);
			oldDate.setUTCHours(10);
			oldDate.setUTCMinutes(20);
			oldDate.setUTCSeconds(30);
			oldDate.setUTCMilliseconds(40);
			var newDate = new Date(); newDate.setUTCFullYear(2014, 2, 29);
			newDate.setUTCHours(20);
			newDate.setUTCMinutes(30);
			newDate.setUTCSeconds(40);
			newDate.setUTCMilliseconds(50);
			var datetime = new DateTime(oldDate);
			datetime.setValue(newDate);
			assert.notEqual(datetime.date.toISOString(), '2014-03-29T10:20:30.040Z', 'Old value was retained');
			assert.equal(   datetime.date.toISOString(), '2014-03-29T20:30:40.050Z', 'New value was not set');
		});
	});
	describe('#getHour', function () {
		it('should return the correct value', function () {
			var datetime = new DateTime();
			datetime.date.setUTCFullYear(2001, 3, 1);
			datetime.date.setUTCHours( 0); assert.equal(datetime.getHour(), '00');
			datetime.date.setUTCHours( 1); assert.equal(datetime.getHour(), '01');
			datetime.date.setUTCHours(11); assert.equal(datetime.getHour(), '11');
			datetime.date.setUTCHours(12); assert.equal(datetime.getHour(), '12');
			datetime.date.setUTCHours(13); assert.equal(datetime.getHour(), '13');
			datetime.date.setUTCHours(23); assert.equal(datetime.getHour(), '23');
		});
		it('should be exactly two digits', function () {
			var datetime = new DateTime();
			datetime.date.setUTCFullYear(2001, 3, 1);
			assert.equal(datetime.getHour().length, 2);
		});
	});
	describe('#getMinute', function () {
		it('should return the correct value', function () {
			var datetime = new DateTime();
			datetime.date.setUTCFullYear(2001, 3, 1);
			datetime.date.setUTCMinutes( 0); assert.equal(datetime.getMinute(), '00');
			datetime.date.setUTCMinutes( 1); assert.equal(datetime.getMinute(), '01');
			datetime.date.setUTCMinutes(59); assert.equal(datetime.getMinute(), '59');
		});
		it('should be exactly two digits', function () {
			var datetime = new DateTime();
			datetime.date.setUTCFullYear(2001, 3, 1);
			assert.equal(datetime.getMinute().length, 2);
		});
	});
	describe('#getSecond', function () {
		it('should return the correct value', function () {
			var datetime = new DateTime();
			datetime.date.setUTCFullYear(2001, 3, 1);
			datetime.date.setUTCSeconds( 0); assert.equal(datetime.getSecond(), '00');
			datetime.date.setUTCSeconds( 1); assert.equal(datetime.getSecond(), '01');
			datetime.date.setUTCSeconds(59); assert.equal(datetime.getSecond(), '59');
		});
		it('should be exactly two digits', function () {
			var datetime = new DateTime();
			datetime.date.setUTCFullYear(2001, 3, 1);
			assert.equal(datetime.getSecond().length, 2);
		});
	});
	describe('#getZone', function () {
		var datetime = new DateTime();
		datetime.fws = ' ';
		var zone = datetime.getZone();
		zone = zone.replace(/^\s/, '');
		it('should begin with a plus or minus', function () {
			assert(/^[+\-]/.test(zone));
		});
		it('should contain four digits', function () {
			assert(/\d{4}/.test(zone));
		});
		it('should not contain anything else', function () {
			assert(/^[+\-]\d{4}$/.test(zone));
		});
	});
});