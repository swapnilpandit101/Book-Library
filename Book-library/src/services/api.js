import axios from 'axios';

const API_URL = 'https://www.googleapis.com/books/v1/volumes?q=react';

export const fetchBooksFromAPI = async () => {
    try {
        const response = await axios.get(API_URL);
        // Normalize data structure
        return response.data.items.map((item) => ({
            id: item.id,
            title: item.volumeInfo.title || 'Unknown Title',
            author: item.volumeInfo.authors ? item.volumeInfo.authors.join(', ') : 'Unknown Author',
            publisher: item.volumeInfo.publisher || 'Unknown Publisher',
            publishedDate: item.volumeInfo.publishedDate || 'Unknown Date',
            description: item.volumeInfo.description || 'No description available.',
            pageCount: item.volumeInfo.pageCount || 0,
            image: item.volumeInfo.imageLinks?.thumbnail || '',
        }));
    } catch (error) {
        console.error('Error fetching books:', error);
        return [];
    }
};
