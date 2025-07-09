import { Link } from 'react-router-dom';
import AddBook from '../components/addBook';

const AddBookPage = ({ handleAddBook }) => (
  <div>
    <h1 className="app-title">הוספת ספר חדש</h1>
    <AddBook onAddBook={handleAddBook} />
    <div style={{ textAlign: 'center', margin: '30px' }}>
      <Link to="/" style={{ marginRight: '20px', color: 'blue' }}>חזור לעמוד הבית</Link>
      <Link to="/books" style={{ color: 'orange' }}>צפה בכל הספרים</Link>
    </div>
  </div>
);

export default AddBookPage;