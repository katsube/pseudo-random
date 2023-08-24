/**
 * Generate pseudo-random number Class
 *
 * algorithm specifies Xorshift
 *
 * example:
 *   const pseudoRandom = require('pseudo-random');
 *   const seed = 123;
 *   const random = new pseudoRandom(seed);  // If not specified, the current time will be used.
 *
 *   //-------------------------------
 *   // Generate
 *   //-------------------------------
 *   random.next();       // 0.05236359
 *   random.next(1, 10);  // 5  (1 <= x <= 10)
 *
 *   //-------------------------------
 *   // shuffling of array
 *   //-------------------------------
 *   const array = [1, 2, 3, 4, 5];
 *   random.shuffleArray(array);   // [3, 5, 1, 4, 2]
 *
 *   //-------------------------------
 *   // Reversible shuffling of array
 *   //-------------------------------
 *  const array = [1, 2, 3, 4, 5];
 *  const shuffledArray = random.seedSortArray(array);   // [3, 5, 1, 4, 2]
 *  const unShuffledArray = random.seedUnSortArray(shuffledArray);   // [1, 2, 3, 4, 5]
 */
class pseudoRandom {
  #seed;
  #seedOrigin;
  #digits = 8;

  /**
   * constructor
   *
   * @param {number} [seed]
   */
  constructor(seed=null) {
    this.seed = (seed === null)?  this.#timeSeed() : seed;
    this.#seedOrigin = this.seed;
  }

  /**
   * Generate pseudo-random number
   *
   * @param {number} [min]
   * @param {number} [max]
   * @returns {number}
   */
  next(min=null, max=null) {
    if ( (min !== null) && ( ! Number.isInteger(min) ) )
      throw new Error('min must be integer');
    if ( (max !== null) && ( ! Number.isInteger(max) ) )
      throw new Error('max must be integer');

    let seed = this.#uint2int(this.#seed);
    seed = seed ^ (seed << 13);
    seed = seed ^ (seed >>> 17);
    seed = seed ^ (seed << 5);
    this.#seed = this.#int2uint(seed);

    const digits = Math.pow(10, this.#digits);
    const rand = Math.abs(seed % digits) / digits;
    if ( (max !== null) && (min !== null) ) {
      return Math.floor(rand * (max - min + 1)) + min;
    }
    return rand;
  }

  /**
   * shuffle array
   *
   * Shuffles a 1D array. If the seed values are the same, the result is identical.
   *  It cannot be undone.
   *
   * @param {array} array
   * @returns {array}
   */
  shuffleArray(array) {
    if ( ! Array.isArray(array) ){
      throw new Error('not array');
    }
    this.resetSeed();

    const array2 = array.slice();    // copy
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(this.next() * (i + 1));
      [array2[i], array2[j]] = [array2[j], array2[i]];
    }
    return array2;
  }

  /**
   * Reversible 1D array shuffling
   *
   * @param {array} array
   * @returns {array}
   * @throws {Error} not array
   */
  seedSortArray(array) {
    if ( ! Array.isArray(array) ){
      throw new Error('not array');
    }

    const map = this.#createMap(array.length);
    return this.#sortByMap(map, array);
  }

  /**
   * Reversible 1D array "un"shuffling
   *
   * @param {array} array
   * @returns {array}
   * @throws {Error} not array
   */
  seedUnSortArray(array) {
    if ( ! Array.isArray(array) ){
      throw new Error('not array');
    }

    const map = this.#createMap(array.length);
    return this.#unSortByMap(map, array);
  }

  /**
   * reset seed
   *
   * @returns {void}
   */
  resetSeed() {
    this.#seed = this.#seedOrigin;
  }

  /**
   * set digits
   *
   * @param {number} digits
   * @returns {void}
   */
  set digits(digits) {
    if ( ! Number.isInteger(digits) ){
      throw new Error('digits must be integer');
    }
    if( digits < 1 || digits > 8 ){
      throw new Error('digits must be between 1 and 8');
    }
    this.#digits = digits;
  }

  /**
   * get digits
   *
   * @returns {number}
   */
  get digits() {
    return this.#digits;
  }

  /**
   * set seed
   *
   */
  set seed(num) {
    if ( ! Number.isInteger(num) ){
      throw new Error('seed must be integer');
    }
    if ( ! (0 <= num && num <= 0xFFFFFFFF) ){
      throw new Error('seed must be between 0 and 0xFFFFFFFF(4,294,967,295)');
    }

    this.#seed = num;
  }

  /**
   * get seed
   *
   * @returns {number}
   */
  get seed() {
    return this.#seed;
  }

  /**
   * Create time seed
   *
   * @returns {number}
   * @private
   */
  #timeSeed = () =>{
    const time = new Date().getTime() % Math.pow(10, 9);        // Last 9 digits of UNIX TIME
    const seed = time.toString().split('').reverse().join('');  // reverse
    return parseInt(seed);
  }

  /**
   * unsigned int to signed int
   *
   * @param {number} num
   * @returns {number}
   * @private
   */
  #uint2int = (num) => (0x7FFFFFFF<num) ? num-0x100000000 : num;

  /**
   * signed int to unsigned int
   *
   * @param {number} num
   * @returns {number}
   * @private
   */
  #int2uint = (num) => (num<0) ? num+0x100000000 : num;

  /**
   * create map array
   *
   * @param {number} length
   * @returns {array}
   * @private
   */
  #createMap(length){
    return this.shuffleArray(Array.from({length}, (_, i) => i));
  }

  /**
   * sort by map
   *
   * @param {array} map
   * @param {array} arr
   * @returns {array}
   * @private
   */
  #sortByMap(map, arr){
    return map.map(i => arr[i]);
  }

  /**
   * unsort by map
   *
   * @param {array} map
   * @param {array} arr
   * @returns {array}
   */
  #unSortByMap(map, arr){
    const result = [ ];
    map.forEach((idx, i) => {
      result[idx] = arr[i];
    });
    return result;
  }
}

//---------------------------------------------------------
// export
//---------------------------------------------------------
module.exports = pseudoRandom;