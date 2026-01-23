import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { BookProvider } from './context/BookContext';
import './App.css';
import Home from './pages/Home';
import BookDetails from './pages/BookDetails';

function App() {
  return (
    <Router>
      <BookProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:id" element={<BookDetails />} />
        </Routes>
      </BookProvider>
    </Router>
  );
}

export default App;
