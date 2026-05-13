"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter, usePathname } from 'next/navigation';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import styles from './Navbar.module.css';
import LoginModal from './auth/LoginModal';

import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

interface NavbarProps {
  hideLogo?: boolean;
}

export default function Navbar({ hideLogo = false }: NavbarProps) {
  const { cartCount } = useCart();
  const { wishlistCount } = useWishlist();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    if (latest > previous && latest > 150) {
      setIsHidden(true);
    } else {
      setIsHidden(false);
    }
  });

  const handleLogoClick = (e: React.MouseEvent) => {
    if (pathname === '/') {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleProfileClick = () => {
    if (isLoggedIn) {
      router.push('/account');
    } else {
      setIsLoginModalOpen(true);
    }
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <>
      <motion.nav
        className={styles.nav}
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" },
        }}
        initial={false}
        animate={isHidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
      >
        {/* Left Section - Desktop Links & Mobile Menu */}
        <div className={styles.navSection}>
          <div className={styles.mobileMenuBtn} onClick={toggleSidebar}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
          </div>

          <div className={styles.desktopLinks}>
            <Link href="/collections" className={styles.navLink}>Collections</Link>
            <Link href="/active" className={styles.navLink}>Active</Link>
            <Link href="/labs" className={styles.navLink}>Labs</Link>
            <Link href="/about" className={styles.navLink}>About</Link>
          </div>
        </div>

        {/* Center Section - Logo */}
        {!hideLogo && (
          <Link href="/" className={styles.navLogo} onClick={handleLogoClick}>
            <img
              src="/images/hero/logo.png"
              alt="DAUR"
              className={styles.logoImg}
            />
          </Link>
        )}

        {/* Right Section - Icons */}
        <div className={styles.navSection}>
          <div className={styles.rightControls}>
            <div className={`${styles.bagWrapper} ${styles.desktopOnly}`} onClick={handleProfileClick}>
              <svg className={styles.userIcon} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
            </div>

            <Link href="/wishlist" className={`${styles.bagWrapper} ${styles.desktopOnly}`}>
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

            <div className={styles.mobileSearchIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>

            <div className={`${styles.searchBox} ${styles.desktopOnly}`}>
              <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 10.5L13.5 13.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.5" />
              </svg>
              <input type="text" placeholder="Search" className={styles.searchInput} />
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Sidebar Menu */}
      <motion.div
        className={styles.sidebar}
        initial={{ x: "-100%" }}
        animate={{ x: isSidebarOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
      >
        <div className={styles.sidebarHeader}>
          <div className={styles.sidebarLogo}>
            <img src="/images/hero/logo.png" alt="DAUR" className={styles.logoImg} />
          </div>
          <div className={styles.closeBtn} onClick={toggleSidebar}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </div>
        </div>
        <div className={styles.sidebarContent}>
          <Link href="/collections" className={styles.sidebarLink} onClick={toggleSidebar}>Collections</Link>
          <Link href="/active" className={styles.sidebarLink} onClick={toggleSidebar}>Active</Link>
          <Link href="/labs" className={styles.sidebarLink} onClick={toggleSidebar}>Labs</Link>
          <Link href="/about" className={styles.sidebarLink} onClick={toggleSidebar}>About</Link>
          <div className={styles.sidebarDivider} />
          <Link href="/account" className={styles.sidebarLink} onClick={toggleSidebar}>Account</Link>
          <Link href="/wishlist" className={styles.sidebarLink} onClick={toggleSidebar}>Wishlist</Link>
        </div>
      </motion.div>

      {/* Overlay */}
      {isSidebarOpen && (
        <motion.div
          className={styles.sidebarOverlay}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={toggleSidebar}
        />
      )}

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        onSuccess={() => setIsLoggedIn(true)}
      />
    </>
  );
}
