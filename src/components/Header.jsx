import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header className={styles.header}>
      <h1 className={styles.title}>HR Management System</h1>
      <nav className={styles.nav}>
        <ul className={styles.navList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Home
            </Link>
          </li>
          <li>
            <Link to="/add" className={styles.navLink}>
              Add Employee
            </Link>
          </li>
          <li>
            <Link to="/about" className={styles.navLink}>
              About
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
