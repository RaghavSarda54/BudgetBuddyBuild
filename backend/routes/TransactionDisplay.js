const express = require("express");
const expenseModel = require("../model/ExpenseModel");
const accountModel = require("../model/AccountsModel");
const UserModel = require("../model/UserModel");
const { RequestQuote } = require("@mui/icons-material");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const account = await expenseModel.AllIncExpModel.findOne({
      id: req.body.id,
    });
    const accgroup= req.body.from.split("(")[1].split(")")[0];
    let str= "total"+accgroup;
    str= str+ (req.body.key==0?"Expense":"Income");
    // console.log(str);
    const newTrans = new expenseModel.IncExpenModel({
        primarykey: req.body.key,
        from: req.body.from, //.body.account_group is coming from frontend
        amount: req.body.amount,
        tags: req.body.tags, 
        note: req.body.note,
        date: req.body.date,
      });
    if (account) {
      // account.accountSchemaArray.push(newAccount);
      await expenseModel.AllIncExpModel.updateMany(
        { id: req.body.id },
        { $push: { IncExpArray: newTrans }, $inc:(req.body.key==0)?{totalExpense:parseFloat(req.body.amount),[str]:parseFloat(req.body.amount)}:{totalIncome:parseFloat(req.body.amount),[str]:parseFloat(req.body.amount)} }
      )
    }
    else {
        await expenseModel.AllIncExpModel.create({
          id: req.body.id,
          totalExpense:(req.body.key==0)?req.body.amount:0,
          totalIncome: (req.body.key==1)?req.body.amount:0,
          IncExpArray: [newTrans],
          [str]:req.body.amount,
        });
      }
      const accname= req.body.from.split("(")[0];
      const acc= req.body.from.split("(")[1].split(")")[0]+"Array";
      const bal= "Total"+ req.body.from.split("(")[1].split(")")[0];
      const am= (req.body.key==1)?req.body.amount:-req.body.amount;
      await accountModel.AllAccountsModel.updateMany(
        { id: req.body.id ,[`${acc}.accountName`]: accname},
        { $inc: { [`${acc}.$.balance`]: am,[bal]:am }}
      ).then(res.json({ success: true }));
  } catch (error) {
    console.log(error.message);
    res.json({error:"Server Error"});
  }
});

router.get("/",async(req,res)=>{
    try {
        const user = await expenseModel.AllIncExpModel.findOne({
          id: "4",
        });
        res.json({IncExpArray:user.IncExpArray,totalExpense:user.totalExpense,totalIncome:user.totalIncome,totalCashExpense:user.totalCashExpense,totalBankExpense:user.totalBankExpense,totalCreditExpense:user.totalCreditExpense,totalCashIncome:user.totalCashIncome,totalBankIncome:user.totalBankIncome,totalCreditIncome:user.totalCreditIncome});
        res.end();
        // console.log(user.accountSchemaArray);
        //return array of accounts
      } catch (error) {
        console.log(error);
      }
});

module.exports = router;
