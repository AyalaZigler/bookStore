import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import logo from '../logo.png';

const BooksLayout = () => {
  const location = useLocation();
  
  return (
    <div>
      {/* הכותרת והניווט בפס אחד עליון מינימליסטי */}
      <header className="clean-header">
        <div className="header-container">
          <div className="logo-title">
            <Link to="/" className="logo-link">
              <h1 className="brand-title">חנות ספרים</h1>
              {/* <img src={logo} alt="לוגו חנות ספרים" className="logo-img" /> */}
            </Link>
          </div>
          <nav className="clean-nav">
            <NavLink 
              to="/books" 
              className={`nav-item ${location.pathname === '/books' ? 'active' : ''}`}
              end
            >
              כל הספרים
            </NavLink>
            <NavLink 
              to="/books/add" 
              className={`nav-item ${location.pathname === '/books/add' ? 'active' : ''}`}
            >
              הוסף ספר חדש
            </NavLink>
            <NavLink 
              to="/" 
              className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}
              end
            >
              דף הבית
            </NavLink>
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