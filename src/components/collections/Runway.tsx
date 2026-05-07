import Link from 'next/link';
import React from 'react';
import { motion } from 'motion/react';
import styles from './collections.module.css';
import { Product } from '../home/product-catalogue/products.data';

interface RunwayProps {
  totalProducts: Product[];
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
        <h1 className={styles.seasonTitle}>Spring Summer 2024</h1>
        <p className={styles.lookDescription}>
          A celebration of fluidity and structure. Our latest collection explores
          the intersection of organic textures and architectural silhouettes.
        </p>
        <div className={styles.lookNumber}>Look 0{activeLook + 1}</div>
        <Link href={`/products/${currentProduct.id}`} className={styles.shopTheLook}>
          Shop the look
        </Link>
      </div>
    </div>
  );
}
