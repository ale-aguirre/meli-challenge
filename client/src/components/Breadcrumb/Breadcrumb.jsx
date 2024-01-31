import React from 'react';
import styles from './Breadcrumb.module.scss';

const Breadcrumb = ({ categories }) => {
  // Verificar si hay categorías
  const hasCategories = categories && categories.length > 0;

  return (
    <div className={styles.root}>
      <ol className={styles.breadcrumb}>
        {hasCategories &&
          categories.map((category, index) => (
            <li className={styles.breadcrumbItem} key={index}>
              {index > 0 && <span className={styles.separator}> &gt; </span>}
              {category}
            </li>
          ))}
      </ol>
    </div>
  );
};

export default Breadcrumb;
