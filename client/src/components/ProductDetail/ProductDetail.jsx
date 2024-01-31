import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { formatPriceARS } from '../../helpers/helpers';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3003';
        const response = await fetch(`${apiUrl}/api/items/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setProduct(data.item);
      } catch (error) {
        console.error('Error fetching product details:', error);
        setError('No se pudo cargar la información del producto');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  useEffect(() => {
    console.log('Categorías del producto:', product?.categories);
  }, [product]);

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <ErrorBoundary message={error} />;
  }

  if (!product) {
    return <ErrorBoundary message='Producto no encontrado' />;
  }

  return (
    <div className={styles.container}>
      {product.categories && <Breadcrumb categories={product.categories} />}
      <div className={styles.product}>
        <div className={styles.product_firstSection}>
          <div className={styles.product_img}>
            <img src={product.picture} alt={product.title} />
          </div>
          <div className={styles.product_desc}>
            <h4>Descripción del producto:</h4>
            <p>{product.description}</p>
          </div>
        </div>
        <div className={styles.product_secondSection}>
          <h4>{product.title}</h4>
          <p>{formatPriceARS(product.price.amount)}</p>
          <button>Comprar</button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
