require("dotenv").config();
//Framework
const express = require("express");
const mongoose = require("mongoose");
// database
// const database = require("./database/index");
// //Models
// const BookModel = require("./database/book");
// const AuthorModel = require("./database/author");
// const PublicationModel = require("./database/publication");
// Initialising Microservices routes
const Books = require("./API/Book");
const Authors = require("./API/Author");
const Publications = require("./API/Author");
//Initialisation of express
const booky = express();
//configuration
booky.use(express.json());
mongoose.connect(process.env.MONGO_URL,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>console.log("connection established"));
//Initialising Microservices
booky.use("/book",Books);
booky.use("/author",Authors);
booky.use("/publication",Publications);

booky.listen(3000,()=>console.log("Server is running!!"));

//HTTP client -> helper who helps you to make http request

//Mediator between us(JavaScript) and MongoDB
//**mongoose**


