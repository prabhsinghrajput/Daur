"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './home.module.css';
import Navbar from '../components/Navbar';
import Hero from '../components/home/Hero';
import LatestDrops from '../components/home/LatestDrops';
import EditorialShowcase from '../components/home/EditorialShowcase';
import WorkoutShowcase from '../components/home/WorkoutShowcase';
import PinterestGrid from '../components/home/PinterestGrid';
import BrandDifference from '../components/home/BrandDifference';

import Footer from '../components/home/Footer';
import ProductCatalogueSection from '../components/home/product-catalogue';
import type { Product } from '../components/home/product-catalogue/products.data';

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);

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
      <Hero trackRef={trackRef} scrollProgress={scrollProgress} activeProduct={activeProduct} />
      <LatestDrops />
      <EditorialShowcase />
      <WorkoutShowcase />
      <PinterestGrid />

      <BrandDifference />

      <ProductCatalogueSection onActiveChange={(p) => setActiveProduct(p)} />
      <Footer />
    </main>
  );
}

