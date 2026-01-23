import { createContext, useState, useEffect, useContext } from 'react';
import { fetchBooksFromAPI } from '../services/api';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
    const [books, setBooks] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadBooks = async () => {
            // 1. Check localStorage for persisted books (for our CRUD demo)
            const storedBooks = localStorage.getItem('myLibraryBooks');

            if (storedBooks) {
                setBooks(JSON.parse(storedBooks));
                setLoading(false);
            } else {
                // 2. If no local changes, fetch from API
                const apiBooks = await fetchBooksFromAPI();
                setBooks(apiBooks);
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    // Save to localStorage whenever books change to persist our "Mock Backend" changes
    useEffect(() => {
        if (books.length > 0) {
            localStorage.setItem('myLibraryBooks', JSON.stringify(books));
        }
    }, [books]);

    const addBook = (newBook) => {
        // Generate a random ID for new books since we don't have a backend
        const bookWithId = { ...newBook, id: crypto.randomUUID() };
        setBooks((prevBooks) => [bookWithId, ...prevBooks]);
    };

    const updateBook = (id, updatedBook) => {
        setBooks((prevBooks) =>
            prevBooks.map((book) => (book.id === id ? { ...book, ...updatedBook } : book))
        );
    };

    const deleteBook = (id) => {
        setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
    };

    return (
        <BookContext.Provider value={{ books, loading, addBook, updateBook, deleteBook }}>
            {children}
        </BookContext.Provider>
    );
};
