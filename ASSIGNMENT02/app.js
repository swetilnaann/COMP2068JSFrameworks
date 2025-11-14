const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const dayjs = require("dayjs"); // optional (for backend date formatting)

const app = express();

// ===== Middleware =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// ===== Database =====
require("./config/db");

// ===== Session + Passport =====
app.use(
  session({
    secret: "secretkey",
    resave: false,
    saveUninitialized: true,
  })
);
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// ===== Protect Routes =====
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// ===== Routes =====
const authRoutes = require("./routes/auth");
const cycleRoutes = require("./routes/cycles");
const Cycle = require("./models/cycle"); // ✅ added for calendar route

app.use("/", authRoutes);
app.use("/", ensureAuthenticated, cycleRoutes);

// ===== Dashboard =====
app.get("/dashboard", ensureAuthenticated, (req, res) =>
  res.render("dashboard", { title: "Dashboard", user: req.user })
);

// ===== Calendar =====
app.get("/calendar", ensureAuthenticated, async (req, res) => {
  try {
    const cycles = await Cycle.find({ userId: req.user._id })
      .sort({ startDate: 1 })
      .lean();

    // Find the latest cycle
    const lastCycle = cycles.length > 0 ? cycles[cycles.length - 1] : null;

    res.render("calendar", {
      title: "Cycle Calendar",
      cycles,
      // ✅ Pass a clean ISO string for Handlebars
      lastStartDate: lastCycle ? dayjs(lastCycle.startDate).format("YYYY-MM-DD") : null,
      user: req.user,
    });
  } catch (err) {
    console.error("Error loading calendar:", err);
    res.status(500).send("Error loading calendar");
  }
});


// ===== Home =====
app.get("/", (req, res) => res.redirect("/login"));

// ===== Start Server =====
app.listen(3000, () =>
  console.log("🌸 Server running on http://localhost:3000")
);
