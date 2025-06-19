# Book API Server

## API Documentation

Interactive API docs are available at:  
[http://localhost:3000/api-docs](http://localhost:3000/api-docs)  
(Provided by Swagger UI. Start your server and visit this URL in your browser.)

---

## APIs and Their Functionality

- **GET /books**  
  Retrieve all books.

- **POST /books**  
  Add a new book.  
  Request body:  
  ```json
  {
    "title": "Book Title",
    "author": "Author Name",
    "year": 2024
  }
  ```
  Sample response:
  ```json
  {
    "_id": "60f7c0c2e1b1c8a1b8e4d123",
    "title": "Book Title",
    "author": "Author Name",
    "year": 2024
  }
  ```

- **PUT /books/:id**  
  Update a book by ID.  
  Request body:  
  ```json
  {
    "title": "Updated Title",
    "author": "Updated Author",
    "year": 2025
  }
  ```
  Sample response:
  ```json
  {
    "_id": "60f7c0c2e1b1c8a1b8e4d123",
    "title": "Updated Title",
    "author": "Updated Author",
    "year": 2025
  }
  ```

- **DELETE /books/:id**  
  Delete a book by ID.  
  Sample response:
  ```json
  { "message": "Book deleted" }
  ```

---

## Database

- **Type:** MongoDB
- **Integration:** The server uses [Mongoose](https://mongoosejs.com/) to define the Book schema and interact with the MongoDB database.
- **Connection:**  
  The server connects to a local MongoDB instance at:
  ```
  mongodb://localhost:27017/booksdb
  ```

---

## How to Run Your Server

1. **Install dependencies:**
   ```
   npm install
   ```
   If you have not already, also install Swagger dependencies:
   ```
   npm install swagger-ui-express swagger-jsdoc
   ```
2. **Start MongoDB** (ensure it is running locally).
3. **Run the server:**
   ```
   node server.js
   ```
   The server will start on `http://localhost:3000`.

---

## How to Interact with Your API

The easiest way to interact with your API is using the interactive Swagger UI:

1. Start your server.
2. Open your browser and go to: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
3. Use the Swagger UI to view documentation, try out endpoints, and see sample requests and responses.

---