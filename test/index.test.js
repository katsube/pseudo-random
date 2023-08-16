const pseudoRandom = require('../index.js');

const SEED = 123;
const random = new pseudoRandom(SEED);

test('constructor', () => {
  const r = new pseudoRandom();
  expect(r).toBeInstanceOf(pseudoRandom);

  expect(() => { new pseudoRandom(1.1); }).toThrow();
  expect(() => { new pseudoRandom('a'); }).toThrow();
});

test('random.next()', () => {
  const r = random.next();
  expect(r).toBeGreaterThanOrEqual(0);  // 0 <= x
  expect(r).toBeLessThanOrEqual(1);     // x <= 1
});

test('random.next(1, 10)', () => {
  const r = random.next(1, 10);
  expect(r).toBeGreaterThanOrEqual(1);  // 1 <= x
  expect(r).toBeLessThanOrEqual(10);    // x <= 10

  expect(() => { random.next(1.1, 10); }).toThrow();
  expect(() => { random.next(1, 10.1); }).toThrow();
  expect(() => { random.next('a', 'b'); }).toThrow();
});

test('random.digit', () => {
  random.digits = 6;
  expect(random.digits).toBe(6);
  expect(random.next().toString().length).toBe(8); // 0.123456

  expect(() => { random.digits = 0; }).toThrow();
  expect(() => { random.digits = 10; }).toThrow();
  expect(() => { random.digits = 'a'; }).toThrow();

  random.digits = 8;  // restore
});

test('random.shuffleArray(array)', () => {
  const array = [1, 2, 3, 4, 5];
  const r = random.shuffleArray(array);
  expect(r).not.toEqual(array);   // array is shuffled

  expect(() => { random.shuffleArray(); }).toThrow();
  expect(() => { random.shuffleArray(1); }).toThrow();
});

test('random.seedSortArray(array)', () => {
  const array = [1, 2, 3, 4, 5];
  const r = random.seedSortArray(array);
  expect(r).not.toEqual(array);   // array is shuffled

  expect(() => { random.seedSortArray(); }).toThrow();
  expect(() => { random.seedSortArray(1); }).toThrow();
});

test('random.seedUnSortArray(array)', () => {
  const array = [1, 2, 3, 4, 5];
  const shuffledArray = random.seedSortArray(array);
  const r = random.seedUnSortArray(shuffledArray);
  expect(r).toEqual(array);   // array is unshuffled

  expect(() => { random.seedUnSortArray(); }).toThrow();
  expect(() => { random.seedUnSortArray(1); }).toThrow();
});

test('random.resetSeed() / random.seed', () => {
  random.next();
  random.next();
  random.next();
  random.resetSeed();
  expect(random.seed).toBe(SEED);
});

test('random.seed = x', () => {
  random.seed = 999;
  expect(random.seed).toBe(999);

  expect(() => { random.seed = 1.1; }).toThrow();
  expect(() => { random.seed = 'a'; }).toThrow();

  // restore
  random.resetSeed();
});
