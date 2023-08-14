const  pseudoRandom = require('../index.js');

const seed   = 123;
const random = new pseudoRandom(seed);

//-------------------------------
// Generate
//-------------------------------
const result1 = random.next();       // ex: 0.05236359
console.log('random.next()', result1);

const result2 = random.next(1, 10);  // ex: 52  (1 <= x <= 10)
console.log('random.next(1, 10)', result2);
