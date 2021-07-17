//Initializing Express router
const Router=require("express").Router();

//Database Models
const PublicationModel = require("../../database/publication");

/*
Route           /publications
Description     get all publications
Access          PUBLIC
Parameters      NONE
Method          GET
*/
Router.get("/publications",(req,res)=>{
    try{
    return res.json({publications:database.publication});
    }
    catch(error){
        return res.json({ error: error.message });
      }
});
/*
Route           /publication/update/book
Description     update/add new book to a publication for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

Router.put("/publication/update/book/:isbn",(req,res)=>{
    try{
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
}
catch(error){
    return res.json({error:error.message});
  }
});
/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameter       isbn,publication id
Methods         DELETE
*/
Router.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
    try{
    database.publications.forEach((publication)=>{
        if(publication.id===parseInt(req.params.pubId)){
            const newBooksList = publication.books.filter((book)=>book!==req.params.isbn);
            publication.books=newBooksList;
            return;
        }
    });
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.publication=0;//no publication available
            return;
        }
    });
    return res.json({books:database.books,publication:database.publication})
}
catch(error){
    return res.json({ error: error.message });
  }
});

module.exports = Router;