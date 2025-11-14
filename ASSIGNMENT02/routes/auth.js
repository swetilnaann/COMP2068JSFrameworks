const express = require("express");
const router = express.Router();
const passport = require("passport");
const User = require("../models/user");

// === Register (GET) ===
router.get("/register", (req, res) => res.render("register", { title: "Register" }));

// === Register (POST) ===
router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.send("Email already registered. Try logging in.");
  await new User({ name, email, password }).save();
  res.redirect("/login");
});

// === Login (GET) ===
router.get("/login", (req, res) => res.render("login", { title: "Login" }));

// === Login (POST) ===
router.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/dashboard",
    failureRedirect: "/login",
  })
);

// === Logout ===
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    res.redirect("/login");
  });
});

module.exports = router;
