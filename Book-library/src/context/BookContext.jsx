import { createContext, useContext } from 'react';

const BookContext = createContext();

export const useBooks = () => useContext(BookContext);

export const BookProvider = ({ children }) => {
    return (
        <BookContext.Provider value={{}}>
            {children}
        </BookContext.Provider>
    );
};
