// src/mathUtils.js

function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function isEven(n) {
  if (typeof n !== "number") {
    throw new Error("Input must be a number");
  }
  return n % 2 === 0;
}

module.exports = { add, subtract, isEven };
