import { Link } from 'react-router-dom';
import { useBooks } from '../context/BookContext';
import { FaEye, FaEdit, FaTrashAlt } from 'react-icons/fa';

const BookTable = ({ onEdit, onDelete }) => {
    const { books } = useBooks();

    if (!books || books.length === 0) {
        return <div className="empty-state">No books found. Add one to get started!</div>;
    }

    return (
        <div className="table-container">
            <table className="book-table">
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Publisher</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {books.map((book) => (
                        <tr key={book.id}>
                            <td data-label="Title" className="font-bold">{book.title}</td>
                            <td data-label="Author">{book.author}</td>
                            <td data-label="Publisher">{book.publisher}</td>
                            <td data-label="Actions" className="actions-cell">
                                <div className="action-buttons">
                                    <Link to={`/book/${book.id}`} className="btn-icon view" title="View"><FaEye /></Link>
                                    {onEdit ? (
                                        <button
                                            onClick={() => onEdit(book)}
                                            className="btn-icon edit"
                                            title="Edit"
                                        >
                                            <FaEdit />
                                        </button>
                                    ) : (
                                        <Link to={`/edit/${book.id}`} className="btn-icon edit" title="Edit"><FaEdit /></Link>
                                    )}
                                    <button
                                        onClick={() => onDelete(book)}
                                        className="btn-icon delete"
                                        title="Delete"
                                    >
                                        <FaTrashAlt />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookTable;
