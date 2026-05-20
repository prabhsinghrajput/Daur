import React from 'react';
import Link from 'next/link';
import styles from './SubNavbar.module.css';

const SubNavbar: React.FC = () => {
  return (
    <nav className={styles.subNavbar}>
      <div className={styles.navLinks}>
        <Link href="?category=men" className={styles.navLink}>
          MEN
        </Link>
        <Link href="?category=women" className={styles.navLink}>
          WOMEN
        </Link>
      </div>
    </nav>
  );
};

export default SubNavbar;
