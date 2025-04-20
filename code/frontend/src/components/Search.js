import React, { useState } from 'react';

const Search = ({ events, onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term);
  };

  return (
    <div style={styles.searchContainer}>
      <input
        type="text"
        placeholder="Поиск мероприятий..."
        value={searchTerm}
        onChange={handleSearch}
        style={styles.searchInput}
      />
      <button style={styles.searchButton}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          fill="currentColor"
          viewBox="0 0 16 16"
        >
          <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
        </svg>
      </button>
    </div>
  );
};

const styles = {
  searchContainer: {
    position: 'relative',
    marginBottom: '20px',
    maxWidth: '500px',
  },
  searchInput: {
    width: '100%',
    padding: '10px 40px 10px 15px',
    fontSize: '16px',
    border: '1px solid #ddd',
    borderRadius: '4px',
    boxSizing: 'border-box',
  },
  searchButton: {
    position: 'absolute',
    right: '10px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    color: '#555',
  },
};

export default Search;