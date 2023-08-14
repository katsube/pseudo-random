const  pseudoRandom = require('../index.js');

const seed   = 123;
const random = new pseudoRandom(seed);
random.digits = 6;

const result1 = random.next();       // ex: 0.052363
console.log('random.next()', result1);