"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './ActiveCatalogue.module.css';
import { activeProducts } from './activeProducts.data';
import { Product } from '../../home/product-catalogue/products.data';
import ProductDetailPanel from '../../home/product-catalogue/ProductDetailPanel';
import ProductSliderView from '../../home/product-catalogue/ProductSliderView';
import NavigationControls from '../../home/product-catalogue/NavigationControls';
import { useAutoAdvance } from '../../home/product-catalogue/useAutoAdvance';
import { useSwipeDetect } from '../../home/product-catalogue/useSwipeDetect';

const AUTO_ADVANCE_MS = 4500;

export default function ActiveCatalogue() {
  const [[activeIndex, direction], setPage] = useState([0, 1]);
  const sectionRef = useRef<HTMLElement>(null);
  const totalSlides = activeProducts.length;

  const activeProduct = activeProducts[activeIndex];

  const paginate = useCallback((newDirection: number) => {
    setPage((prev) => {
      let nextIndex = prev[0] + newDirection;
      if (nextIndex < 0) nextIndex = totalSlides - 1;
      if (nextIndex >= totalSlides) nextIndex = 0;
      return [nextIndex, newDirection];
    });
  }, [totalSlides]);

  const { isPaused, pauseTimer, resumeTimer, resetTimer } = useAutoAdvance(
    AUTO_ADVANCE_MS,
    () => paginate(1)
  );

  const throttleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleNext = useCallback(() => {
    if (throttleTimer.current) return;
    paginate(1);
    resetTimer();
    throttleTimer.current = setTimeout(() => { throttleTimer.current = null; }, 800);
  }, [paginate, resetTimer]);

  const handlePrev = useCallback(() => {
    if (throttleTimer.current) return;
    paginate(-1);
    resetTimer();
    throttleTimer.current = setTimeout(() => { throttleTimer.current = null; }, 800);
  }, [paginate, resetTimer]);

  useSwipeDetect(sectionRef, handleNext, handlePrev);

  const handleThumbClick = (index: number) => {
    if (index === activeIndex) return;
    const newDirection = index > activeIndex ? 1 : -1;
    setPage([index, newDirection]);
    resetTimer();
  };

  return (
    <section 
      ref={sectionRef} 
      className={styles.container}
      style={{ backgroundColor: `${activeProduct.accentColor}08` }}
      onMouseEnter={pauseTimer}
      onMouseLeave={resumeTimer}
    >
      <ProductDetailPanel 
        product={activeProduct as unknown as Product} 
        activeIndex={activeIndex} 
      />
      
      <div className={styles.rightPanel}>
        <ProductSliderView 
          products={activeProducts as unknown as Product[]} 
          activeIndex={activeIndex} 
          onThumbClick={handleThumbClick} 
        />
      </div>

      <NavigationControls 
        onPrev={handlePrev}
        onNext={handleNext}
        activeIndex={activeIndex}
        totalSlides={totalSlides}
        autoAdvanceMs={AUTO_ADVANCE_MS}
        isPaused={isPaused}
      />
    </section>
  );
}
