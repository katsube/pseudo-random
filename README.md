# pseudo-random.js
Library for generating pseudo-random numbers.

## INDEX
1. [Installation](#installation)
1. [Usage](#usage)
1. [API](#api)
    1. [random.seed](#randomseed)
    1. [random.digits](#randomdigits)
    1. [constructor()](#constructor)
    1. [next()](#next)
    1. [shuffleArray()](#shufflearray)
    1. [seedSortArray()](#seedsortarray)
    1. [seedUnSortArray()](#seedunsortarray)
    1. [resetSeed()](#resetseed)
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

## API
### random.seed
change the seed value. If referenced, you can get the current value.
```javascript
const seed = random.seed;  // current value
random.seed = 128;
```


### random.digits
a random number of digits, an integer from 1 to 8. default is 8. If referenced, you can get the current value.
```javascript
const digits = random.digits; // current value
random.digits = 6;
```

### constructor()
seed value can be specified at instance creation.
```javascript
const random = new pseudoRandom(123);
```

If no seed value is specified, the current time is used.
```javascript
const random = new pseudoRandom();
console.log(random.seed);
  // UNIX TIME(1692199462509)
  //  ↓
  // Last 9 digits (199462509)
  //  ↓
  // Reverse (905264991)
```

### next()
Generates a pseudo-random number from the current seed value. Returns a value with 8 decimal places. **seed changes when executed.**
```javascript
const r = random.next();
console.log(r);  // 0.12345678
```

Max and Min values can be specified. The generated values are integers. `raodom.digits` are ignored.
```javascript
const r = random.next(3, 8);
console.log(r);  // 5
```

### shuffleArray()
Shuffle the array using the seed value. Cannot be undone.

```javascript
const r = random.shuffleArray([1,2,3,4,5]);
console.log(r);  // [3, 5, 1, 4, 2]
```

* Before execution, **seed is reset** to the value passed to the constructor


### seedSortArray()
Shuffle the array using the seed value. You can use `seedUnSortArray()` to undo this.

```javascript
const r = random.seedSortArray([1,2,3,4,5]);
console.log(r);  // [3, 5, 1, 4, 2]
```

* Before execution, **seed is reset** to the value passed to the constructor

### seedUnSortArray()
Restores an array shuffled by `seedSortArray()`

```javascript
const r1 = random.seedSortArray([1,2,3,4,5]);
const r2 = random.seedUnSortArray(r1);
console.log(r2); // [1,2,3,4,5]
```

* Before execution, **seed is reset** to the value passed to the constructor

### resetSeed()
seed is reset to the value passed to the constructor
```javascript
random.resetSeed();
```


## License
The MIT License.