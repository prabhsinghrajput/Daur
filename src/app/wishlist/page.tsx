"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useWishlist } from '../../context/WishlistContext';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/home/Footer';
import styles from './wishlist.module.css';

export default function WishlistPage() {
  const { wishlist, toggleWishlist, wishlistCount } = useWishlist();
  const { addToCart } = useCart();

  const handleMoveToCart = (item: any) => {
    addToCart({
      ...item,
      size: 'M', // Default size
      quantity: 1
    });
    toggleWishlist(item); // Remove from wishlist after moving
  };

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Wishlist</h1>
          <span className={styles.count}>{wishlistCount} {wishlistCount === 1 ? 'Product' : 'Products'}</span>
        </div>

        <div className={styles.content}>
          <AnimatePresence mode="popLayout">
            {wishlist.length > 0 ? (
              <div className={styles.productGrid}>
                {wishlist.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className={styles.productCard}
                  >
                    <div className={styles.imageWrapper}>
                      <Image src={item.image} alt={item.name} fill className={styles.img} />
                      <button 
                        onClick={() => toggleWishlist(item)}
                        className={styles.removeBtn}
                        title="Remove from Wishlist"
                      >
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                        </svg>
                      </button>
                    </div>

                    <div className={styles.productInfo}>
                      <div className={styles.infoTop}>
                        <h3 className={styles.name}>{item.name}</h3>
                        <span className={styles.price}>{item.price}</span>
                      </div>
                      
                      <div className={styles.actions}>
                        <button 
                          onClick={() => handleMoveToCart(item)}
                          className={styles.addToBagBtn}
                        >
                          Add to Bag
                        </button>
                        <Link href={`/products/${item.id}`} className={styles.viewBtn}>
                          View Product
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <motion.div 
                initial={{ opacity: 0, y: 20 }} 
                animate={{ opacity: 1, y: 0 }} 
                className={styles.emptyState}
              >
                <div className={styles.emptyIcon}>
                  <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="#eee" strokeWidth="1">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <p>Your wishlist is currently empty.</p>
                <Link href="/collections" className={styles.exploreLink}>Explore Collections</Link>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <Footer />
    </main>
  );
}
