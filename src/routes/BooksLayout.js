import { Link, Outlet } from 'react-router-dom';
import logo from '../logo.png';

const BooksLayout = () => {
  return (
    <div>
      {/* הכותרת והניווט בפס אחד עליון מינימליסטי */}
      <header className="clean-header">
        <div className="header-container">
          <div class="logo-title">
          <h1 className="brand-title">חנות ספרים</h1>
          {/* <img src={logo} alt="לוגו חנות ספרים" className="logo-img" /> */}
          </div>
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