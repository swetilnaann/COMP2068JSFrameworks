// routes/cycles.js
const express = require("express");
const router = express.Router();
const dayjs = require("dayjs");
const Cycle = require("../models/cycle");

// === READ: All cycles for THIS user ===
router.get("/cycles", async (req, res) => {
  const cycles = await Cycle.find({ user: req.user._id }).lean();

  cycles.forEach((c) => {
    c.startDate = dayjs(c.startDate).format("YYYY-MM-DD");
    c.endDate = dayjs(c.endDate).format("YYYY-MM-DD");
  });

  res.render("cycles-list", { title: "My Cycles", cycles, user: req.user });
});

// === CREATE: Show form ===
router.get("/add-cycle", (req, res) => {
  res.render("add-cycle", { title: "Add Cycle", user: req.user });
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

  await Cycle.create({
    user: req.user._id,
    startDate,
    endDate,
    flow,
    symptoms,
    notes,
  });

  res.redirect("/cycles");
});

// === EDIT: Load form ===
router.get("/edit-cycle/:id", async (req, res) => {
  const cycle = await Cycle.findOne({
    _id: req.params.id,
    user: req.user._id,
  }).lean();

  if (!cycle) return res.redirect("/cycles");

  res.render("edit-cycles", { title: "Edit Cycle", cycle, user: req.user });
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

  await Cycle.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    { startDate, endDate, flow, symptoms, notes }
  );

  res.redirect("/cycles");
});

// === DELETE ===
router.get("/delete-cycle/:id", async (req, res) => {
  await Cycle.findOneAndDelete({
    _id: req.params.id,
    user: req.user._id,
  });
  res.redirect("/cycles");
});

module.exports = router;
