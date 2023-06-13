const express = require("express");
const moneyModel = require("../model/ExpenseModel");

const router = express.Router();

router.post("/expense", async (req, res) => {
  try {
    const newexpense = await moneyModel
      .create({
        from: req.body.from,
        amount: req.body.amount,
        tags: req.body.tags,
        note: req.body.note,
        date: req.body.date,
      })
      .then(res.json({ success: true }));
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

router.post("/income", async (req, res) => {
  try {
    const newincome = await moneyModel
      .create({
        from: req.body.from,
        amount: req.body.amount,
        tags: req.body.tags,
        note: req.body.note,
        date: req.body.date,
      })
      .then(res.json({ success: true }));
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

router.get("/expense", async (req, res) => {
  try {
    const expense = moneyModel.findById({ _id: req.body._id });
  } catch (error) {
    console.log(error);
  }
});
