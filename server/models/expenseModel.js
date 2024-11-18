const mongoose = require('mongoose');

const ExpenseSchema = new mongoose.Schema({
    userId : { type : String, required : true},
    title : {type : String , required : true },
    amount : {type : Number , required : true },
    date : {type : Date , default : Date.now },
    category : {type : String , required : true },
    description : {type : String },
});

module.exports = mongoose.model('expenseModel', ExpenseSchema);