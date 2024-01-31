import React from 'react';
import { FaLinkedin, FaGithub } from 'react-icons/fa';
import { motion } from 'framer-motion';
import styles from './Footer.module.scss';

const Footer = () => {
  return (
    <motion.footer
      className={styles.footer}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
    </motion.footer>
  );
};

export default Footer;
