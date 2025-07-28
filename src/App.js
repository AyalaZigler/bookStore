import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';

import HomePage from './routes/HomePage';
import BooksLayout from './routes/BooksLayout';
import BooksContent from './routes/BooksContent';
import AddBookContent from './routes/AddBookContent';

function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    (async function() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}/books`);
        const data = await res.json();
        setBooks(data);
      } catch (error) {
        console.log('שגיאה בטעינת הנתונים:', error);
      }
    })()
  }, []);

  const handleAddBook = async (newBook) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/books`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newBook),
      });
      if (res.ok) {
        const savedBook = await res.json();
        setBooks([...books, savedBook]);
      }
    } catch (err) {
      console.log('שגיאה בהוספת ספר:', err);
    }
  };

  const removeBookByName = async (nameToRemove) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/books/${encodeURIComponent(nameToRemove)}`, {
        method: 'DELETE',
      });
      if (res.ok || res.status === 204) {
        setBooks(books.filter(book => book.name !== nameToRemove));
      }
    } catch (error) {
      console.log('שגיאה במחיקה:', error);
    }
  };

  const handleRateBook = async (name, newRating) => {
    try {
      const res = await fetch(`${process.env.REACT_APP_API_URL}/books/${encodeURIComponent(name)}/rate`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ rating: newRating }),
      });
      if (res.ok) {
        const updatedBook = await res.json();
        setBooks(prevBooks =>
          prevBooks.map(book => book.name === name ? updatedBook : book)
        );
      }
    } catch (error) {
      console.log('שגיאה בדירוג ספר:', error);
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<BooksLayout />}>
          <Route index element={<HomePage />} />
          <Route 
            path="books" 
            element={
              <BooksContent 
                books={books} 
                removeBookByName={removeBookByName} 
                handleRateBook={handleRateBook} 
              />
            } 
          />
          <Route 
            path="books/add" 
            element={<AddBookContent handleAddBook={handleAddBook} />} 
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
