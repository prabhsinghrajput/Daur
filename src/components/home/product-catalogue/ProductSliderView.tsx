"use client";

import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import styles from './catalogue.module.css';
import { Product } from './products.data';

interface ProductSliderViewProps {
  products: Product[];
  activeIndex: number;
  onThumbClick: (index: number) => void;
}

export default function ProductSliderView({ products, activeIndex, onThumbClick }: ProductSliderViewProps) {
  const totalSlides = products.length;

  const getAnimationState = (index: number) => {
    let offset = (index - activeIndex) % totalSlides;
    if (offset < 0) offset += totalSlides;
    if (offset === totalSlides - 1) offset = -1; // the previous slide exiting to the left

    if (offset === 0) {
      // Active slide (Large, left-aligned)
      return {
        left: '0%',
        width: '45%',
        height: '90%',
        top: '50%',
        y: '-50%',
        opacity: 1,
        zIndex: 10,
        filter: 'blur(0px)',
      };
    } else if (offset === -1) {
      // Exiting slide (Moving left out of view)
      return {
        left: '-50%',
        width: '45%',
        height: '90%',
        top: '50%',
        y: '-50%',
        opacity: 0,
        zIndex: 1,
        filter: 'blur(10px)',
      };
    } else {
      // Upcoming slides (Smaller, aligned to the right)
      const baseLeft = 50; // Starting at 50%
      const gap = 24; // Spacing percentage
      
      return {
        left: `${baseLeft + (offset - 1) * gap}%`,
        width: '20%',
        height: '40%',
        top: '50%',
        y: '-50%',
        opacity: offset > 3 ? 0 : 0.5, // Reduced opacity for upcoming slides to 50%
        zIndex: 10 - offset,
        filter: 'blur(0px)',
      };
    }
  };

  return (
    <div className={styles.sliderContainer}>
      <AnimatePresence initial={false}>
        {products.map((product, index) => {
          const state = getAnimationState(index);

          return (
            <motion.div
              key={product.id}
              className={styles.sliderImageWrapper}
              animate={state}
              transition={{
                duration: 1.1,
                ease: [0.16, 1, 0.3, 1], // Smooth luxury ease
              }}
              onClick={() => {
                if (index !== activeIndex) {
                  onThumbClick(index);
                }
              }}
              style={{
                // pointerEvents only active for non-exited/fully-hidden images
                pointerEvents: state.opacity === 0 ? 'none' : 'auto',
              }}
            >
              <img
                src={product.heroImage}
                alt={product.name}
                className={styles.sliderImage}
              />
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
