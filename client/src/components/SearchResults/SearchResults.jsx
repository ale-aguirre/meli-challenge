import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './SearchResults.module.scss';
import Loader from '../Loader/Loader';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { formatPriceARS } from '../../helpers/helpers';

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
      console.log(`Fetching results for query: ${searchQuery}`);

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
            console.log(
              'Categorías recibidas en el componente:',
              data.categories,
            );
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
      <div className={styles.noSearch}>
        Realiza tu búsqueda de producto arriba
      </div>
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
    <div className={styles.search_results_container}>
      {categories && <Breadcrumb categories={categories} />}

      <div className={styles.product_list}>
        {results.map((result) => (
          <Link
            to={`/items/${result.id}`}
            key={result.id}
            className={styles.product}
          >
            <img
              src={result.thumbnail}
              alt={result.title}
              className={styles.product_image}
            />
            <div className={styles.product_details}>
              <span className={styles.product_price}>
                {formatPriceARS(result.price)}
              </span>
              <p className={styles.product_title}>{result.title}</p>
            </div>

            <div className={styles.product_location}>
              <span>{result.seller_address.state.name}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
