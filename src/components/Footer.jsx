import styles from './Footer.module.css';
import React from 'react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        Made by{' '}
        <a
          href="https://github.com/BitaYeganeh"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Bita Yeganeh
        </a>{' '}
        ·{' '}
        <a
          href="https://github.com/BitaYeganeh/hrApp"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Source code
        </a>
      </p>
    </footer>
  );
};

export default Footer;
