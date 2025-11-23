const { capitalize, reverse } = require("../src/stringUtils");

//
// ---------- CAPITALIZE TESTS ----------
//

test("capitalize() makes first letter uppercase", () => {
  expect(capitalize("hello")).toBe("Hello");
});

test("capitalize() lowercases the rest", () => {
  expect(capitalize("hELLo")).toBe("Hello");
});

test("capitalize() returns empty string for empty input", () => {
  expect(capitalize("")).toBe("");
});

test("capitalize() works with a single character", () => {
  expect(capitalize("a")).toBe("A");
});

test("capitalize() throws for non-string input", () => {
  expect(() => capitalize(123)).toThrow("Input must be a string");
  expect(() => capitalize(null)).toThrow("Input must be a string");
});

//
// ---------- REVERSE TESTS ----------
//

test("reverse() reverses a normal string", () => {
  expect(reverse("abc")).toBe("cba");
});

test("reverse() handles empty string", () => {
  expect(reverse("")).toBe("");
});

test("reverse() returns same string for palindrome", () => {
  expect(reverse("level")).toBe("level");
});

test("reverse() supports symbols", () => {
  expect(reverse("*hi")).toBe("ih*");
});


test("reverse() throws if input is not a string", () => {
  expect(() => reverse(123)).toThrow("Input must be a string");
});
