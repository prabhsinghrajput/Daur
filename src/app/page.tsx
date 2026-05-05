"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './home.module.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import Editorial from '../components/Editorial';
import About from '../components/About';
import Footer from '../components/Footer';
import ProductCatalogueSection from '../components/product-catalogue';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;

      const trackState = trackRef.current.getBoundingClientRect();
      const offsetTop = trackState.top;
      const scrollableDistance = trackState.height - window.innerHeight;

      let progress = 0;
      if (offsetTop <= 0) {
        progress = Math.min(1, Math.max(0, Math.abs(offsetTop) / scrollableDistance));
      }
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);


  return (
    <main className={styles.main}>
      <Navbar />
      <Hero trackRef={trackRef} scrollProgress={scrollProgress} />
      <ProductCatalogueSection />
      <Editorial />
      <About />
      <Footer />
    </main>
  );
}
