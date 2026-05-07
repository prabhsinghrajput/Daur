"use client";

import React, { useState, use } from 'react';
import { motion } from 'motion/react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/home/Footer';
import styles from './product.module.css';
import { products } from '../../../components/home/product-catalogue/products.data';

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);
  const product = products.find(p => p.id === productId);
  
  const [selectedSize, setSelectedSize] = useState('M');
  const [show360, setShow360] = useState(false);

  if (!product) {
    return (
      <div className={styles.main}>
        <Navbar />
        <div style={{ padding: '100px', textAlign: 'center' }}>
          <h1>Product not found</h1>
        </div>
      </div>
    );
  }

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.productLayout}>
        {/* LEFT SIDE: GALLERY */}
        <div className={styles.gallery}>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className={styles.galleryImageWrapper}
          >
            {show360 ? (
              <video 
                src="/blue3d.webm" 
                autoPlay 
                loop 
                muted 
                playsInline 
                className={styles.galleryImage}
              />
            ) : (
              <img 
                src={product.heroImage} 
                alt={product.name} 
                className={styles.galleryImage} 
              />
            )}
            
            {/* 360 Toggle Button */}
            <button 
              className={`${styles.view360Btn} ${show360 ? styles.view360BtnActive : ''}`}
              onClick={() => setShow360(!show360)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                <path d="M12 6V12L16 14" />
                <path d="M7 12H17" />
              </svg>
              <span>{show360 ? 'EXIT 360' : '360° VIEW'}</span>
            </button>
          </motion.div>
          
          {/* Mock secondary images for the "Premium" feel */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className={styles.galleryImageWrapper}
          >
            <img 
              src={product.heroImage} 
              alt={product.name} 
              className={styles.galleryImage} 
              style={{ filter: 'grayscale(100%) brightness(0.9)' }}
            />
          </motion.div>
        </div>

        {/* RIGHT SIDE: INFO */}
        <aside className={styles.stickyInfo}>
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className={styles.breadcrumb}>
              Home / {product.category} / {product.name}
            </div>

            <div className={styles.productHeader}>
              <h1 className={styles.productName}>{product.name}</h1>
              <div className={styles.priceRow}>
                <span className={styles.price}>{product.price}</span>
                {product.isNew && <span style={{ fontSize: '10px', color: product.accentColor, fontWeight: 700 }}>NEW ARRIVAL</span>}
              </div>
              <p className={styles.tagline}>{product.tagline}</p>
            </div>

            <div className={styles.selectorSection}>
              <span className={styles.selectorLabel}>Select Size</span>
              <div className={styles.sizeGrid}>
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className={styles.actionButtons}>
              <button className={styles.addToCartBtn}>Add to Bag</button>
              <button className={styles.buyNowBtn}>Buy It Now</button>
            </div>

            <div className={styles.detailsSection}>
              <div className={styles.detailItem}>
                <span className={styles.detailTitle}>The Look</span>
                <p className={styles.detailValue}>{product.description}</p>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailTitle}>Composition & Details</span>
                <ul className={styles.detailValue} style={{ listStyle: 'none', padding: 0 }}>
                  <li>• {product.material}</li>
                  <li>• {product.gsm} GSM Heavyweight Fabric</li>
                  <li>• {product.fit}</li>
                  <li>• Color: {product.color}</li>
                </ul>
              </div>

              <div className={styles.detailItem}>
                <span className={styles.detailTitle}>Care Guide</span>
                <p className={styles.detailValue}>{product.washCare}</p>
              </div>
            </div>
          </motion.div>
        </aside>
      </div>

      <Footer />
    </main>
  );
}
