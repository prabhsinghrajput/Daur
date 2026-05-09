import { RefObject } from 'react';
import styles from '../../app/home.module.css';
import type { Product } from './product-catalogue/products.data';
import Hero3D from './Hero3D';

interface HeroProps {
  trackRef: RefObject<HTMLDivElement | null>;
  scrollProgress: number;
  activeProduct?: Product | null;
}

export default function Hero({ trackRef, scrollProgress, activeProduct }: HeroProps) {
  return (
    <section className={styles.heroTrack} ref={trackRef}>
      <div className={styles.heroSticky}>
        {/* Video Background */}
        <video
          className={styles.heroVideo}
          autoPlay
          loop
          muted
          playsInline
        >
          <source src="/video/Flow_202604301940.mp4" type="video/mp4" />

        </video>

        {/* 3D DAUR Model Logo */}
        <Hero3D scrollProgress={scrollProgress} />

      </div>
    </section>
  );
}

