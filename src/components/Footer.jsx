import { Typography } from '@mui/material';
import styles from './Footer.module.css';
import React from 'react';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <Typography variant="body2" component="p">
        © 2025 WP25K.{' '}
        <Typography component="a" href="#privacy" className={styles.authorLink}>
          Privacy Policy
        </Typography>
      </Typography>

      <Typography variant="body2" component="p">
        Made by{' '}
        <Typography
          component="a"
          href="https://github.com/BitaYeganeh"
          target="_blank"
          rel="noopener noreferrer"
          className={styles.authorLink}
        >
          Bita Yeganeh
        </Typography>
      </Typography>
    </footer>
  );
};

export default Footer;
