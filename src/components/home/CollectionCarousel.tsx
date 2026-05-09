"use client";

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import styles from './CollectionCarousel.module.css';

interface CollectionItem {
  id: number;
  image: string;
  alt: string;
  accentColor?: string;
}

const COLLECTIONS: CollectionItem[] = [
  {
    id: 1,
    image: '/images/fashion/orange.png',
    alt: 'Orange Outfit',
    accentColor: '#FF6B35'
  },
  {
    id: 2,
    image: '/images/fashion/green.png',
    alt: 'Green Coat',
    accentColor: '#2D6A4F'
  },
  {
    id: 3,
    image: '/images/fashion/yellow.png',
    alt: 'Yellow Fashion',
    accentColor: '#F4D35E'
  },
  {
    id: 4,
    image: '/images/fashion/white.png',
    alt: 'White Puffer',
    accentColor: '#F5F5F5'
  },
  {
    id: 5,
    image: '/images/fashion/red.png',
    alt: 'Red Style',
    accentColor: '#E63946'
  },
  {
    id: 6,
    image: '/images/fashion/boy.png',
    alt: 'Boy in Suit',
    accentColor: '#4A5859'
  },
  {
    id: 7,
    image: '/images/fashion/teal.png',
    alt: 'Teal Suit',
    accentColor: '#457B9D'
  },
];

const COLLECTION_NAME = 'Casual Essence Collection';
const COLLECTION_TITLE = 'DAUR: The Collection';

export default function CollectionCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const activeCollection = COLLECTIONS[activeIndex];

  const handleNext = useCallback(() => {
    setDirection(1);
    setActiveIndex((prev) => (prev + 1) % COLLECTIONS.length);
  }, []);

  const handlePrev = useCallback(() => {
    setDirection(-1);
    setActiveIndex((prev) => (prev - 1 + COLLECTIONS.length) % COLLECTIONS.length);
  }, []);

  const handleThumbnailClick = (index: number) => {
    setDirection(index > activeIndex ? 1 : -1);
    setActiveIndex(index);
  };

  return (
    <section
      className={styles.container}
      style={{ backgroundColor: `${activeCollection.accentColor}12` }}
    >
      <div className={styles.content}>
        {/* Left Panel */}
        <div className={styles.leftPanel}>
          <div className={styles.label}>COLLECTION.</div>
          <h2 className={styles.title}>{COLLECTION_TITLE}</h2>
          
          <div className={styles.collectionInfo}>
            <h3 className={styles.collectionName}>{COLLECTION_NAME}</h3>
            <a href="#" className={styles.seeDetail}>See Detail</a>
          </div>
        </div>

        {/* Right Panel - Carousel */}
        <div className={styles.rightPanel}>
          {/* Main Featured Image */}
          <div className={styles.featuredImageWrapper}>
            <div
              className={styles.featuredImage}
              style={{
                backgroundColor: `${activeCollection.accentColor}20`,
                borderColor: activeCollection.accentColor
              }}
            >
              <Image
                src={activeCollection.image}
                alt={activeCollection.alt}
                fill
                className={styles.image}
                priority
              />
            </div>
          </div>

          {/* Thumbnail Slider */}
          <div className={styles.thumbnailContainer}>
            <button
              className={styles.navButton}
              onClick={handlePrev}
              aria-label="Previous"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>

            <div className={styles.thumbnailScroll}>
              {COLLECTIONS.map((item, index) => (
                <button
                  key={item.id}
                  className={`${styles.thumbnail} ${
                    index === activeIndex ? styles.active : ''
                  }`}
                  onClick={() => handleThumbnailClick(index)}
                  style={{
                    borderColor: index === activeIndex ? item.accentColor : 'transparent'
                  }}
                >
                  <Image
                    src={item.image}
                    alt={item.alt}
                    fill
                    className={styles.thumbnailImage}
                  />
                </button>
              ))}
            </div>

            <button
              className={styles.navButton}
              onClick={handleNext}
              aria-label="Next"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M9 18L15 12L9 6" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Dots */}
      <div className={styles.dotsContainer}>
        {COLLECTIONS.map((_, index) => (
          <button
            key={index}
            className={`${styles.dot} ${index === activeIndex ? styles.activeDot : ''}`}
            onClick={() => handleThumbnailClick(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
