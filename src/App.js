import { useState } from 'react';
import axios from 'axios';
import BookSearch from './components/BookSearch';
import BookList from './components/BookList';
import Pagination from './components/Pagination';
import { Circles } from 'react-loader-spinner';
import './App.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);

  const fetchBooks = async (query, category, page = 1) => {
    setLoading(true);
    setError(null);
    try {
      const response = await axios.get('https://openlibrary.org/search.json', {
        params: {
          q: query,
          subject: category,
          page,
        },
      });
      const fetchedBooks = response.data.docs.map((doc) => ({
        id: doc.key,
        title: doc.title,
        authors: doc.author_name || ['Unknown'],
        coverUrl: doc.cover_i
          ? `https://covers.openlibrary.org/b/id/${doc.cover_i}-M.jpg`
          : 'https://via.placeholder.com/128x192?text=No+Image',
        url: `https://openlibrary.org${doc.key}`,
      }));
      setBooks(fetchedBooks);
      setTotalPages(Math.ceil(response.data.num_found / 100));
    } catch (err) {
      setError('Failed to fetch books. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <h1 className="title">📚 Book Finder APP</h1>
      <BookSearch onSearch={(query, category) => fetchBooks(query, category)} />
      {loading && (
        <div className="loading">
          <Circles height="50" width="50" color="brown" ariaLabel="circles-loading" />
        </div>
      )}
      {error && <div className="error">{error}</div>}
      <BookList books={books} />
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={(page) => {
          setCurrentPage(page);
          fetchBooks('', '', page);
        }}
      />
    </div>
  );
};

export default App;
