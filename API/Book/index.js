//Initializing Express router
const Router=require("express").Router();

//Database Models
const BookModel = require("../../database/book");
/*
Route           /
Description     Get all books
Access          PUBLIC
Parameter       NONE
Methods         GET
*/
Router.get("/",async(req,res)=>{
    try{
    const getAllBooks=await BookModel.find();
    return res.json(getAllBooks);
    }
    catch(error){
        return res.json({error: error.message});
    }
});
/*
Route           /is
Description     Get specific books based on ISBN
Access          PUBLIC
Parameter       isbn
Methods         GET
*/
Router.get("/is/:isbn",async(req,res)=>{
    try{
    const getSpecificBook = await BookModel.findOne({ISBN: req.params.isbn});
    //const getSpecificBook = database.books.filter((book)=>book.ISBN === req.params.isbn);

    if(!getSpecificBook){
        return res.json({error:`No book found for the ISBN of ${req.params.isbn}`,});
    }
    return res.json({book : getSpecificBook});
}
catch(error){
    return res.json({error: error.message});
}
});

/*
Route           /c
Description     Get specific books based on Category
Access          PUBLIC
Parameter       category
Methods         GET
*/
Router.get("/c/:category",async(req,res)=>{
    try{
    const getSpecificBooks=await BookModel.findOne({category:req.params.category,});
    //const getSpecificBook = database.books.filter((book) => book.category.includes(req.params.category));

    if(!getSpecificBooks){
        return res.json({error:`No book found of category of ${req.params.category}`,});
    }
    return res.json({book : getSpecificBooks});
}
catch(error){
    return res.json({error: error.message});
}
});
/*
Route           /book/add
Description     Add new book
Access          PUBLIC
Parameter       NONE
Methods         POST
*/

Router.post("/add",async(req,res)=>{
    try{
        const {newBook} = req.body;//doubt
        await BookModel.create(newBook);
        return res.json({message:"book was added!!"});
    }catch(error){
        return res.json({error:error.message});
    }

});
/*
Route           /book/update/title
Description     Update book Title
Access          PUBLIC
Parameter       NONE
Methods         PUT
*/
Router.put("/update/title/:isbn",async(req,res)=>{
    try{
    const updatedBook =await BookModel.findOneAndUpdate({
        ISBN :req.params.isbn,
    },
    {
        title:req.body.bookTitle,
    },
    {
        new:true,
    });
    /*foreach
    database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            book.title=req.body.newBookTitle;
            return;
        }
    });*/
    return res.json({books:updatedBook});
}
catch(error){
    return res.json({error: error.message});
}
    //map (should not use)
});

/*
Route           /book/update/author
Description     Update/add new author for a book
Access          PUBLIC
Parameter       NONE
Methods         PUT
*/

Router.put("/update/author/:isbn",async(req,res)=>{
    try{
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN:req.params.isbn,
    },
    {
       $addToSet:{
        author:req.body.newAuthor,
       },
    },
    {
        new:true,
    });
    //updating author database
    const updatedAuthor =await AuthorModel.findOneAndUpdate({
        id :req.body.newAuthor,
    },
    {
        $addToSet:{
            books:req.params.isbn,
        },
    },
    {
        new:true,
    });
    //update book database
    /*database.books.forEach((book)=>{
        if(book.ISBN===req.params.isbn){
            return book.author.push(parseInt(req.params.authorId));
        }
    });
    //update author database
    database.author.forEach((author)=>{
        if(author.id===parseInt(req.params.authorId)){
            return author.books.push(req.params.isbn);
        }
    });*/
    return res.json({books:updatedBook,author:updatedAuthor,message:"New Author added!!"});
}
catch(error){
    return res.json({error: error.message});
}
});
/*
Route           /book/delete
Description     delete a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/

Router.delete("/delete/:isbn",async(req,res)=>{
    try{
    const updatedBookDatabase = await BookModel.findOneAndDelete({
        ISBN:req.params.isbn,
    });
    /*const updatedBookDatabase = database.books.filter((book)=>book.ISBN!==req.params.isbn);
    database.books=updatedBookDatabase;*/
    return res.json({books:updatedBookDatabase});
}catch(error){
    return res.json({error: error.message});
}
});
/*
Route           /book/delete/author
Description     delete a author from a book
Access          PUBLIC
Parameter       isbn
Methods         DELETE
*/
Router.delete("/delete/author/:isbn/:authorId",async(req,res)=>{
    try{
    const updatedBook = await BookModel.findOneAndUpdate({
        ISBN: req.params.isbn,
    },
    {
        $pull:{
            author:parseInt(req.params.authorId),
        },
    },
    {
        new:true,
    });
    //updating the author database
    const updatedAuthor = await AuthorModel.findOneAndUpdate({
        id:parseInt(req.params.authorId),
    },
    {
        $pull:{
            books:req.params.isbn,
        }
    },{
        new:true,
    })
    //update the book database
    /*database.books.forEach((book)=>{
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
    });*/
    return res.json({message:"author was deleted!!",book:updatedBook,author:updatedAuthor});
}catch(error){
    return res.json({error: error.message});
}
});

module.exports=Router;