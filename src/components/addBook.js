import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import categories from '../categories';
import './addBook.css';

function AddBook({ onAddBook }) {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [author, setAuthor] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [b_count, setBCount] = useState('');
  const [category, setCategory] = useState([]);

  const toggleCategory = (value) => {
    setCategory(prev =>
      prev.includes(value) ? prev.filter(c => c !== value) : [...prev, value]
    );
  };

  const send = () => {
    // בדיקה שהשדות החובה מלאים
    if (!name.trim()) {
      alert('חובה למלא שם ספר');
      return;
    }
    if (!price || price <= 0) {
      alert('חובה למלא מחיר תקין');
      return;
    }

    const newBook = {
      name: name.trim(),
      author: author.trim() === '' ? 'אנונימי' : author.trim(),
      price: Number(price),
      discount: Number(discount) || 0,
      b_count: Number(b_count) || 0,
      category,
      rating: 0,
      ratingCount: 0
    };

    onAddBook(newBook);
    
    // איפוס השדות
    setName('');
    setAuthor('');
    setPrice('');
    setDiscount('');
    setBCount('');
    setCategory([]);

    // הודעת הצלחה ומעבר לעמוד הספרים
    alert('הספר נוסף בהצלחה!');
    navigate('/books');
  };

  return (
    <div className='add-page'>
      <div className="add-container">
        <div className="add-header">
          <h1>הוספת ספר חדש</h1>
          <p>הוסף ספר חדש לאוסף שלנו</p>
        </div>
        
        <form className="add-form" onSubmit={(e) => e.preventDefault()}>
          <div className="form-group">
            <label>שם הספר *</label>
            <input 
              type="text"
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              placeholder="הכנס את שם הספר" 
              required
            />
          </div>
          
          <div className="form-group">
            <label>שם הסופר</label>
            <input 
              type="text"
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              placeholder="הכנס את שם הסופר" 
            />
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label>מחיר *</label>
              <input 
                type="number" 
                value={price} 
                onChange={(e) => setPrice(e.target.value)} 
                placeholder="₪" 
                min="0"
                step="0.01"
                required
              />
            </div>
            
            <div className="form-group">
              <label>הנחה %</label>
              <input 
                type="number" 
                value={discount} 
                onChange={(e) => setDiscount(e.target.value)} 
                placeholder="0-100" 
                min="0"
                max="100"
              />
            </div>
          </div>
          
          <div className="form-group">
            <label>כמות במלאי</label>
            <input 
              type="number" 
              value={b_count} 
              onChange={(e) => setBCount(e.target.value)} 
              placeholder="כמות זמינה" 
              min="0"
            />
          </div>

          <div className="form-group">
            <label>קטגוריות</label>
            <div className="categories-grid">
              {Object.entries(categories).map(([key, label]) => (
                <label key={key} className="category-item">
                  <input
                    type="checkbox"
                    value={key}
                    checked={category.includes(key)}
                    onChange={() => toggleCategory(key)}
                  />
                  <span className="category-label">{label}</span>
                </label>
              ))}
            </div>
          </div>

          <button type="button" className="submit-btn" onClick={send}>
            הוסף ספר
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddBook;