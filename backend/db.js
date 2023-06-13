const mongoose = require("mongoose");
const mongoURL =
  "mongodb+srv://raghavsarda7023597686:6f1uvplQrjlPGMoZ@cluster0.qskmh9u.mongodb.net/BudgetBuddy?retryWrites=true&w=majority";

const mongoDB = async (req, res) => {
  await mongoose.connect(mongoURL, async (err, results) => {
    if (err) console.log(err);
    else {
      console.log("connected");
    }
  });
};

module.exports = mongoDB;
