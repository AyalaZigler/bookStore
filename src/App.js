import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { useState, useEffect } from 'react';

// ייבוא הדפים החדשים
import HomePage from './routes/HomePage';
import BooksLayout from './routes/BooksLayout';
import BooksContent from './routes/BooksContent';
import AddBookContent from './routes/AddBookContent';

function App() {
  const [books, setBooks] = useState([]);

  const handleAddBook = (newBook) => {
    setBooks([...books, newBook]);
  };

  const removeBookByName = (nameToRemove) => {
    setBooks(books.filter(book => book.name !== nameToRemove));
  };

  const handleRateBook = (name, newRating) => {
    setBooks(prevBooks => {
      return prevBooks.map(book => {
        if (book.name === name) {
          const newCount = (book.ratingCount || 0) + 1;
          const updatedRating = ((book.rating || 0) * (newCount - 1) + newRating) / newCount;
          return {
            ...book,
            rating: updatedRating,
            ratingCount: newCount
          };
        }
        return book;
      });
    });
  };

  // טעינת נתונים מהשרת
  useEffect(() => {
    (async function() {
      try {
        const res = await fetch(`${process.env.REACT_APP_API_URL}`);
        const data = await res.json();
        console.log(data);
        setBooks(data);
      } catch (error) {
        console.log('שגיאה בטעינת הנתונים:', error);
      }
    })()
  }, []);

  return (
    <Router>
      <Routes>
        {/* כל הדפים עוברים דרך BooksLayout כדי לקבל את הפס העליון */}
        <Route path="/" element={<BooksLayout />}>
          {/* דף הבית */}
          <Route index element={<HomePage />} />
          
          {/* דף כל הספרים */}
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
          
          {/* דף הוספת ספר */}
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