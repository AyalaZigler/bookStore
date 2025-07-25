import Book from '../components/Book';

const BooksContent = ({ books, removeBookByName, handleRateBook }) => {
  // ממליצים – שלושת הספרים עם הדירוג הכי גבוה
  const topBooks = [...books]
    .filter(book => book.ratingCount > 0)
    .sort((a, b) => b.rating - a.rating)
    .slice(0, 3);

  // שאר הספרים - כל הספרים שלא נמצאים ב-topBooks
  const otherBooks = books.filter(book => !topBooks.includes(book));

  return (
    <div>
      {/* המומלצים שלנו - רק אם יש ספרים עם דירוג */}
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

      {/* כל שאר הספרים */}
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
    </div>
  );
};

export default BooksContent;