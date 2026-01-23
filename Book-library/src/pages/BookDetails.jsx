import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Modal from '../components/Modal';
import BookForm from '../components/BookForm';
import { useBooks } from '../context/BookContext';

const BookDetails = () => {
    const { id } = useParams();
    const { books, updateBook, addBook } = useBooks();
    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const book = books.find(b => b.id === id);

    const handleEditSubmit = (updatedData) => {
        updateBook(id, updatedData);
        setIsEditOpen(false);
    };

    const handleAddSubmit = (bookData) => {
        addBook(bookData);
        setIsAddOpen(false);
    };

    if (!book) {
        return (
            <div className="page-wrapper">
                <Navbar onAddClick={() => setIsAddOpen(true)} />
                <div className="container">
                    <h2>Book not found</h2>
                    <Link to="/" className="btn btn-primary">Back to Home</Link>
                </div>
            </div>
        );
    }

    return (
        <div className="page-wrapper">
            <Navbar onAddClick={() => setIsAddOpen(true)} />
            <div className="container main-content">
                <Link to="/" className="back-link">← Back to List</Link>

                <div className="details-card">
                    <div className="details-header">
                        {book.image && <img src={book.image} alt={book.title} className="book-cover" />}
                        <div>
                            <h1>{book.title}</h1>
                            <h3>By {book.author}</h3>
                        </div>
                    </div>

                    <div className="details-grid">
                        <div className="detail-item">
                            <strong>Publisher:</strong> <span>{book.publisher}</span>
                        </div>
                        <div className="detail-item">
                            <strong>Published Date:</strong> <span>{book.publishedDate}</span>
                        </div>
                        <div className="detail-item">
                            <strong>Pages:</strong> <span>{book.pageCount}</span>
                        </div>
                        {book.email && (
                            <div className="detail-item">
                                <strong>Owner Email:</strong> <span>{book.email}</span>
                            </div>
                        )}
                    </div>

                    <div className="description-section">
                        <h4>Overview</h4>
                        <p>{book.description?.replace(/(<([^>]+)>)/gi, "") || 'No description available.'}</p>
                    </div>

                    <div className="details-actions">
                        <button onClick={() => setIsEditOpen(true)} className="btn btn-primary">Edit Book</button>
                    </div>

                    <Modal
                        isOpen={isEditOpen}
                        onClose={() => setIsEditOpen(false)}
                        title="Edit Book"
                    >
                        <BookForm
                            initialData={book}
                            onSubmit={handleEditSubmit}
                            onCancel={() => setIsEditOpen(false)}
                        />
                    </Modal>

                    <Modal
                        isOpen={isAddOpen}
                        onClose={() => setIsAddOpen(false)}
                        title="Add New Book"
                    >
                        <BookForm
                            onSubmit={handleAddSubmit}
                            onCancel={() => setIsAddOpen(false)}
                        />
                    </Modal>
                </div>
            </div>
        </div>
    );
};

export default BookDetails;
