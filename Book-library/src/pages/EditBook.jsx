import { useParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import BookForm from '../components/BookForm';
import { useBooks } from '../context/BookContext';

const EditBook = () => {
    const { id } = useParams();
    const { books, updateBook } = useBooks();
    const bookToEdit = books.find(b => b.id === id);

    const handleUpdate = (updatedData) => {
        updateBook(id, updatedData);
    };

    if (!bookToEdit) {
        return <div>Loading or Book not found...</div>;
    }

    return (
        <div className="page-wrapper">
            <Navbar />
            <div className="container main-content">
                <BookForm
                    title="Edit Book"
                    initialData={bookToEdit}
                    onSubmit={handleUpdate}
                />
            </div>
        </div>
    );
};

export default EditBook;
