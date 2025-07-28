import { useState, useEffect } from 'react';
import Book from '../components/Book';

const BooksContent = ({ books, removeBookByName, handleRateBook }) => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollButton(window.scrollY > 300);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const topBooks = [...books]
    .filter(book => book.ratingCount > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  const otherBooks = books.filter(book => !topBooks.includes(book));

  return (
    <div>
      {topBooks.length > 0 && (
        <>
          <h2 style={{ textAlign: 'center', marginRight: '30px' }}>המומלצים שלנו</h2>
          <div className="book-list">
            {topBooks.map((book, index) => (
              <Book
                key={`top-${book.name}-${index}`}
                {...book}
                onRemove={removeBookByName}
                onRate={handleRateBook}
              />
            ))}
          </div>
        </>
      )}

      <h2 style={{ textAlign: 'center', marginRight: '30px' }}>
        {topBooks.length > 0 ? 'כל שאר הספרים' : 'כל הספרים'}
      </h2>
      <div className="book-list">
        {otherBooks.map((book, index) => (
          <Book
            key={`other-${book.name}-${index}`}
            {...book}
            onRemove={removeBookByName}
            onRate={handleRateBook}
          />
        ))}
      </div>

      {/* כפתור גלילה רק אם עברו סף גלילה */}
      {showScrollButton && (
        <button className="scroll-to-top animate-drop" onClick={scrollToTop} title="חזור למעלה">
          ↑
        </button>
      )}
    </div>
  );
};

export default BooksContent;
