import React, { useState } from 'react';

const SearchBarForOrdersPage = ({ handleSearchTerm, placeholderValue }) => {
  const [searchTerm, setSearchTerm] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    handleSearchTerm(searchTerm.trim());
  };

  return (
    <div className="my-3">
      <form onSubmit={onSubmit}>
        <div className="input-group">
          <input
            type="text"
            value={searchTerm}
            placeholder={placeholderValue || "Search orders..."}
            className="form-control rounded-start shadow-sm"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="btn btn-outline-primary shadow-sm rounded-end"
          >
            <i className="fas fa-search"></i>
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchBarForOrdersPage;
