import { RefObject } from 'react';
import Image from 'next/image';
import styles from '../../app/home.module.css';
import type { Product } from './product-catalogue/products.data';
import Hero3D from './Hero3D';

interface HeroProps {
  trackRef: RefObject<HTMLDivElement | null>;
  scrollProgress: number;
  activeProduct?: Product | null;
  isLoading?: boolean;
}

export default function Hero({ trackRef, scrollProgress, activeProduct, isLoading = false }: HeroProps) {
  return (
    <section className={styles.heroTrack} ref={trackRef}>
      <div className={styles.heroSticky}>
        {/* Video Background */}
        <img
          src="/video/herovideo2.webp"
          alt="Daur Hero Background"
          className={styles.heroVideo}
          style={{ 
            objectFit: 'cover',
            width: '100%',
            height: '100%',
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 0
          }}
        />

        {/* 3D DAUR Model Logo */}
        <Hero3D scrollProgress={scrollProgress} isLoading={isLoading} />

      </div>
    </section>
  );
}

