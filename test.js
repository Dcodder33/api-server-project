// Simple test script for Book API using axios

const axios = require('axios');
const BASE_URL = 'http://localhost:3000/books';

async function runTests() {
    // 1. Add a new book
    const newBook = { title: 'Test Book', author: 'Test Author', year: 2024 };
    const addRes = await axios.post(BASE_URL, newBook);
    console.log('POST /books:', addRes.data);

    const bookId = addRes.data._id;

    // 2. Get all books
    const getRes = await axios.get(BASE_URL);
    console.log('GET /books:', getRes.data);

    // 3. Update the book
    const updatedBook = { title: 'Updated Book', author: 'Updated Author', year: 2025 };
    const updateRes = await axios.put(`${BASE_URL}/${bookId}`, updatedBook);
    console.log('PUT /books/:id:', updateRes.data);

    // 4. Delete the book
    const deleteRes = await axios.delete(`${BASE_URL}/${bookId}`);
    console.log('DELETE /books/:id:', deleteRes.data);
}

runTests().catch(err => {
    if (err.response) {
        console.error('Error:', err.response.data);
    } else {
        console.error('Error:', err.message);
    }
});
