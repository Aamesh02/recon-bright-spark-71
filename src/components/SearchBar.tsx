
import React, { useState } from 'react';
import { Search } from 'lucide-react';

const SearchBar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 start-0 flex items-center pl-3 pointer-events-none">
        <Search className="w-4 h-4 text-gray-400" />
      </div>
      <input
        type="search"
        value={searchTerm}
        onChange={handleSearchChange}
        className="block w-full p-3 pl-10 text-sm bg-[#171622]/50 border border-gray-700/50 rounded-lg focus:outline-none focus:border-blue-500 text-white"
        placeholder="Search reconciliation tasks..."
      />
    </div>
  );
};

export default SearchBar;
