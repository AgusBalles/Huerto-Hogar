import React, { useState } from 'react';
import DropdownMenu from './DropdownMenu';

const SearchBar = ({ onSearch, onCategoryChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchValue(value);
    onSearch(value);
  };

  const categories = [
    { value: '', label: 'Todas las categorías' },
    { value: 'frutas', label: 'Frutas Frescas' },
    { value: 'verduras', label: 'Verduras Orgánicas' },
    { value: 'organicos', label: 'Productos Orgánicos' },
    { value: 'lacteos', label: 'Productos Lácteos' }
  ];

  return (
    <div className={`search-dropdown ${isOpen ? 'active' : ''}`}>
      <div className="search-container">
        <input 
          type="text" 
          placeholder="Buscar productos..." 
          value={searchValue}
          onChange={handleSearchChange}
          onFocus={() => setIsOpen(true)}
        />
        <DropdownMenu 
          options={categories}
          onChange={onCategoryChange}
        />
      </div>
    </div>
  );
};

export default SearchBar;