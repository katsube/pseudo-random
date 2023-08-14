/**
 * Generate pseudo-random number Class
 *
 * algorithm specifies Xorshift
 *
 * example:
 *   const pseudoRandom = require('pseudo-random');
 *   const seed   = 123;
 *   const random = new pseudoRandom(seed);  // If not specified, the current time will be used.
 *
 *   //-------------------------------
 *   // Generate
 *   //-------------------------------
 *   random.next();       // 0.05236359
 *   random.next(1, 10);  // 52  (1 <= x <= 10)
 *
 *   //-------------------------------
 *   // shuffle array
 *   //-------------------------------
 *   const array = [1, 2, 3, 4, 5];
 *   random.shuffleArray(array);   // [3, 5, 1, 4, 2]
 */
class pseudoRandom {
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
   * @param {array} array
   * @returns {array}
   */
  shuffleArray(array) {
    if ( ! Array.isArray(array) ){
      throw new Error('not array');
    }

    const array2 = array.slice();    // copy
    const length = array2.length - 1;
    for (let i = length; i > 0; i--) {
      const r = this.next(0, i);
      const tmp = array2[i];
      array2[i] = array2[r];
      array2[r] = tmp;
    }
    return array2;
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
}

//---------------------------------------------------------
// export
//---------------------------------------------------------
module.exports = pseudoRandom;