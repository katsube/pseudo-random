const pseudoRandom = require('../index.js');
const SEED = 123;

test('constructor', () => {
  const r = new pseudoRandom();
  expect(r).toBeInstanceOf(pseudoRandom);

  expect(() => { new pseudoRandom(1.1); }).toThrow();
  expect(() => { new pseudoRandom('a'); }).toThrow();
});

test('random.next()', () => {
  const random = new pseudoRandom(SEED);
  const r = random.next();
  expect(r).toBeGreaterThanOrEqual(0);  // 0 <= x
  expect(r).toBeLessThanOrEqual(1);     // x <= 1
});

test('random.next(1, 10)', () => {
  const random = new pseudoRandom(SEED);
  const r = random.next(1, 10);
  expect(r).toBeGreaterThanOrEqual(1);  // 1 <= x
  expect(r).toBeLessThanOrEqual(10);    // x <= 10

  expect(() => { random.next(1.1, 10); }).toThrow();
  expect(() => { random.next(1, 10.1); }).toThrow();
  expect(() => { random.next('a', 'b'); }).toThrow();
});

test('random.digit', () => {
  const random = new pseudoRandom(SEED);
  random.digits = 6;
  expect(random.digits).toBe(6);
  expect(random.next().toString().length).toBe(8); // 0.123456

  expect(() => { random.digits = 0; }).toThrow();
  expect(() => { random.digits = 10; }).toThrow();
  expect(() => { random.digits = 'a'; }).toThrow();
});

test('random.shuffleArray(array)', () => {
  const random = new pseudoRandom(SEED);
  const array = [1, 2, 3, 4, 5];
  const r = random.shuffleArray(array);
  expect(r).not.toEqual(array);   // array is shuffled

  expect(() => { random.shuffleArray(); }).toThrow();
  expect(() => { random.shuffleArray(1); }).toThrow();
});

test('random.restoreArray(array)', () => {
  const random = new pseudoRandom(SEED);
  const array = [1, 2, 3, 4, 5];
  const r1 = random.shuffleArray(array);
  const r2 = random.restoreArray(r1);

  expect(r2).toEqual(array);   // array is restored

  expect(() => { random.restoreArray(); }).toThrow();
  expect(() => { random.restoreArray(1); }).toThrow();
});