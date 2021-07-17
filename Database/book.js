const mongoose = require("mongoose");
//creating a book schema
const BookSchema = mongoose.Schema({
    ISBN: {
      type:String,
      required:true,
      minLength:8,
      maxLength:10,
    }, //required
      title: {
        type:String,
        required:true,
        minLength:8,
        maxLength:50,
      },
      pubDate: {type:String,
        required : true},
      language: {type:String,
        required : true},
      numPage: {type:Number,
        required : true},
      author: {type:[Number],required:true,},
      publications: {type:[Number],
        required : true},
      category: {type:[String],
        required : true},
});

//create a book model

const BookModel = mongoose.model("books",BookSchema);

module.exports=BookModel;