const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const Cycle = require("../models/cycle");

// === READ: All cycles ===
router.get("/list", async (req, res) => {
  const cycles = await Cycle.find().lean();
  cycles.forEach(c => {
    c.startDate = dayjs(c.startDate).format("YYYY-MM-DD");
    c.endDate = dayjs(c.endDate).format("YYYY-MM-DD");
  });
  res.render("cycles-list", { title: "My Cycles", cycles });
});

// === CREATE: Show form ===
router.get("/add-cycle", (req, res) => {
  res.render("add-cycle", { title: "Add Cycle" });
});

// === CREATE: Save data ===
router.post("/add-cycle", async (req, res) => {
  const { startDate, endDate, flow, notes } = req.body;
  const symptoms = {
    cramps: !!req.body.cramps,
    moodSwings: !!req.body.moodSwings,
    bloating: !!req.body.bloating,
    fatigue: !!req.body.fatigue,
  };
  await Cycle.create({ startDate, endDate, flow, symptoms, notes });
  res.redirect("/list");
});

// === EDIT: Load form ===
router.get("/edit-cycle/:id", async (req, res) => {
  const cycle = await Cycle.findById(req.params.id).lean();
  res.render("edit-cycles", { title: "Edit Cycle", cycle });
});

// === UPDATE: Save changes ===
router.post("/edit-cycle/:id", async (req, res) => {
  const { startDate, endDate, flow, notes } = req.body;
  const symptoms = {
    cramps: !!req.body.cramps,
    moodSwings: !!req.body.moodSwings,
    bloating: !!req.body.bloating,
    fatigue: !!req.body.fatigue,
  };
  await Cycle.findByIdAndUpdate(req.params.id, { startDate, endDate, flow, symptoms, notes });
  res.redirect("/list");
});

// === DELETE ===
router.get("/delete-cycle/:id", async (req, res) => {
  await Cycle.findByIdAndDelete(req.params.id);
  res.redirect("/list");
});

// === CALENDAR ===
router.get("/calendar", async (req, res) => {
  const cycles = await Cycle.find().lean();
  res.render("calendar", { title: "Cycle Calendar", cycles });
});

module.exports = router;
