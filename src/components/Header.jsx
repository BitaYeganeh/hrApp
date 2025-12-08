import styles from './Header.module.css';
import { Link } from 'react-router-dom';
import React from 'react';
import { Button, Typography } from '@mui/material';

const Header = () => {
  return (
    <header className={styles.header}>
      <Typography variant="h4" className={styles.title}>
        HR Management System
      </Typography>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Button
              component={Link}
              to="/"
              variant="contained"
              className={styles.navLink}
            >
              Home
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/add"
              className={styles.navLink}
              variant="contained"
            >
              Add Employee
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/table"
              className={styles.navLink}
              variant="contained"
            >
              Employee Table
            </Button>
          </li>
          <li>
            <Button
              component={Link}
              to="/about"
              className={styles.navLink}
              variant="contained"
            >
              About
            </Button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
