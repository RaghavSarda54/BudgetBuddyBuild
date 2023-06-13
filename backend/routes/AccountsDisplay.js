const express = require("express");
const accountModel = require("../model/AccountsModel");
const UserModel = require("../model/UserModel");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    //find the user by id if null then create allaccountschema create
    //if already h then just append krna h vo account allaccountschema mei append krna h
    // const user = await UserModel.findById({_id:req.body.userId})
    const account = await accountModel.AllAccountsModel.findOne({
      id: req.body.id,
    });
    if (account) {
      // const model = await accountModel.AllAccountsModel.findOne()
      // const ALLACCOUNTSUSER = await accountModel.AccountsModel.findOne()
      const newAccount = new accountModel.AccountsModel({
        accountName: req.body.account_name,
        accountGroup: req.body.account_group, //.body.account_group is coming from frontend
        balance: req.body.account_balance,
      });
      // account.accountSchemaArray.push(newAccount);
      if(req.body.account_group==="Cash"){
      await accountModel.AllAccountsModel.updateMany(
        { id: req.body.id },
        { $push: { CashArray: newAccount }, $inc:{TotalCash:req.body.account_balance} }
      ).then(res.json({ success: true }));
      }
      else if(req.body.account_group==="Bank"){
        await accountModel.AllAccountsModel.updateMany(
          { id: req.body.id },
          { $push: { BankArray: newAccount }, $inc:{TotalBank:req.body.account_balance} }
        ).then(res.json({ success: true }));
        }
        else{
          await accountModel.AllAccountsModel.updateMany(
            { id: req.body.id },
            { $push: { CreditArray: newAccount }, $inc:{TotalCredit:req.body.account_balance} }
          ).then(res.json({ success: true }));
          }

      // await account.save();
    } else {
      const newAccount = await accountModel.AccountsModel.create({
        //HERE STORING THE DATA IN THE ACCOUNTS MODEL IN THE MONGO DB
        accountName: req.body.account_name,
        accountGroup: req.body.account_group, //.body.account_group is coming from frontend
        balance: req.body.account_balance,
      }).then(res.json({ success: true }));
      const acc= req.body.account_group+"Array";
      const bal= "Total"+ req.body.account_group;
      await accountModel.AllAccountsModel.create({
        id: req.body.id,
        [acc]: [newAccount],
        [bal]: req.body.account_balance,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.send("Server Error");
  }
});

router.get("/", async (req, res) => {
  try {
    const user = await accountModel.AllAccountsModel.findOne({
      id: "4",
    });

    // res.json(user.accountSchemaArray); //using response we have sent the accountSchemaArray
    // which is an array of accounts
    if(user){
    res.json({CashArray:user.CashArray,BankArray:user.BankArray,CreditArray:user.CreditArray,TotalCash:user.TotalCash,TotalBank:user.TotalBank,TotalCredit:user.TotalCredit});
    res.end();
    }
    else{
      res.json({CashArray:[],BankArray:[],CreditArray:[],TotalCash:0,TotalBank:0,TotalCredit:0});
      res.end();
    }
    
    // console.log(user.accountSchemaArray);
    //return array of accounts
  } catch (error) {
    console.log(error);
  }
});

router.get("/balance", async (req, res) => {
  console.log(req.query.param);
  const accname= req.query.param.split("(")[0];
  const acc= req.query.param.split("(")[1].split(")")[0]+"Array";
  const bal= "Total"+ req.query.param.split("(")[1].split(")")[0];
  // const am= (req.body.key==1)?req.body.amount:-req.body.amount;
  try {
    const user = await accountModel.AllAccountsModel.findOne({
      id: "4",[acc]: {$elemMatch: {accountName:[accname]}}
    });

    // res.json(user.accountSchemaArray); //using response we have sent the accountSchemaArray
    // which is an array of accounts

    res.json({user:user});
    // console.log(user.accountSchemaArray);
    //return array of accounts
  } catch (error) {
    console.log(error);
  }
});
// router.post("/accounts", (req, res) => {
//   try {
//     res.send([accountName, accountGroup, balance]);
//   } catch (error) {
//     console.log(error);
//     res.send("Server Error");
//   }
// });

module.exports = router;
