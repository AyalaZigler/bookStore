import { useNavigate } from 'react-router-dom';
import AddBook from '../components/addBook';

const AddBookContent = ({ handleAddBook }) => {
  const navigate = useNavigate();

  // פונקציה מחודשת שמוסיפה ספר ועוברת לדף הספרים
  const handleAddBookAndNavigate = (newBook) => {
    handleAddBook(newBook);
    // אחרי הוספה מוצלחת, עבור לדף הספרים
    navigate('/books');
  };

  return (
    <div>
      {/* <h2 style={{ textAlign: 'center', color: 'green' }}>➕ הוספת ספר חדש</h2> */}
      <AddBook onAddBook={handleAddBookAndNavigate} />
    </div>
  );
};

export default AddBookContent;