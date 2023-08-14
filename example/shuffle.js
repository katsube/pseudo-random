const  pseudoRandom = require('../index.js');

const seed   = 123;
const random = new pseudoRandom(seed);

//-------------------------------
// shuffle array
//-------------------------------
const array = [1, 2, 3, 4, 5];
const result = random.shuffleArray(array);   // ex: [3, 5, 1, 4, 2]
console.log('random.shuffleArray(array)', result);
