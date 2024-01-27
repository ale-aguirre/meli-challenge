import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './SearchBox.module.scss'; 

const SearchBox = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        navigate(`/items?search=${searchTerm}`);
    };

    return (
        <form onSubmit={handleSubmit} className={styles.searchBox}>
            <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Buscar productos, marcas y más..."
                className={styles.searchInput}
            />
            <button type="submit" className={styles.searchButton}>Buscar</button>
        </form>
    );
};

export default SearchBox;
