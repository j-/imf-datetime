# imf-datetime

Format dates according to the Internet Message Format Date and Time specification ([RFC5322](http://tools.ietf.org/html/rfc5322#section-3.3)).

## Installing

With [npm](http://npmjs.org/):

```sh
$ npm install git://github.com/j-/imf-datetime
```

## Use

```js
var DateTime = require('imf-datetime');
var datetime = new DateTime('1997-11-21T15:55:06.000Z');
console.log(datetime.format()); // "Fri, 21 Nov 1997 15:55:06 +0000"
```

## License

[MIT license](LICENSE).