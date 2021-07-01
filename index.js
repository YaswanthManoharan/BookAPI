require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const database = require("./database/index");
//Models
const BookModel = require("./database/book");
const AuthorModel = require("./database/author");
const PublicationModel = require("./database/publication");
//Initialisation
const booky = express();
//configuration
booky.use(express.json());
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>console.log("connection established"));
/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
booky.get("/",(req,res)=>{
    return res.json({books:database.books});
});
/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/is/:isbn",(req,res)=>{
    const getSpecificBook = database.books.filter((book)=>book.ISBN === req.params.isbn);

    if(getSpecificBook.length===0){
        return res.json({error:`No book found for the ISBN of ${req.params.isbn}`,});
    }
    return res.json({book : getSpecificBook});
});

/*
Route           /c
Description     Get specific books based on Cayegory
Access          PUBLIC
Parameter       category
Methods         GET
*/
booky.get("/c/:category",(req,res)=>{
    const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));

    if(getSpecificBook.length===0){
        return res.json({error:`No book found of category of ${req.params.category}`,});
    }
    return res.json({book : getSpecificBook});
});

/*
Route           /author
Description     Get all authors
Access          PUBLIC
Parameter       NONE
Methods         GET
*/

booky.get("/author",(req,res)=>{
    return res.json({authors:database.author});
});

/*
Route           /author/book
Description     Get specific authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/

booky.get("/author/book/:isbn",(req,res)=>{
    const getSpecificAuthor = database.author.filter((author) => author.books.includes(req.params.category));

    if(getSpecificAuthor.length===0){
        return res.json({error:`No author found of book of name ${req.params.getSpecificAuthor}`,});
    }
    return res.json({author : getSpecificAuthor});
});

booky.get("/publications",(req,res)=>{
    return res.json({publications:database.publication});
});
/*
Route           /book/add
Description     Add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/book/add",(req,res)=>{
    const {newBook} = req.body;//doubt

    database.books.push(newBook);
    return res.json({books:database.books});

});

/*
Route           /author/add
Description     Add new author
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

booky.post("/author/add",(req,res)=>{
    const {newAuthor} = req.body;//doubt

    database.author.push(newAuthor);
    return res.json({books:database.author});
});

/*
Route           /book/update/title
Description     Update book Title
Access          PUBLIC
Parameter       NONE
Methods         PUT
*/
booky.put("/book/update/title/:isbn",(req,res)=>{
    //foreach
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.title=req.body.newBookTitle;
            return;
        }
    });
    return res.json({books:database.books});
    //map (should not use)
});

/*
Route           /book/update/author
Description     Update/add new author for a book
Access          PUBLIC
Parameter       NONE
Methods         PUT
*/

booky.put("/book/update/author/:isbn/:authorId",(req,res)=>{
    //update book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
        }
    });
    //update author database
    database.author.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            return author.books.push(req.params.isbn);
        }
    });
    return res.json({books:database.books,author:database.author});
});

/*
Route           /publication/update/book
Description     update/add new book to a publication for a book
Access          PUBLIC
Parameter       isbn
Methods         PUT
*/

booky.put("/publication/update/book/:isbn",(req,res)=>{
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
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/

booky.delete("/book/delete/:isbn",(req,res)=>{
    const updatedBookDatabase = database.books.filter((book)=>book.ISBN!==req.params.isbn);
    database.books=updatedBookDatabase;
    return res.json({books:database.books});
});

/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
booky.delete("/book/delete/author/:isbn/:authorId",(req,res)=>{
    //update the book database
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            const newAuthorList=books.authors.filter((author)=>author!==parseInt(req.params.authorId));
            book.authors=newAuthorList;
            return;
        }
    });
    database.authors.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            const newBooksList=author.books.filter((book)=>book!==req.params.isbn);
            author.books=newBooksList;
            return;
        }
    });
    return res.json({message:"author was deleted!!",book:database.books,author:database.authors});
});
/*
Route           /publication/delete/book
Description     delete a book from publication
Access          PUBLIC
Parameter       isbn,publication id
Methods         DELETE
*/
booky.delete("/publication/delete/book/:isbn/:pubId",(req,res)=>{
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
/*
Route           /author/book
Description     Get specific authors based on books
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
booky.get("/",async(req,res)=>{
    const getAllBooks=await BookModel.find();
    return res.json({books:getAllBooks});
});
booky.listen(3000,()=>console.log("Server is running!!"));

//HTTP client -> helper who helps you to make http request

//Mediator between us(JavaScript) and MongoDB
//**mongoose**


