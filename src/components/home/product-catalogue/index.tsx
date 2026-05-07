"use client";

import React, { useState, useRef, useCallback, useEffect } from 'react';
import styles from './catalogue.module.css';
import { products } from './products.data';
import ProductDetailPanel from './ProductDetailPanel';
import ProductSliderView from './ProductSliderView';
import NavigationControls from './NavigationControls';
import { useAutoAdvance } from './useAutoAdvance';
import { useSwipeDetect } from './useSwipeDetect';

const AUTO_ADVANCE_MS = 4500;

import type { Product } from './products.data';

interface ProductCatalogueSectionProps {
  onActiveChange?: (product: Product) => void;
}

export default function ProductCatalogueSection({ onActiveChange }: ProductCatalogueSectionProps) {
  const [[activeIndex, direction], setPage] = useState([0, 1]);
  const sectionRef = useRef<HTMLElement>(null);
  const totalSlides = products.length;

  const activeProduct = products[activeIndex];

  // notify parent when active product changes
  React.useEffect(() => {
    if (onActiveChange) onActiveChange(activeProduct);
  }, [activeProduct, onActiveChange]);

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
        product={activeProduct} 
        activeIndex={activeIndex} 
      />
      
      <div className={styles.rightPanel}>
        <ProductSliderView 
          products={products} 
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
