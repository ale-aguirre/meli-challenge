import React from 'react';
import styles from './ErrorBoundary.module.scss';

const ErrorBoundary = ({ message }) => {
  return (
    <div className={styles.errorBoundary}>
      <p>{message}</p>
    </div>
  );
};

export default ErrorBoundary;
