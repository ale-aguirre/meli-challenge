import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './ProductDetail.module.scss';

const ProductDetail = () => {
  let { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    setLoading(true);
    const apiUrl = process.env.REACT_APP_API_URL || 'http://localhost:3003';
    fetch(`${apiUrl}/api/items/${id}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => {
        setLoading(false);
        setProduct(data.item);
      })
      .catch((error) => {
        setLoading(false);
        console.error('Error fetching product details:', error);
        setError('No se pudo cargar la información del producto');
      });
  }, [id]);

  if (loading) {
    return <div>Cargando detalles del producto...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Producto no encontrado</div>;
  }

  return (
    <div className={styles.container}>
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
          <p>${new Intl.NumberFormat().format(product.price.amount)}</p>
          <button>Comprar</button>
        </div>
      </div>
      {/* Añadir aquí más detalles del producto según sea necesario */}
    </div>
  );
};

export default ProductDetail;
