import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './ProductDetail.module.scss';
import Breadcrumb from '../Breadcrumb/Breadcrumb';
import Loader from '../Loader/Loader';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import { formatPriceARS } from '../../helpers/helpers';
import { fadeInUpVariant, scaleInVariant } from '../../helpers/variants';

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
        console.log('data', data)
        console.log('response', response)
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

  if (!product) {
    return <ErrorBoundary message='Producto no encontrado' />;
  }

  return (
    <div className={styles.container}>
      <Breadcrumb categories={product.categories} />
      <div className={styles.product}>
        <div className={styles.product_firstSection}>
          <motion.div
            className={styles.product_img}
            variants={scaleInVariant}
            initial='initial'
            animate='animate'
          >
            <img src={product.picture} alt={product.title} />
          </motion.div>
          <motion.div
            className={styles.product_desc}
            variants={fadeInUpVariant}
            initial='initial'
            animate='animate'
          >
            <span>Descripción del producto:</span>
            <p>{product.description}</p>
          </motion.div>
        </div>
        <div className={styles.product_secondSection}>
          <motion.div
            className={styles.product_subtitle}
            variants={fadeInUpVariant}
            initial='initial'
            animate='animate'
            custom={0.3}
          >
            <span>{product.condition}</span>
          </motion.div>
          <motion.h2
            variants={fadeInUpVariant}
            initial='initial'
            animate='animate'
            custom={0.6}
          >
            {product.title}
          </motion.h2>
          <motion.span
            variants={scaleInVariant}
            initial='initial'
            animate='animate'
            custom={0.9}
          >
            {formatPriceARS(product.price.amount)}
          </motion.span>
          <motion.button
            className={styles.product_button}
            variants={fadeInUpVariant}
            initial='initial'
            animate='animate'
            custom={1.2}
            whileTap={{ scale: 0.95 }}
          >
            Comprar
          </motion.button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
