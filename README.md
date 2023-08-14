# pseudo-random.js
Library for generating pseudo-random numbers.

## INDEX
1. Installation
1. Usage
1. License

## Installation
```
$ npm install pseudo-random.js
```

## Usage
```javascript
const pseudoRandom = require('pseudo-random.js');
const seed   = 123;
const random = new pseudoRandom(seed);  // If not specified, the current time will be used.

//-------------------------------
// Generate
//-------------------------------
random.next();       // 0.05236359
random.next(1, 10);  // 2  (1 <= x <= 10)

//-------------------------------
// shuffle array
//-------------------------------
const array = [1, 2, 3, 4, 5];
random.shuffleArray(array);   // [3, 5, 1, 4, 2]
```

## License
The MIT License.