import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import logo from '../../assets/logo.png';
import searchIcon from '../../assets/ic_Search.png';
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
    <motion.header
      className={styles.searchBarContainer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.searchBarContent}>
        <Link to='/' onClick={handleLogoClick}>
          <img src={logo} alt='Logo' className={styles.logo} />
        </Link>
        <form onSubmit={handleSubmit} className={styles.searchBox}>
          <div className={styles.searchBox_container}>
            <input
              type='text'
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder='Nunca dejes de buscar'
              className={styles.searchInput}
            />
            <button type='submit' className={styles.searchButton}>
              <img
                src={searchIcon}
                alt='Buscar'
                className={styles.searchIcon}
              />
            </button>
          </div>
        </form>
      </div>
    </motion.header>
  );
};

export default SearchBox;
