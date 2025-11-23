const { add, subtract, isEven } = require("../src/mathUtils");

//
// ---------- ADD TESTS ----------
//

test("add() adds positive numbers", () => {
  expect(add(5, 7)).toBe(12);
});

test("add() adds negative numbers", () => {
  expect(add(-5, -3)).toBe(-8);
});

test("add() adds positive and negative numbers", () => {
  expect(add(10, -3)).toBe(7);
});

test("add() adds floating-point numbers", () => {
  expect(add(0.1, 0.2)).toBeCloseTo(0.3); // important for JS decimals!
});

//
// ---------- SUBTRACT TESTS ----------
//

test("subtract() subtracts correctly", () => {
  expect(subtract(10, 4)).toBe(6);
});

test("subtract() handles negatives", () => {
  expect(subtract(-5, -5)).toBe(0);
});

test("subtract() with zero", () => {
  expect(subtract(10, 0)).toBe(10);
});

//
// ---------- IS EVEN TESTS ----------
//

// Standard tests
test("isEven() returns true for even numbers", () => {
  expect(isEven(8)).toBe(true);
  expect(isEven(0)).toBe(true);
});

test("isEven() returns false for odd numbers", () => {
  expect(isEven(3)).toBe(false);
});

// Edge cases
test("isEven() works for negative numbers", () => {
  expect(isEven(-4)).toBe(true);
  expect(isEven(-5)).toBe(false);
});

// Error tests
test("isEven() throws an error for non-number input", () => {
  expect(() => isEven("hello")).toThrow("Input must be a number");
  expect(() => isEven(null)).toThrow("Input must be a number");
  expect(() => isEven(undefined)).toThrow("Input must be a number");
});
