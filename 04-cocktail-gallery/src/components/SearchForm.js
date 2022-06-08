import React, { useRef, useEffect } from 'react';
import { useGlobalContext } from '../context';
import './css/searchForm.css';

const SearchForm = () => {
  const { setSearchLetter } = useGlobalContext();
  const searchValue = useRef('');

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleSearch = (e) => {
    setSearchLetter(e.target.value);
  };

  useEffect(() => {
    searchValue.current.focus();
  });

  return (
    <section className='section search'>
      <form className='search-form' onSubmit={handleSubmit}>
        <div className='form-control'>
          <label htmlFor='name'>Search your favorite cocktail</label>
          <input
            type='text'
            name='name'
            onChange={handleSearch}
            ref={searchValue}
          />
        </div>
      </form>
    </section>
  );
};

export default SearchForm;
