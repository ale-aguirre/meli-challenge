import React from 'react';
import { FaSpinner } from 'react-icons/fa'; // Importa el icono del spinner
import styles from './Loader.module.scss';

const Loader = () => {
  return (
    <div className={styles.loaderOverlay}>
      <div className={styles.loaderContainer}>
        <FaSpinner className={styles.spinnerIcon} />
      </div>
    </div>
  );
};

export default Loader;
