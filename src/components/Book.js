import './Book.css';
import { useState } from 'react';
import categories from '../categories';
import logo from '../logo.png'; // ייבוא הלוגו של החנות ספרים

function Book(props) {
  const {name, price, discount, author, category, b_count, rating, onRemove, onRate} = props;

  const [liked, setLiked] = useState(false);
  const [count, setCount] = useState(b_count);
  const [localRating, setLocalRating] = useState(rating || 1);
  const [hoveredRating, setHoveredRating] = useState(null);
  const [showRatingStars, setShowRatingStars] = useState(false);

  const hasDiscount = discount > 0;
  const finalPrice = hasDiscount ? price * (1 - discount / 100) : price;

  const buyClick = () => {
    console.log(`הוספת את "${name}" לסל`);
  };

  const doLike = () => {
    setLiked(prev => !prev);
  };

  const addCount = () => {
    setCount(prevCount => prevCount + 1);
  };

  const deleteBook = () => {
    if (window.confirm("האם למחוק את הספר?")) {
      onRemove(name);
    }
  };

  const toggleRatingStars = () => {
    setShowRatingStars(prev => !prev);
  };

  const handleRating = (star) => {
    setLocalRating(star);
    onRate(name, star);
    setShowRatingStars(false); // סגירת הריבוע אחרי הדירוג
  };

  let containerClass = 'book-container';
  if (b_count === 0) containerClass += ' book-out-of-stock';
  else if (hasDiscount) containerClass += ' book-discount';

  return (
    <div className={containerClass}>
      {hasDiscount && (
        <div className="sale-tag">מבצע</div>
      )}
      
      <div className="logo-title-book">
      <img src={logo} alt="לוגו חנות ספרים" className="logo-img-book" />
      <h2>{name}</h2>
      </div>
      
      <div className="book-info">
        <p><strong>סופר:</strong> {author}</p>
        
        <div className="price-section">
          {hasDiscount ? (
            <>
              <div className="discounted-price">₪{finalPrice.toFixed(2)}</div>
              <div className="old-price">₪{price}</div>
            </>
          ) : (
            <div className="original-price">₪{price}</div>
          )}
        </div>
      </div>

      {category && category.length > 0 && (
        <div className="categories-section">
          <p><strong>קטגוריות:</strong></p>
          <ul className="category-list">
            {category.map((key, idx) => (
              <li key={idx}>{categories[key]}</li>
            ))}
          </ul>
        </div>
      )}

      {b_count > 0 ? (
        <>
          <div className="stock-info">
            <p><strong>במלאי:</strong> {count} עותקים</p>
          </div>

          <div className="rating-display">
            <p><strong>דירוג ממוצע:</strong> {rating?.toFixed(1)}</p>
          </div>

          <div className="rating-section">
            <button 
              className="rating-button" 
              onClick={toggleRatingStars}
            >
              לדירוג
            </button>
            
            <div className={`stars-container ${showRatingStars ? 'active' : ''}`}>
              <p>בחר דירוג:</p>
              <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span
                    key={star}
                    className={`star ${star <= (hoveredRating || localRating) ? 'filled' : ''}`}
                    onClick={() => handleRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(null)}
                  >
                    ★
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="button-row">
            <button className="like-button" onClick={doLike}>
              {liked ? "❤️" : "🤍"}
            </button>
            <button className="buy-button" onClick={buyClick}>
              הוספה לסל
            </button>
          </div>
          
          <div className="secondary-buttons">
            <button className="addCount-button" onClick={addCount}>
              הוספה למלאי
            </button>
            <button className="delet-button" onClick={deleteBook}>
              מחיקת ספר
            </button>
          </div>
        </>
      ) : (
        <div className="out-of-stock-message">
          <p>הספר אזל מהמלאי</p>
        </div>
      )}
    </div>
  );
}

export default Book;