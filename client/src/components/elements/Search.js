import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../../static/styles/search.css';

function Search({ setBeers }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);


  useEffect(() => {
    const searchTimeout = setTimeout(() => {
      if (query.trim().length > 2) {
        performSearch(query.trim());
      } else {
        setResults([]);
        setShowResults(false);
      }
    }, 300);

    return () => clearTimeout(searchTimeout);
  }, [query]);

  async function performSearch(searchQuery) {
    setLoading(true);
    try {
      const res = await fetch('/api/beers');
      if (res.ok) {
        const beers = await res.json();
        
        const filteredBeers = beers.filter(beer => 
          beer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          beer.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          beer.type?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          beer.manufacturer?.name?.toLowerCase().includes(searchQuery.toLowerCase())
        );

        setBeers(filteredBeers);
        setShowResults(true);
      }
    } catch (error) {
      console.error('Search error:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  }

  async function getAllBeers() {
    try {
      const res = await fetch('/api/beers');
      if (res.ok) {
        const beers = await res.json();
        setBeers(beers);
      }
    } catch (error) {
      console.error('Error fetching all beers:', error);
    }
  }

  function handleInputChange(e) {
    setQuery(e.target.value);
    if (e.target.value.trim().length <= 1) {
      getAllBeers();
      setShowResults(false);
    }
  }

  async function clearSearch() {
    getAllBeers();
    setQuery('');
    setResults([]);
    setShowResults(false);
  }

  function handleResultClick() {
    setShowResults(false);
  }

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          placeholder="Pretraži piva..."
          value={query}
          onChange={handleInputChange}
          className="search-input"
          onFocus={() => query.length > 2 && setShowResults(true)}
        />
        {query && (
          <button type="button" className="search-clear" onClick={clearSearch}>
            ✕
          </button>
        )}
        {loading && <div className="search-loading">⟳</div>}
      </div>
    </div>
  );
}

export default Search;