const mongoose = require("mongoose")
const { Schema } = mongoose
require('mongoose-double')(mongoose);

var SchemaTypes = mongoose.Schema.Types;

const IncExpenSchema = new Schema({
    primarykey:Number,//for indentifying the income or expense schema
    from:{
        type:String,
        required:[true,'']
    },
    amount:{
        type:Number,
        required:[true,'Amount is True!']
    },
    tags:{
        type:String,
        required:[true,'Tags are Important!']
    },
    note:{
        type:String,
    },
    date:{
        type:String,
        required:[true,'Date is Important']
    }
})

const AllIncExpSchema = new Schema({
    //id,accountschema array
    id: {
      type: String,
    },
    totalExpense:{
        type:SchemaTypes.Double,
    },
    totalIncome:{
        type:SchemaTypes.Double,
    },
    IncExpArray: {
      type: Array,
      default: [],
    },
    totalCashExpense:{
        type:SchemaTypes.Double,
        default:0,
    },
    totalCashIncome:{
        type:SchemaTypes.Double,
        default:0,
    },
    totalBankExpense:{
        type:SchemaTypes.Double,
        default:0,
    },
    totalBankIncome:{
        type:SchemaTypes.Double,
        default:0,
    },
    totalCreditExpense:{
        type:SchemaTypes.Double,
        default:0,
    },
    totalCreditIncome:{
        type:SchemaTypes.Double,
        default:0,
    },
  });

const IncExpenModel = mongoose.model("IncomExpense",IncExpenSchema);
const AllIncExpModel = mongoose.model("AllIncomExpense",AllIncExpSchema);
module.exports = {IncExpenModel,AllIncExpModel};