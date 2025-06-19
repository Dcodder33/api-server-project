const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Book = require('./models/Book');
const setupSwagger = require('./swagger');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/booksdb', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// Swagger UI setup
setupSwagger(app);

// GET /books - Retrieve all books
app.get('/books', async (req, res) => {
    const books = await Book.find();
    res.json(books);
});

// POST /books - Add a new book
app.post('/books', async (req, res) => {
    const { title, author, year } = req.body;
    const book = new Book({ title, author, year });
    await book.save();
    res.status(201).json(book);
});

// PUT /books/:id - Update a book
app.put('/books/:id', async (req, res) => {
    const { id } = req.params;
    const { title, author, year } = req.body;
    const book = await Book.findByIdAndUpdate(
        id,
        { title, author, year },
        { new: true }
    );
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json(book);
});

// DELETE /books/:id - Delete a book
app.delete('/books/:id', async (req, res) => {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);
    if (!book) return res.status(404).json({ error: 'Book not found' });
    res.json({ message: 'Book deleted' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

/*
Example curl commands to test the API:

Note for Windows PowerShell users:
Use 'curl.exe' instead of 'curl' to avoid conflicts with Invoke-WebRequest.
For example:
curl.exe -X GET http://localhost:3000/books

# 1. Get all books
curl -X GET http://localhost:3000/books

# 2. Add a new book
curl -X POST http://localhost:3000/books -H "Content-Type: application/json" -d "{\"title\":\"Book Title\",\"author\":\"Author Name\",\"year\":2024}"

# 3. Update a book (replace <id> with the actual book _id)
curl -X PUT http://localhost:3000/books/<id> -H "Content-Type: application/json" -d "{\"title\":\"Updated Title\",\"author\":\"Updated Author\",\"year\":2025}"

# 4. Delete a book (replace <id> with the actual book _id)
curl -X DELETE http://localhost:3000/books/<id>
*/
