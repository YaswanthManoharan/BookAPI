//Initializing Express router
const Router=require("express").Router();

//Database Models
const AuthorModel = require("../../database/author");

/*
Route           /author
Description     Get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

Router.get("/",async(req,res)=>{
    const getAllAuthors=await AuthorModel.find();
    return res.json({authors:getAllAuthors});
});

/*
Route           /author/book
Description     Get specific authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

Router.get("/book/:isbn",(req,res)=>{
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.category));

    if(getSpecificAuthor.length===0){
        return res.json({error:`No author found of book of name ${req.params.getSpecificAuthor}`,});
    }
    return res.json({author : getSpecificAuthor});
});

/*
Route           /author/add
Description     Add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

Router.post("/add",async(req,res)=>{
    const {newAuthor} = req.body;//doubt

    AuthorModel.create(newAuthor);
    return res.json({message:"author was added"});
});
module.exports = Router;