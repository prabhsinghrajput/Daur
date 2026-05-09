import Link from 'next/link';
import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

import styles from './collections.module.css';
import { Product } from '../home/product-catalogue/products.data';
import { ActiveProduct } from '../active/active-catalogue/activeProducts.data';
import { LabsProduct } from '../labs/labsProducts.data';

interface RunwayProps {
  totalProducts: (Product | ActiveProduct | LabsProduct)[];
  activeLook: number;
}


export default function Runway({ totalProducts, activeLook }: RunwayProps) {
  const currentProduct = totalProducts[activeLook];

  return (
    <div className={styles.lookPanel}>
      <div className={styles.runwayContainer}>
        {totalProducts.map((look, index) => {
          let depth = index - activeLook;
          const total = totalProducts.length;
          if (depth < 0) depth += total; 
          
          const isActive = depth === 0;
          const isExiting = depth === total - 1;

          return (
            <motion.div
              key={`${look.id}-${index}`}
              className={styles.runwayLook}
              initial={false}
              animate={{
                x: isActive ? '15%' : (isExiting ? '60%' : `-${25 * depth - 5}%`),
                z: isActive ? 0 : (isExiting ? 150 : -depth * 150),
                y: isActive ? 0 : (isExiting ? 0 : depth * 35),
                scale: isActive ? 1 : (isExiting ? 1.1 : 1 - depth * 0.18),
                filter: isActive ? 'blur(0px)' : (isExiting ? 'blur(10px)' : `blur(${depth * 6}px)`),
                opacity: isActive ? 1 : (isExiting ? 0 : 1 - depth * 0.12),
                zIndex: 10 - depth,
              }}
              transition={{ 
                duration: 1.2, 
                ease: [0.16, 1, 0.3, 1] 
              }}
            >
              <img
                src={look.heroImage}
                alt={look.name}
                className={styles.lookImage}
              />
            </motion.div>
          );
        })}
      </div>

      <div className={styles.lookOverlay}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeLook}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={styles.overlayInner}
          >
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.8 }}
              className={styles.overlayHeader}
            >
              <span className={styles.collectionLabel}>2024 Collection</span>
              <div className={styles.lookNumber}>Look 0{activeLook + 1}</div>
            </motion.div>

            <div className={styles.mainInfo}>
              <motion.h1 
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.8 }}
                className={styles.seasonTitle}
              >
                {currentProduct.name}
              </motion.h1>
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: 60 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={styles.accentLine} 
              />
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.8 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className={styles.lookDescription}
              >
                {currentProduct.tagline || currentProduct.description}
              </motion.p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <Link href={`/products/${currentProduct.id}`} className={styles.shopTheLook}>
                <span>Explore Look</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M5 12h14m-7-7l7 7-7 7" />
                </svg>
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>


    </div>
  );
}
