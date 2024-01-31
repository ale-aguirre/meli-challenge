import React from 'react';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({ categories }) => {
  // Verificar si hay categorías disponibles
  const hasCategories = categories && categories.length > 0;

  return (
    <ol className={styles.breadcrumb}>
      {hasCategories &&
        categories.map((category, index) => (
          <li className={styles.breadcrumbItem} key={index}>
            {category}
          </li>
        ))}
    </ol>
  );
};

export default Breadcrumb;
