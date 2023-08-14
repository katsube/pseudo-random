const  pseudoRandom = require('../index.js');

// If seed is not specified, the current time is used
const random = new pseudoRandom();

//-------------------------------
// Generate
//-------------------------------
const result1 = random.next();       // ex: 0.05236359
console.log('random.next()', result1);

const result2 = random.next(1, 10);  // ex: 52  (1 <= x <= 10)
console.log('random.next(1, 10)', result2);
