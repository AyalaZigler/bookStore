const express = require('express');
const cors = require('cors');
const booksData = require('./src/booksData');
const app = express();
const port = process.env.PORT || 3001;
module.exports = app;
app.use(cors());
app.use(express.json());

// מסד זמני בזיכרון

// שליפת ספרים
app.get('/books', (req, res) => {
  res.send(booksData);
});

// // הוספת ספר
// app.post('/books', (req, res) => {
//   const book = req.body;
//   books.push(book);
//   res.status(201).json(book);
// });

// // מחיקת ספר לפי name
// app.delete('/books/:name', (req, res) => {
//   const name = decodeURIComponent(req.params.name);
//   books = books.filter(book => book.name !== name);
//   res.status(204).send();
// });

// // דירוג ספר
// app.put('/books/:name/rate', (req, res) => {
//   const name = decodeURIComponent(req.params.name);
//   const { rating } = req.body;

//   const book = books.find(b => b.name === name);
//   if (!book) return res.status(404).json({ error: 'Book not found' });

//   const oldCount = book.ratingCount || 0;
//   const oldRating = book.rating || 0;

//   const newCount = oldCount + 1;
//   const newRating = ((oldRating * oldCount) + rating) / newCount;

//   book.ratingCount = newCount;
//   book.rating = newRating;

//   res.json(book);
// });

app.listen(port, () => {
  console.log({booksData});
  console.log(`Example app listening on port ${port}`);
});