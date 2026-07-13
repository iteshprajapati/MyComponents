import React, { useState, useEffect, useRef } from 'react';
import { Search, X } from 'lucide-react';
import './SearchBar.scss';

export const SearchBar = ({
  suggestions = [],
  placeholder = 'Search...',
  onSearch,
  onSelect,
  className = '',
  disabled = false,
  ...props
}) => {
  const [query, setQuery] = useState('');
  const [filteredSuggestions, setFilteredSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    if (query && suggestions.length > 0) {
      const matched = suggestions.filter(item =>
        item.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredSuggestions(matched);
      setShowDropdown(true);
    } else {
      setFilteredSuggestions([]);
      setShowDropdown(false);
    }
  }, [query, suggestions]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (onSearch) onSearch(e.target.value);
  };

  const handleSuggestionClick = (item) => {
    setQuery(item);
    setShowDropdown(false);
    if (onSelect) onSelect(item);
    if (onSearch) onSearch(item);
  };

  const handleClear = () => {
    setQuery('');
    setShowDropdown(false);
    if (onSearch) onSearch('');
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      setShowDropdown(false);
      if (onSelect) onSelect(query);
    }
  };

  return (
    <div
      ref={containerRef}
      className={`search-bar-container ${disabled ? 'is-disabled' : ''} ${className}`}
      {...props}
    >
      <div className="search-input-field-wrapper">
        <Search className="search-icon" size={18} />
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled}
          className="search-input"
        />
        {query && (
          <button type="button" className="clear-search-btn" onClick={handleClear} disabled={disabled}>
            <X size={16} />
          </button>
        )}
      </div>
      {showDropdown && filteredSuggestions.length > 0 && (
        <ul className="search-suggestions-dropdown">
          {filteredSuggestions.map((item, index) => (
            <li
              key={index}
              onClick={() => handleSuggestionClick(item)}
              className="search-suggestion-item"
            >
              {item}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};
