import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Search />
      </button>
      
      {isOpen && (
        <input
          type="text"
          placeholder="Search..."
          autoFocus
        />
      )}
    </div>
  );
};

export default SearchBar;