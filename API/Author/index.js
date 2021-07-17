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
    try{
    const getAllAuthors=await AuthorModel.find();
    return res.json({authors:getAllAuthors});
    }
    catch(error){
        return res.json({error:error.message});
    }
});

/*
Route           /author/book
Description     Get specific authors based on books ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

Router.get("/book/:isbn",(req,res)=>{
    try{
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.isbn));

    if(getSpecificAuthor.length===0){
        return res.json({error:`No author found of book of name ${req.params.isbn}`,});
    }
    return res.json({author : getSpecificAuthor});}
    catch(error){
        return res.json({error:error.message});
    };
});

/*
Route           /author/add
Description     Add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

Router.post("/add",async(req,res)=>{
    try{
    const {newAuthor} = req.body;//doubt

    AuthorModel.create(newAuthor);
    return res.json({message:"author was added"});
    }
    catch(error){
        return res.json({error:error.message});
    };
});
module.exports = Router;