import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Typography } from '@mui/material';
import styles from './ErrorPage.module.css';

const ErrorPage = () => {
  return (
    <section className={styles.container}>
      <p className={styles.code}>404</p>
      <Typography variant="h4" component="h1" className={styles.title}>
        Page not found
      </Typography>
      <Typography className={styles.text}>
        The page you are looking for doesn't exist or has been moved.
      </Typography>
      <Button component={Link} to="/" variant="contained" size="large">
        Back to employees
      </Button>
    </section>
  );
};
export default ErrorPage;
