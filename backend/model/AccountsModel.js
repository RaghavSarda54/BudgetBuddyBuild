const mongoose = require("mongoose");
const { Schema } = mongoose;
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;
const accountSchema = new Schema({
  accountName: {
    type: String,
    required: [true, "AccountName is required"],
  },
  accountGroup: {
    type: String,
    required: [true, "Detail is required"],
  },
  balance: {
    type: Number,
    required: [true, "Balance is required"],
  },
});

const AllAccountsSchema = new Schema({
  //id,accountschema array
  id: {
    type: String,
  },
  CashArray: {
    type: Array,
    default: [],
  },
  BankArray: {
    type: Array,
    default: [],
  },
  CreditArray: {
    type: Array,
    default: [],
  },
  TotalCash:{
    type:SchemaTypes.Double,
    default:0,
  },
  TotalBank:{
    type:SchemaTypes.Double,
    default:0,
  },
  TotalCredit:{
    type:SchemaTypes.Double,
    default:0,
  },
});

const AccountsModel = mongoose.model("accounts", accountSchema);
const AllAccountsModel = mongoose.model("allaccounts", AllAccountsSchema);
module.exports = { AccountsModel, AllAccountsModel };
