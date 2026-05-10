"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import styles from './Navbar.module.css';
import LoginModal from './auth/LoginModal';

export default function Navbar() {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push('/account');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  return (
    <>
      <nav className={styles.nav}>
        <div className={styles.navSection}>
          <Link href="/collections" className={styles.navLink}>Collections</Link>
          <Link href="/active" className={styles.navLink}>Active</Link>
          <Link href="/labs" className={styles.navLink}>Labs</Link>
          <Link href="/about" className={styles.navLink}>About</Link>
        </div>

        <Link href="/" className={styles.navLogo}>DAUR</Link>

        <div className={styles.navSection}>
          <div className={styles.rightControls}>
            <div className={styles.bagWrapper} onClick={handleProfileClick}>
              <svg className={styles.userIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>
            <Link href="/wishlist" className={styles.bagWrapper}>
              <svg className={styles.heartIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
              {wishlistCount > 0 && <span className={styles.cartBadge} style={{ backgroundColor: '#ff4444' }}>{wishlistCount}</span>}
            </Link>
            <Link href="/cart" className={styles.bagWrapper}>
              <svg className={styles.bagIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M6 2L3 6V20C3 20.5304 3.21071 21.0391 3.58579 21.4142C3.96086 21.7893 4.46957 22 5 22H19C19.5304 22 20.0391 21.7893 20.4142 21.4142C20.7893 21.0391 21 20.5304 21 20V6L18 2H6Z" />
                <path d="M3 6H21" />
                <path d="M16 10C16 11.0609 15.5786 12.0783 14.8284 12.8284C14.0783 13.5786 13.0609 14 12 14C10.9391 14 9.92172 13.5786 9.17157 12.8284C8.42143 12.0783 8 11.0609 8 10" />
              </svg>
              {cartCount > 0 && <span className={styles.cartBadge}>{cartCount}</span>}
            </Link>

            <div className={styles.searchBox}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input type="text" placeholder="Search" className={styles.searchInput} />
            </div>
          </div>
        </div>
      </nav>

      <LoginModal 
        isOpen={isLoginModalOpen} 
        onClose={() => setIsLoginModalOpen(false)} 
        onSuccess={() => setIsLoggedIn(true)} 
      />
    </>
  );
}
