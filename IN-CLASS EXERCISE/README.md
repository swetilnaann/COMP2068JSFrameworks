COMP 2068 – Unit Testing In-Class Exercise
Student Instructions

This repository teaches you how to write and run Unit Tests using Jest. You will test simple JavaScript functions and learn how Jest reports errors, failures, and successes.

PROJECT STRUCTURE

IN-CLASS EXERCISE
src
mathUtils.js
stringUtils.js
cart.js
tests
mathUtils.test.js
stringUtils.test.js
cart.test.js
package.json
README.md

The src folder contains your JavaScript functions.
The tests folder contains the Jest test files.

REQUIREMENTS

Install:

Node.js
Git
VS Code

GETTING STARTED

Open the "IN-CLASS EXERCISE" folder in VS Code.

Install dependencies
npm install

Run all tests
npm test

You should see PASS or FAIL for each test suite.

FILES YOU WILL WORK WITH

src/mathUtils.js
Contains: add(), subtract(), isEven()

src/stringUtils.js
Contains: capitalize(), reverse()

src/cart.js
Contains: addItem(), removeItem(), findItem(), calculateSubtotal(), calculateTax(), calculateTotal(), clearCart()

These functions are intentionally simple so you can focus on unit testing concepts.

YOUR TASKS

TASK 1 — Explore the Test Files
Open the folder "tests".
Look at:

mathUtils.test.js
stringUtils.test.js
cart.test.js

Compare each test with the functions inside "src".
Run: npm test
See which tests pass and why.

TASK 2 — Test mathUtils.js
Write or verify tests for:

add():
positive numbers
negative numbers
positive + negative
floating point numbers (use toBeCloseTo)

subtract():
simple subtraction
negative numbers
subtracting zero

isEven():
even numbers
odd numbers
negative numbers
invalid input must throw (example: "hello", null, undefined)

Run npm test until everything passes.

TASK 3 — Test stringUtils.js
Write or verify tests for:

capitalize():
first letter uppercase
rest lowercase
empty string ""
one-letter input
throws error for non-string input

reverse():
reverses a normal string
handles empty string
palindrome stays the same
supports symbols (example: "hi" → "ih")
throws error for non-string input

Run npm test and make sure all tests pass.

TASK 4 — Test cart.js
Write or verify tests for:
addItem(), removeItem(), findItem(), calculateSubtotal(), calculateTax(), calculateTotal(), clearCart()

FIXING FAILING TESTS

If a test fails:

Read the Jest error message
Check if the problem is in the test file OR the function in src
Fix the issue
Run npm test again
Repeat until ALL tests pass.

OPTIONAL CHALLENGE TASKS

Challenge 1: Add a new function inside src and write tests for it.
Challenge 2: Add more edge-case tests.
Challenge 3: Write tests that intentionally fail, then fix the code.

WHEN YOU ARE FINISHED

You are done when:

All tests PASS
You understand each test
You can write new tests yourself
You can debug using Jest

This completes your COMP 2068 Unit Testing exercise.

USEFUL VS CODE EXTENSIONS

Jest (by Orta) – Helps run and highlight Jest tests inside the editor
ESLint – Helps catch JavaScript errors and maintain consistent code style
GitLens – Shows Git history, changes, and authorship inside VS Code
Prettier – Automatically formats your JavaScript code
NPM IntelliSense – Auto-completes npm package names in import statements

CREDITS

Created for
COMP 2068 – JavaScript Frameworks
Topic: Unit Testing with Jest
