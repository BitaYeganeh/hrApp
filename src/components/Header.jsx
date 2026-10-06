import styles from './Header.module.css';
import { Link, NavLink } from 'react-router-dom';
import React, { useState } from 'react';
import { IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const links = [
  { to: '/', label: 'Employees', end: true },
  { to: '/add', label: 'Add employee' },
  { to: '/table', label: 'Table' },
  { to: '/about', label: 'About' },
];

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link to="/" className={styles.brand} onClick={() => setMenuOpen(false)}>
          <span className={styles.logo} aria-hidden="true">
            HR
          </span>
          HR Management System
        </Link>

        {/* Menu button, shown on small screens only */}
        <IconButton
          className={styles.hamburger}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          aria-controls="main-nav"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </IconButton>

        <nav
          id="main-nav"
          aria-label="Main"
          className={`${styles.nav} ${menuOpen ? styles.navOpen : ''}`}
        >
          <ul className={styles.navList}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    `${styles.navLink} ${isActive ? styles.active : ''}`
                  }
                  onClick={() => setMenuOpen(false)}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
