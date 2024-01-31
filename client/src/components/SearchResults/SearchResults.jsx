import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import styles from './SearchResults.module.scss';
import Loader from '../Loader/Loader';
import Breadcrumb from '../Breadcrumb/Breadcrumb';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [categories, setCategories] = useState([]);
  const [location, setLocation] = useState('');
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
            setCategories(data.categories); // Establecer las categorías obtenidas del servidor
            console.log(
              'Categorías recibidas en el componente:',
              data.categories,
            );
            const filters =
              data.filters && Array.isArray(data.filters) ? data.filters : [];
            const availableFilters =
              data.available_filters && Array.isArray(data.available_filters)
                ? data.available_filters
                : [];

            // Buscar el filtro de categoría y ubicación
            const categoryFilter = filters.find((f) => f.id === 'category');
            const locationFilter = availableFilters.find(
              (f) => f.id === 'state',
            );

            if (categoryFilter && categoryFilter.values.length > 0) {
              const categoryNames = categoryFilter.values[0].path_from_root.map(
                (c) => c.name,
              );
              setCategories(categoryNames.join(' > '));
            } else {
              setCategories([]);
            }

            if (locationFilter && locationFilter.values.length > 0) {
              setLocation(locationFilter.values[0].name);
            } else {
              setLocation('');
            }
          } else {
            setResults([]);
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
    return <div>{error}</div>;
  }

  if (!results.length && !loading) {
    return <div>No se encontraron resultados para "{searchQuery}"</div>;
  }

  return (
    <div className={styles.search_results_container}>
      {categories && (
        <div className={styles.categories}>
          <Breadcrumb categories={categories} />
        </div>
      )}

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
              <span className={styles.product_price}>${result.price}</span>
              <p className={styles.product_title}>{result.title}</p>
            </div>

            <div className={styles.product_location}>
              <span>Ubicación: {location || 'No disponible'}</span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;
