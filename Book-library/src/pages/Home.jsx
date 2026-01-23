import { useState } from 'react';
import Navbar from '../components/Navbar';
import BookTable from '../components/BookTable';
import Modal from '../components/Modal';
import BookForm from '../components/BookForm';
import { useBooks } from '../context/BookContext';

const Home = () => {
    const { loading, addBook, updateBook, deleteBook } = useBooks();

    // Modal State
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [editingBook, setEditingBook] = useState(null); // Objects means open, null means closed
    const [deletingBook, setDeletingBook] = useState(null);

    const handleAddSubmit = (bookData) => {
        addBook(bookData);
        setIsAddOpen(false);
    };

    const handleEditSubmit = (updatedData) => {
        updateBook(editingBook.id, updatedData);
        setEditingBook(null);
    };

    const handleDeleteConfirm = () => {
        if (deletingBook) {
            deleteBook(deletingBook.id);
            setDeletingBook(null);
        }
    };

    return (
        <div className="page-wrapper">
            <Navbar onAddClick={() => setIsAddOpen(true)} />
            <div className="container main-content">


                {loading ? (
                    <div className="loading-spinner">Loading books...</div>
                ) : (
                    <BookTable
                        onEdit={(book) => setEditingBook(book)}
                        onDelete={(book) => setDeletingBook(book)}
                    />
                )}

                {/* Add Modal */}
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

                {/* Edit Modal */}
                <Modal
                    isOpen={!!editingBook}
                    onClose={() => setEditingBook(null)}
                    title="Edit Book"
                >
                    <BookForm
                        initialData={editingBook}
                        onSubmit={handleEditSubmit}
                        onCancel={() => setEditingBook(null)}
                    />
                </Modal>

                {/* Delete Confirmation Modal */}
                <Modal
                    isOpen={!!deletingBook}
                    onClose={() => setDeletingBook(null)}
                    title="Confirm Delete"
                >
                    <div className="form-body">
                        <p>Are you sure you want to delete the book "<strong>{deletingBook?.title}</strong>"?</p>
                    </div>
                    <div className="modal-actions">
                        <button
                            onClick={() => setDeletingBook(null)}
                            className="btn btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleDeleteConfirm}
                            className="btn btn-danger"
                        >
                            Delete
                        </button>
                    </div>
                </Modal>
            </div>
        </div>
    );
};

export default Home;
