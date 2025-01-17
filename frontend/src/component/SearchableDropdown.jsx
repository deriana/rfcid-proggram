import React, { useState } from 'react';

const SearchableDropdown = ({ options, value, onChange, placeholder }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleSearchChange = (e) => {
    const searchValue = e.target.value;
    setSearchTerm(searchValue);
    setIsDropdownVisible(searchValue.length > 0);  // Show dropdown when typing
  };

  const handleSelect = (option) => {
    setSearchTerm(option.name); // Update the input with the selected value
    onChange(option.name); // Call parent handler to update the selected teacher
    setIsDropdownVisible(false); // Close dropdown after selection
  };

  const filteredOptions = options.filter((option) =>
    option.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative">
      <input
        type="text"
        value={searchTerm}
        onChange={handleSearchChange}
        placeholder={placeholder}
        className="p-2 mb-2 rounded-md border border-gray-300 w-full"
      />
      {isDropdownVisible && filteredOptions.length > 0 && (
        <ul className="absolute left-0 w-full bg-white border border-gray-300 shadow-lg mt-1 z-10 max-h-60 overflow-y-auto">
          {filteredOptions.map((option) => (
            <li
              key={option.id}
              onClick={() => handleSelect(option)}
              className="p-2 cursor-pointer hover:bg-gray-200"
            >
              {option.name}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default SearchableDropdown;
