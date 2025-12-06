// app.js
require("dotenv").config();
const express = require("express");
const bodyParser = require("body-parser");
const session = require("express-session");
const passport = require("passport");
const path = require("path");
const dayjs = require("dayjs");
const hbs = require("hbs");

const app = express();

// ===== View engine =====
// ===== View engine =====
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));
hbs.registerPartials(path.join(__dirname, "views", "partials"));

// Helpers
hbs.registerHelper("year", () => new Date().getFullYear());
hbs.registerHelper("eq", (a, b) => a === b); 

// ===== Middleware =====
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// ===== Database =====
require("./config/db");

// ===== Session + Passport =====
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secretkey",
    resave: false,
    saveUninitialized: false,
  })
);
require("./config/passport")(passport);
app.use(passport.initialize());
app.use(passport.session());

// make user available in all views as {{user}}
app.use((req, res, next) => {
  res.locals.user = req.user;
  next();
});

// ===== Auth guard =====
function ensureAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.redirect("/login");
}

// ===== Routes =====
const authRoutes = require("./routes/auth");
const cycleRoutes = require("./routes/cycles");
const Cycle = require("./models/cycle");

// ---- Auth routes (login, register, Google, GitHub)
app.use("/", authRoutes);

// ---- Public splash / info pages (NO login needed)
app.get("/", (req, res) => {
  res.render("home", { title: "Home" });
});

app.get("/period-calories", (req, res) => {
  res.render("period-calories", { title: "Period Calories" });
});

app.get("/period-hacks", (req, res) => {
  res.render("period-hacks", { title: "Period Hacks" });
});

app.get("/period-blood-info", (req, res) => {
  res.render("period-blood-info", { title: "Period Blood Info" });
});

// ---- Public read-only page (assignment requirement)
app.get("/public-cycles", async (req, res) => {
  try {
    const cycles = await Cycle.find().lean();

    cycles.forEach((c) => {
      if (c.startDate) c.startDate = dayjs(c.startDate).format("MMM D, YYYY");
      if (c.endDate) c.endDate = dayjs(c.endDate).format("MMM D, YYYY");
    });

    res.render("public-cycles", {
      title: "Public Period Records",
      cycles,
    });
  } catch (err) {
    console.error("Public view error:", err);
    res.status(500).send("Error loading public page");
  }
});

// ---- PRIVATE ROUTES (must be logged in)
app.use("/", ensureAuthenticated, cycleRoutes);

// ===== Helper: pick phase + tip from cycle day =====
function getPhaseAndTip(cycleDay) {
  if (!cycleDay || cycleDay < 1) {
    return {
      phaseName: "Unknown",
      tip: "Add a cycle to start tracking your phases.",
    };
  }

  const d = ((cycleDay - 1) % 28) + 1;

  if (d <= 5) {
    return {
      phaseName: "Menstrual phase",
      tip: "Rest more, use heat/comfort, and don’t push intense workouts.",
    };
  } else if (d <= 13) {
    return {
      phaseName: "Follicular phase",
      tip: "Energy may rise – good time for new tasks and light–moderate exercise.",
    };
  } else if (d <= 15) {
    return {
      phaseName: "Ovulation phase",
      tip: "You might feel more social and confident. Hydrate and listen to your body.",
    };
  } else {
    return {
      phaseName: "Luteal phase",
      tip: "Mood can fluctuate – prioritize sleep, gentle movement, and balanced meals.",
    };
  }
}

// ===== Dashboard (PRIVATE) =====
app.get("/dashboard", ensureAuthenticated, async (req, res) => {
  try {
    const latestCycle = await Cycle.findOne({ user: req.user._id })
      .sort({ startDate: -1 })
      .lean();

    if (!latestCycle) {
      return res.render("dashboard", {
        title: "Dashboard",
        hasCycle: false,
      });
    }

    const today = dayjs().startOf("day");
    const start = dayjs(latestCycle.startDate).startOf("day");

    let cycleDay = today.diff(start, "day") + 1;
    if (cycleDay < 1) cycleDay = 1;

    const { phaseName, tip } = getPhaseAndTip(cycleDay);

    res.render("dashboard", {
      title: "Dashboard",
      hasCycle: true,
      cycleDay,
      phaseName,
      tip,
      cycleStartFormatted: start.format("MMM D, YYYY"),
    });
  } catch (err) {
    console.error("Error loading dashboard:", err);
    res.status(500).send("Server error loading dashboard");
  }
});

// ===== Calendar (PRIVATE) =====
app.get("/calendar", ensureAuthenticated, async (req, res) => {
  try {
    const cycles = await Cycle.find({ user: req.user._id })
      .sort({ startDate: 1 })
      .lean();
    const lastCycle = cycles.length ? cycles[cycles.length - 1] : null;

    res.render("calendar", {
      title: "Cycle Calendar",
      cycles,
      lastStartDate: lastCycle
        ? dayjs(lastCycle.startDate).format("YYYY-MM-DD")
        : null,
    });
  } catch (err) {
    console.error("Error loading calendar:", err);
    res.status(500).send("Error loading calendar");
  }
});

// ===== Start Server =====
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🌸 Server running on http://localhost:${PORT}`)
);
