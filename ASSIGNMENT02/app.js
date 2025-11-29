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
const Cycle = require("./models/cycle"); // for dashboard + calendar

app.use("/", authRoutes);
app.use("/", ensureAuthenticated, cycleRoutes);

// ===== Dashboard: day, phase, tip =====
function getPhaseAndTip(day) {
  if (day <= 5) {
    return {
      phase: "Menstrual Phase",
      tip: "Rest when you can, keep warm, and drink plenty of water.",
    };
  } else if (day <= 14) {
    return {
      phase: "Follicular Phase",
      tip: "Energy often rises—good time for studying, planning, and exercise.",
    };
  } else if (day === 15 || day === 16) {
    return {
      phase: "Ovulation Phase",
      tip: "You may feel more social and confident. Stay hydrated.",
    };
  } else {
    return {
      phase: "Luteal Phase",
      tip: "Mood and energy can dip—prioritize sleep and gentle self-care.",
    };
  }
}

app.get("/dashboard", ensureAuthenticated, async (req, res) => {
  try {
    // use all cycles (no userId filter) to match how you save them
    const cycles = await Cycle.find().sort({ startDate: 1 }).lean();

    let cycleDay = null;
    let phase = null;
    let tip = null;

    if (cycles.length > 0) {
      const lastCycle = cycles[cycles.length - 1];

      const start = dayjs(lastCycle.startDate).startOf("day");
      const today = dayjs().startOf("day");

      const diff = today.diff(start, "day") + 1; // day 1 = start date

      if (diff >= 1 && diff <= 28) {
        cycleDay = diff;
        const info = getPhaseAndTip(diff);
        phase = info.phase;
        tip = info.tip;
      }
    }

    res.render("dashboard", {
      title: "Dashboard",
      user: req.user,
      cycleDay,
      phase,
      tip,
    });
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.render("dashboard", { title: "Dashboard", user: req.user });
  }
});

// ===== Calendar =====
app.get("/calendar", ensureAuthenticated, async (req, res) => {
  try {
    // same: use all cycles, no userId filter
    const cycles = await Cycle.find().sort({ startDate: 1 }).lean();

    const lastCycle = cycles.length > 0 ? cycles[cycles.length - 1] : null;

    res.render("calendar", {
      title: "Cycle Calendar",
      cycles,
      lastStartDate: lastCycle
        ? dayjs(lastCycle.startDate).format("YYYY-MM-DD")
        : null,
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
