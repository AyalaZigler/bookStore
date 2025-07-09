import { Link, Outlet } from 'react-router-dom';

const BooksLayout = () => {
  return (
    <div>
      {/* הכותרת והניווט בפס אחד עליון מינימליסטי */}
      <header className="clean-header">
        <div className="header-container">
          <h1 className="brand-title">חנות ספרים</h1>
          <nav className="clean-nav">
            <Link to="/books" className="nav-item">
              כל הספרים
            </Link>
            <Link to="/books/add" className="nav-item">
              הוסף ספר חדש
            </Link>
            <Link to="/" className="nav-item">
              חזרה לדף הבית
            </Link>
          </nav>
        </div>
      </header>
      
      {/* כאן יופיע התוכן המשתנה לפי הניתוב */}
      <main className="main-content">
        <Outlet />
      </main>
    </div>
  );
};

export default BooksLayout;