//handles user input and triggers the search.
import { useState } from 'react';

const BookSearch = ({ onSearch }) => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    onSearch(query, category);
  };

  return (
    <form className='search-form'  onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Enter a Title, author or subject..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <select onChange={(e) => setCategory(e.target.value)} value={category}>
        <option value="">All Categories</option>
        <option value="fiction">Fiction</option>
        <option value="nonfiction">Non-Fiction</option>
        <option value="science">Science</option>
        <option value="history">History</option>
      </select>
      <button type="submit">Search</button>
    </form>
  );
};

export default BookSearch;
