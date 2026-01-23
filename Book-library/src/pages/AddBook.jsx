import Navbar from '../components/Navbar';
import BookForm from '../components/BookForm';
import { useBooks } from '../context/BookContext';

const AddBook = () => {
    const { addBook } = useBooks();

    const handleAdd = (bookData) => {
        addBook(bookData);
    };

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="container main-content">
                <BookForm title="Add New Book" onSubmit={handleAdd} />
            </div>
        </div>
    );
};

export default AddBook;
