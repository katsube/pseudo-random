const  pseudoRandom = require('../index.js');

const seed   = 123;
const random = new pseudoRandom(seed);

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
});

test('random.shuffleArray(array)', () => {
  const array = [1, 2, 3, 4, 5];
  const r = random.shuffleArray(array);
  expect(r).not.toEqual(array);   // array is shuffled

  expect(() => { random.shuffleArray(); }).toThrow();
  expect(() => { random.shuffleArray(1); }).toThrow();
});
