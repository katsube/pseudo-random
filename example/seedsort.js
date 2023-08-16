const  pseudoRandom = require('../index.js');

const seed   = 123;
const random = new pseudoRandom(seed);

//-------------------------------
// Reversible shuffling of array
//-------------------------------
const array = [1, 2, 3, 4, 5];
console.log('array', array);

const result1 = random.seedSortArray(array);   // [3, 5, 1, 4, 2]
console.log('random.seedSortArray()', result1);

const result2 = random.seedUnSortArray(result1);   // [1, 2, 3, 4, 5]
console.log('random.seedUnSortArray()', result2);
