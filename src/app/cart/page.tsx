"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useCart } from '../../context/CartContext';
import Navbar from '../../components/Navbar';
import Footer from '../../components/home/Footer';
import styles from './cart.module.css';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, cartCount } = useCart();

  const subtotal = cart.reduce((total, item) => {
    const priceNum = parseInt(item.price.replace(/[^0-9]/g, ''));
    return total + (priceNum * item.quantity);
  }, 0);

  return (
    <main className={styles.main}>
      <Navbar />
      
      <div className={styles.container}>
        <div className={styles.header}>
          <h1 className={styles.title}>Shopping Bag</h1>
          <span className={styles.count}>{cartCount} {cartCount === 1 ? 'Item' : 'Items'}</span>
        </div>

        {cart.length > 0 ? (
          <div className={styles.content}>
            <div className={styles.itemList}>
              <AnimatePresence mode="popLayout">
                {cart.map((item) => (
                  <motion.div 
                    key={`${item.id}-${item.size}`}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className={styles.cartItem}
                  >
                    <div className={styles.itemImage}>
                      <Image src={item.image} alt={item.name} fill className={styles.img} />
                    </div>
                    
                    <div className={styles.itemInfo}>
                      <div className={styles.itemHeader}>
                        <h3 className={styles.itemName}>{item.name}</h3>
                        <span className={styles.itemPrice}>{item.price}</span>
                      </div>
                      <p className={styles.itemSize}>Size: {item.size}</p>
                      
                      <div className={styles.itemActions}>
                        <div className={styles.quantitySelector}>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity - 1)}
                            className={styles.qtyBtn}
                          >-</button>
                          <span className={styles.qtyValue}>{item.quantity}</span>
                          <button 
                            onClick={() => updateQuantity(item.id, item.size, item.quantity + 1)}
                            className={styles.qtyBtn}
                          >+</button>
                        </div>
                        <button 
                          onClick={() => removeFromCart(item.id, item.size)}
                          className={styles.removeBtn}
                        >Remove</button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            <div className={styles.summary}>
              <div className={styles.summaryBox}>
                <h2 className={styles.summaryTitle}>Summary</h2>
                <div className={styles.summaryRow}>
                  <span>Subtotal</span>
                  <span>₹ {subtotal}</span>
                </div>
                <div className={styles.summaryRow}>
                  <span>Shipping</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className={styles.totalRow}>
                  <span>Total</span>
                  <span>₹ {subtotal}</span>
                </div>

                <button className={styles.checkoutBtn}>Checkout</button>
                <div className={styles.paymentIcons}>
                  <span>Visa</span>
                  <span>Mastercard</span>
                  <span>Apple Pay</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            className={styles.emptyState}
          >
            <p>Your bag is empty.</p>
            <Link href="/collections" className={styles.continueLink}>Continue Shopping</Link>
          </motion.div>
        )}

      </div>

      <Footer />
    </main>
  );
}
