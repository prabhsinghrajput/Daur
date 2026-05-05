"use client";

import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { animate } from 'animejs';
import styles from './catalogue.module.css';
import { Product } from './products.data';

interface ProductDetailPanelProps {
  product: Product;
  activeIndex: number;
}

const detailVariants = {
  hidden: { opacity: 0, x: -40, filter: "blur(8px)" },
  visible: {
    opacity: 1, x: 0, filter: "blur(0px)",
    transition: {
      duration: 0.9,
      ease: [0.16, 1, 0.3, 1],
      staggerChildren: 0.1
    }
  },
  exit: {
    opacity: 0, x: -30, filter: "blur(4px)",
    transition: { duration: 0.4, ease: [0.4, 0, 1, 1] }
  }
};

const childVariants = {
  hidden: { opacity: 0, x: -20, filter: "blur(8px)" },
  visible: { opacity: 1, x: 0, filter: "blur(0px)" },
  exit: { opacity: 0, x: -20, filter: "blur(4px)" }
};

export default function ProductDetailPanel({ product, activeIndex }: ProductDetailPanelProps) {
  const bagBtnRef = useRef<HTMLButtonElement>(null);
  const heartIconRef = useRef<HTMLSpanElement>(null);
  const [added, setAdded] = useState(false);
  const [wished, setWished] = useState(false);

  const handleAddBag = () => {
    if (bagBtnRef.current) {
      animate({
        targets: bagBtnRef.current,
        scale: [1, 0.96, 1],
        duration: 300,
        easing: 'easeOutBack'
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  const handleWishlist = () => {
    if (heartIconRef.current) {
      animate({
        targets: heartIconRef.current,
        scale: [1, 1.4, 1],
        duration: 400,
        easing: 'easeOutElastic(1, 0.5)'
      });
      setWished(!wished);
    }
  };

  return (
    <div className={styles.leftPanel}>
      <div className={styles.topRow}>
        <span className={styles.sectionLabel}>Trending Now</span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeIndex}
          variants={detailVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <motion.div variants={childVariants} style={{ marginBottom: '1.5rem' }}>
            <span className={styles.categoryBadge} style={{ backgroundColor: product.accentColor }}>
              {product.category}
            </span>
          </motion.div>

          <motion.div variants={childVariants} className={styles.productNameBlock}>
            <h2 className={styles.productName}>{product.name}</h2>
            {product.isNew && <span className={styles.newBadge}>NEW</span>}
          </motion.div>

          <motion.p variants={childVariants} className={styles.tagline}>
            {product.tagline}
          </motion.p>

          <motion.div 
            variants={childVariants} 
            className={styles.divider} 
            style={{ backgroundColor: product.accentColor }} 
          />

          <motion.p variants={childVariants} className={styles.description}>
            {product.description}
          </motion.p>

          <motion.div variants={childVariants} className={styles.materialColorRow}>
            <span>{product.material}</span>
            <span style={{ margin: '0 8px' }}>·</span>
            <span>{product.color}</span>
          </motion.div>

          <motion.div variants={childVariants} className={styles.price}>
            {product.price}
          </motion.div>

          <motion.div variants={childVariants} className={styles.ctaRow}>
            <button 
              ref={bagBtnRef} 
              className={styles.ctaBag} 
              onClick={handleAddBag}
            >
              {added ? 'ADDED ✓' : 'ADD TO BAG'}
            </button>
            <button 
              className={styles.ctaWishlist} 
              onClick={handleWishlist}
            >
              <span ref={heartIconRef} className={styles.heartIcon}>
                {wished ? '♥' : '♡'}
              </span>
            </button>
          </motion.div>
          
          <motion.div variants={childVariants} className={styles.bottomMeta}>
            CREATIVE DIRECTION / ZARA OKONKWO / JAN 2024
          </motion.div>
          
          <motion.div variants={childVariants} className={styles.socialLinks}>
            <a href="#behance">Behance</a>
            <a href="#instagram">Instagram</a>
            <a href="#linkedin">LinkedIn</a>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
