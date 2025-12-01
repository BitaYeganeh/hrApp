import styles from './Footer.module.css';
import React from 'react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <p>
        © 2025 WP25K. All rights reserved. <a href="#privacy">Privacy Policy</a>
      </p>
      <p>
        Made by{' '}
        <a
          href="https://github.com/BitaYeganeh"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Bita Yeganeh
        </a>
      </p>
    </footer>
  );
};

export default Footer;
