import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>By Alexis Aguirre - </p>
      <div className={styles.iconContainer}>
        <a
          href='https://www.linkedin.com/in/alexisaguirre-reactdev/'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaLinkedin className={styles.icon} />
        </a>
        <a
          href='https://github.com/ale-aguirre'
          target='_blank'
          rel='noopener noreferrer'
        >
          <FaGithub className={styles.icon} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
