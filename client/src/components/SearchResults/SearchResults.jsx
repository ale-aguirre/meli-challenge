import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './SearchResults.module.scss';
import Loader from '../Loader/Loader';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { formatPriceARS } from '../../helpers/helpers';
import { containerVariants, itemVariants } from '../../helpers/variants';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const searchQuery = searchParams.get('search');

  useEffect(() => {
    if (searchQuery) {
      setLoading(true);
      const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3003';
      fetch(`${apiUrl}/api/items?q=${searchQuery}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          return response.json();
        })
        .then((data) => {
          setLoading(false);
          console.log('Data fetched:', data);
          if (data && data.results) {
            setResults(data.results.slice(0, 4));
            setCategories(data.categories);
          } else {
            setResults([]);
            setCategories([]);
          }
        })
        .catch((error) => {
          setLoading(false);
          console.error('Error fetching data:', error);
          setError('Hubo un error al buscar los resultados');
        });
    }
  }, [searchQuery]);

  if (!searchQuery) {
    return (
      <motion.div
        className={styles.noSearch}
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        Realiza tu búsqueda de producto arriba
      </motion.div>
    );
  }

  if (loading) {
    return (
      <div className={styles.loaderContainer}>
        <Loader />
      </div>
    );
  }

  if (error) {
    return <ErrorBoundary message={error} />;
  }

  if (!results.length && !loading) {
    return (
      <ErrorBoundary
        message={`No se encontraron resultados para ${searchQuery}`}
      />
    );
  }

  return (
    <motion.div
      className={styles.search_results_container}
      variants={containerVariants}
      initial='hidden'
      animate='visible'
    >
      {categories && <Breadcrumb categories={categories} />}

      <motion.div
        className={styles.product_list}
        variants={containerVariants}
        initial='hidden'
        animate='visible'
      >
        {results.map((result) => (
          <Link
            to={`/items/${result.id}`}
            key={result.id}
            className={`${styles.product} product`}
          >
            <motion.img
              src={result.thumbnail}
              alt={result.title}
              className={styles.product_image}
              variants={itemVariants}
            />
            <motion.div
              className={styles.product_details}
              variants={itemVariants}
            >
              <span className={styles.product_price}>
                {formatPriceARS(result.price)}
              </span>
              <p className={styles.product_title}>{result.title}</p>
            </motion.div>

            <motion.div
              className={styles.product_location}
              variants={itemVariants}
            >
              <span>{result.seller_address.state.name}</span>
            </motion.div>
          </Link>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default SearchResults;
