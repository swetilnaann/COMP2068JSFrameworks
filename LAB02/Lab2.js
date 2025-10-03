// lab2.js
// Import the prompt package
var prompt = require("prompt");

// Start the prompt
prompt.start();

// Ask user for R, P, or S
prompt.get(["userChoice"], function (err, result) {
  if (err) {
    console.error(err);
    return;
  }

  // Convert user input to uppercase
  var userChoice = result.userChoice.toUpperCase();

  // Validate input
  if (!["R", "P", "S"].includes(userChoice)) {
    console.log("Invalid choice! Please choose R, P, or S.");
    return;
  }

  // Generate computer choice using Math.random()
  var randomValue = Math.random();
  var computerChoice = "";

  if (randomValue <= 0.34) {
    computerChoice = "P"; // Paper
  } else if (randomValue <= 0.67) {
    computerChoice = "S"; // Scissors
  } else {
    computerChoice = "R"; // Rock
  }

  console.log(`User chose: ${userChoice}`);
  console.log(`Computer chose: ${computerChoice}`);

  // Decide winner
  if (userChoice === computerChoice) {
    console.log("It's a tie!");
  } else if (
    (userChoice === "R" && computerChoice === "S") ||
    (userChoice === "P" && computerChoice === "R") ||
    (userChoice === "S" && computerChoice === "P")
  ) {
    console.log("User Wins!");
  } else {
    console.log("Computer Wins!");
  }
});
