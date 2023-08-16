# pseudo-random.js
Library for generating pseudo-random numbers.

## INDEX
1. [Installation](#installation)
1. [Usage](#usage)
1. [License](#license)

## Installation
```
$ npm install pseudo-random.js
```

## Usage
```javascript
const pseudoRandom = require('pseudo-random.js');
const seed   = 123;
const random = new pseudoRandom(seed);

//-------------------------------
// Generate
//-------------------------------
random.next();       // 0.05236359
random.next(1, 10);  // 2  (1 <= x <= 10)

//-------------------------------
// Shuffle array
//-------------------------------
const array1 = [1, 2, 3, 4, 5];
const r1 = random.shuffleArray(array1);   // [3, 5, 1, 4, 2]

//-------------------------------
// Reversible shuffling of array
// (v1.3.0 later)
//-------------------------------
const array2 = [1, 2, 3, 4, 5];
const result1 = random.seedSortArray(array2);     // [2, 3, 4, 5, 1]
const result2 = random.seedUnSortArray(result1);  // [1, 2, 3, 4, 5]
```

## License
The MIT License.