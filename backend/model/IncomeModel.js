const mongoose = require('mongoose')
const {Schema} =  mongoose

const IncomeSchema = new Schema({
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