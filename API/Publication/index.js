//Initializing Express router
const Router=require("express").Router();

//Database Models
const PublicationModel = require("../../database/publication");

Router.get("/publications",(req,res)=>{
    return res.json({publications:database.publication});
});
/*
Route           /publication/update/book
Description     update/add new book to a publication for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

Router.put("/publication/update/book/:isbn",(req,res)=>{
    //update the publication database
    database.publications.forEach((publication)=>{
        if(publication.id===req.body.pubId){
            return publication.books.push(req.params.isbn);
        }
    });
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publication=req.body.pubId;
            return;
        }
    });
    return res.json({books: database.books,publications:database.publications,message:"Successfully updated publications"})
});
/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameter       isbn,publication id
Methods         DELETE
*/
Router.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
    database.publications.forEach((publication)=>{
        if(publication.id===parseInt(req.params.pubId)){
            const newBooksList = publication.books.filter((book)=>book!==req.params.isbn);
            publication.books=newBooksList;
            return;
        }
    });
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publication=0;
            return;
        }
    });
    return res.json({books:database.books,publication:database.publication})
});

module.exports = Router;