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
 *   random.next(1, 10);  // 52  (1 <= x <= 10)
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
  #seedOrigin;
  #seed;
  #digits = 8;

  /**
   * constructor
   *
   * @param {number} [seed]
   */
  constructor(seed=null) {
    // seed is integer ?
    if ( (seed !== null) && ( ! Number.isInteger(seed) ) )
      throw new Error('seed must be integer');

    this.#seed = (seed === null)?  new Date().getTime() : seed;
    this.#seedOrigin = seed;
  }

  /**
   * Generate pseudo-random number
   *
   * @param {number} [min]
   * @param {number} [max]
   * @returns {number}
   */
  next(min=null, max=null) {
    // is null or integer ?
    if ( (min !== null) && ( ! Number.isInteger(min) ) )
      throw new Error('min must be integer');
    if ( (max !== null) && ( ! Number.isInteger(max) ) )
      throw new Error('max must be integer');

    const digits = Math.pow(10, this.#digits);
    let seed = this.#seed;

    seed = seed ^ (seed << 13);
    seed = seed ^ (seed >>> 17);
    seed = seed ^ (seed << 5);
    this.#seed = seed;

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
    // is number ?
    if ( ! Number.isInteger(digits) ){
      throw new Error('digits must be integer');
    }
    // is between 1 and 8 ?
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
  set seed(seed) {
    // is integer ?
    if ( ! Number.isInteger(seed) ){
      throw new Error('seed must be integer');
    }
    this.#seed = seed;
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
   * create map array
   *
   * @param {number} length
   * @returns {array}
   * @private
   */
  #createMap(length){
    this.resetSeed();
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