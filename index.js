const express = require('express');
const app = express()
const port = 4000

//set up mongoose
const mongoose = require('mongoose');
const connectionString = 'mongodb://localhost:27017/bookapp';

app.use(express.json())

mongoose.connect(connectionString,{
    useNewUrlParser:true,
    useUnifiedTopology:true,
    useFindAndModify: false
},(err) =>{
    if (err) {
        console.log(err)
    }else {
        console.log('database connection succesful')
    }
})
// CREATE SCHEMA
const bookSchema = new mongoose.Schema({
    tittle: String,
    author: String,
    description: String,
    category: String,
    purchaseCount: Number,
    imageUrl: String,
    tags: Array,
    color: String
})
const Book = mongoose.model('book', bookSchema)
// Crude.create({
//     name:"aminatu papapa",
//     email: "yusufabdulsamad93@gmail.com",
//     country: "nigeria"
// },(err, Crude)=>{
//     if (err) {
//         console.log(err)
//     }else{
//         console.log(Crude)
//     }
// })
//POST request to /books to create new book
app.post('/books', function (req, res){
    // retrieve new book from details from req.body
    
    Book.create({
        tittle:req.body.tittle,
        author:req.body.author,
        description:req.body.description,
        category:req.body.category,
        purchaseCount:req.body.purchaseCount,
        imageUrl:req.body.imageUrl,
        tags:req.body.tags,
        color:req.body.color
    },(err, newBook)=>{
        if (err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: "new book created", newBook})
        }
    })
    // create a new book and save to db
    // send response to client
})
//GET request to /books to fetch all books
app.get('/books', (req, res)=>{
    //fetch all books
    Book.find({},(err,books)=>{
        if (err){
            return res.status(500).json({message: err})
        }else {
            return res.status(200).json({books})
        }
    })
    // send response to client
})
//GET request to /books/:id to fetch a single books
app.get('/books/:id',(req, res) => {
    Book.findById(req.params.id, (err, book) => {
        if (err){
          return res.status(500).json({message: err})
        }
        else if (!book){
            return res.status(404).json({message: "book not found"})
        }else{
            return res.status(200).json({ book })
        }
    })

})
//PUT request to /books /: id to update a single books to update
app.put('/books/:id',(req, res) =>{
    Book.findByIdAndUpdate(req.params.id, {
        tittle: req.body.tittle,
        category: req.body.category
},(err, book)=> {
    if (err) {
        return res.status(500).json({message: err})
    }else if (!book) {
        return res.status(404).json({message: "book not found"})
    }else {
        book.save((err, savedBook)=>{
            if (err) {
                return res.status(400).json({message: err})
            }else{
                return res.status(200).json({message: "book updated succesfully"})
            }
        })
    }
})
})
//DELETE request to/boooks/:id to delete
app.delete('/books/:id',(req, res) =>{
    Book.findByIdAndDelete(req.params.id, (err, book) =>{
        if (err) {
            return res.status(500).json({message: err})
        }
        else if (!book){
            return res.status(404).json({message:"book was not found"})
        }else{
            return res.status(200).json({message: "book succesfully deleted"})
        }
        })
    })

/*
model.find => fetch multiple documents 
model.findOne => fetch single documents
model.findById => fetch single documents by ID


model.findOneAndUpdate
model.findByIdAndUpdate

model.findOneAndDelete
model.findByIdAndDelete
model.findOneAndRemove
model.findByIdAndRemove

*/


app.listen(port, () => console.log(`app listening to port${port}`));
// Book.create({
//     tittle: "new book",
//     author: "king d",
//     description: "a very new book",
//     category: "finnace",
//     purchaseCount: 50,
//     imageUrl: "https://random.com",
//     tags: ["tag1","tage2","tag3"]
// }, (err, book)=>{
//     if (err){
//         console.log(err)
//     }else {
//         console.log(book)

//     }
// })

// Book.find({}, (err, books)=>{
//     if (err) {
//         console.log(err)
//     }else{
//         console.log({books})
//     }
// })


