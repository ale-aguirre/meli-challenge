import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import searchIcon from '../assets/ic_Search.png';
import styles from './SearchBox.module.scss';

const SearchBox = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/items?search=${searchTerm}`);
  };

  const handleLogoClick = () => {
    setSearchTerm('');
  };

  return (
    <div className={styles.searchBarContainer}>
      <Link to='/' onClick={handleLogoClick}>
        <img src={logo} alt='Logo' className={styles.logo} />
      </Link>
      <form onSubmit={handleSubmit} className={styles.searchBox}>
        <input
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder='Nunca dejes de buscar'
          className={styles.searchInput}
        />
        <button type='submit' className={styles.searchButton}>
          <img src={searchIcon} alt='Buscar' className={styles.searchIcon} />
        </button>
      </form>
    </div>
  );
};

export default SearchBox;
