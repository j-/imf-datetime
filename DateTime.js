var DateTime = function (date) {
	this.date = new Date();
	if (date) {
		this.setValue(date);
	}
};

DateTime.pad = function (val) {
	val = val.toString();
	return (val.length === 1 ? '0' : '') + val;
};

DateTime.dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
DateTime.monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

DateTime.prototype = {
	showDayOfWeek: true,
	showSecond: true,
	fws: ' ',

	getValue: function (date) {
		return this.date;
	},

	setValue: function (date) {
		this.date = new Date(date);
	},

	valueOf: function () {
		return this.getValue();
	},

	toString: function () {
		return this.format();
	},

	/**
	 * 3.3. Date and Time Specification
	 * @see http://tools.ietf.org/html/rfc5322#section-3.3
	 */

	// date-time       =   [ day-of-week "," ] date time [CFWS]
	format: function () {
		var result = this.showDayOfWeek ? this.getDayOfWeek() + ',' : '';
		result += this.getDate() + this.fws + this.getTime();
		result = result.replace(/\s+/g, this.fws).trim();
		return result;
	},

	// day-of-week     =   ([FWS] day-name) / obs-day-of-week
	getDayOfWeek: function () {
		return this.fws + this.getDayName();
	},

	// day-name        =   "Mon" / "Tue" / "Wed" / "Thu" /
	//                     "Fri" / "Sat" / "Sun"
	getDayName: function () {
		return DateTime.dayNames[this.date.getUTCDay()];
	},

	// date            =   day month year
	getDate: function () {
		return this.getDay() + this.getMonth() + this.getYear();
	},

	// day             =   ([FWS] 1*2DIGIT FWS) / obs-day
	getDay: function () {
		return this.fws + this.date.getUTCDate() + this.fws;
	},

	// month           =   "Jan" / "Feb" / "Mar" / "Apr" /
	//                     "May" / "Jun" / "Jul" / "Aug" /
	//                     "Sep" / "Oct" / "Nov" / "Dec"
	getMonth: function () {
		return DateTime.monthNames[this.date.getUTCMonth()];
	},

	// year            =   (FWS 4*DIGIT FWS) / obs-year
	getYear: function () {
		return this.fws + this.date.getUTCFullYear() + this.fws;
	},

	// time            =   time-of-day zone
	getTime: function () {
		return this.getTimeOfDay() + this.getZone();
	},

	// time-of-day     =   hour ":" minute [ ":" second ]
	getTimeOfDay: function () {
		var result = this.getHour() + ':' + this.getMinute();
		if (this.showSecond) {
			result += ':' + this.getSecond();
		}
		return result;
	},

	// hour            =   2DIGIT / obs-hour
	getHour: function () {
		return DateTime.pad(this.date.getUTCHours());
	},

	// minute          =   2DIGIT / obs-minute
	getMinute: function () {
		return DateTime.pad(this.date.getUTCMinutes());
	},

	// second          =   2DIGIT / obs-second
	getSecond: function () {
		return DateTime.pad(this.date.getUTCSeconds());
	},

	// zone            =   (FWS ( "+" / "-" ) 4DIGIT) / obs-zone
	getZone: function () {
		return this.fws + '+0000';
	}
};

module.exports = DateTime;