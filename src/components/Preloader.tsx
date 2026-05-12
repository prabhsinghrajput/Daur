"use client";

import React, { useEffect, useState, memo } from 'react';
import { motion, AnimatePresence, animate, useMotionValue, useTransform } from 'framer-motion';
import styles from './Preloader.module.css';

const images = [
  '/images/active/active1.png',
  '/images/labs/lab1.png',
  '/images/products/Purple.png',
  '/images/active/active2.png',
  '/images/labs/lab2.png',
  '/images/active/active3.png',
  '/images/labs/lab4.png',
  '/images/active/active4.png',
  '/images/labs/lab5.png',
  '/images/hero/logo.png', // Final Logo
];

// Optimized Counter Component to prevent parent re-renders
const LoadingCounter = ({ value }: { value: any }) => {
  const [displayValue, setDisplayValue] = useState(0);
  
  useEffect(() => {
    return value.on("change", (latest: number) => {
      setDisplayValue(Math.floor(latest));
    });
  }, [value]);

  return <div className={styles.counter}>{displayValue}</div>;
};

const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
  const [index, setIndex] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, 100, {
      duration: 3.5,
      ease: [0.76, 0, 0.24, 1],
      onUpdate: (latest) => {
        // Only update image index when it actually changes (10 times total)
        const newIndex = Math.min(
          Math.floor((latest / 100) * images.length),
          images.length - 1
        );
        setIndex((prev) => (prev !== newIndex ? newIndex : prev));
      },
      onComplete: () => {
        setTimeout(() => {
          setIsFinished(true);
          setTimeout(onComplete, 1200);
        }, 1500); // More time to see the expanded DA UR logo
      }
    });

    return () => controls.stop();
  }, [onComplete, progress]);

  return (
    <motion.div 
      className={styles.overlay}
      initial={{ opacity: 1 }}
      animate={{ opacity: isFinished ? 0 : 1 }}
      transition={{ duration: 0.8, ease: "easeInOut" }}
    >
      <div className={styles.centerContainer}>
        {/* Background Text - Originating from center */}
        <div className={styles.bgTextContainer}>
          <motion.span 
            className={styles.bgLetter}
            initial={{ x: 0, opacity: 0 }}
            animate={{ 
              x: index === images.length - 1 ? '-25vw' : '0vw',
              opacity: index === images.length - 1 ? 0.8 : 0
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            DA
          </motion.span>
          <motion.span 
            className={styles.bgLetter}
            initial={{ x: 0, opacity: 0 }}
            animate={{ 
              x: index === images.length - 1 ? '25vw' : '0vw',
              opacity: index === images.length - 1 ? 0.8 : 0
            }}
            transition={{ duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          >
            UR
          </motion.span>
        </div>

        {/* Image Stack */}
        <div className={styles.imageStack}>
          <AnimatePresence>
            {images.slice(0, index + 1).map((src, i) => {
              const isLogo = i === images.length - 1;
              
              return (
                <motion.div
                  key={src}
                  className={styles.imageWrapper}
                  initial={{ opacity: 0, scale: 0.4, rotate: (i * 20) - 30, y: 30 }}
                  animate={{ 
                    opacity: 1, 
                    scale: isLogo ? 1 : 1, 
                    rotate: isLogo ? 0 : (i * 10) - 25,
                    y: 0 
                  }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.215, 0.61, 0.355, 1]
                  }}
                  style={{ zIndex: i }}
                >
                  {isLogo ? (
                    <motion.img 
                      layoutId="main-logo"
                      src={src} 
                      alt="Logo" 
                      className={styles.logo}
                    />
                  ) : (
                    <img src={src} alt="Product" className={styles.sequenceImage} />
                  )}
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <LoadingCounter value={progress} />
      </div>
    </motion.div>
  );
};

export default Preloader;
