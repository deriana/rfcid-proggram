import { useState } from "react";

const SearchableTable = ({ data, renderTable, filterFunction }) => {
  const [searchQuery, setSearchQuery] = useState("");

  // Fungsi untuk menangani perubahan input pencarian
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Memfilter data berdasarkan search query
  const filteredData = data.filter((item) => {
    return filterFunction(item, searchQuery);
  });

  return (
    <div>
      {/* Input pencarian */}
      <div className="mb-4">
        <label htmlFor="search" className="block text-sm font-medium text-gray-700">
          Cari Data:
        </label>
        <input
          id="search"
          type="text"
          value={searchQuery}
          onChange={handleSearchChange}
          className="mt-1 p-2 border rounded w-full"
          placeholder="Cari berdasarkan data"
        />
      </div>

      {/* Tampilkan tabel */}
      {renderTable(filteredData)}
    </div>
  );
};

export default SearchableTable;
