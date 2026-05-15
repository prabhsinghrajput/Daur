"use client";

import { useEffect, useRef, useState, useCallback } from 'react';
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
import Preloader from '../components/Preloader';

import BenefitsBar from '../components/home/BenefitsBar';
import CollectionHighlights from '../components/home/CollectionHighlights';
import Banner from '../components/home/Banner';

// Global variable to track if preloader has already been shown in this session
let preloaderShown = false;

export default function Home() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeProduct, setActiveProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(!preloaderShown);
  const [showNavbarLogo, setShowNavbarLogo] = useState(preloaderShown);

  const logoArrived = useRef(false);

  const handlePreloaderComplete = useCallback(() => {
    setIsLoading(false);
    preloaderShown = true;
    // Fallback: ensure logo is visible if onComplete fires
    setShowNavbarLogo(true);
  }, []);

  const handleLogoArrived = useCallback(() => {
    logoArrived.current = true;
    setShowNavbarLogo(true);
  }, []);

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
      {isLoading && (
        <Preloader onComplete={handlePreloaderComplete} onLogoArrived={handleLogoArrived} />
      )}

      <Navbar hideLogo={!showNavbarLogo} />
      <Hero trackRef={trackRef} scrollProgress={scrollProgress} activeProduct={activeProduct} isLoading={isLoading} />
      <BenefitsBar />
      <EditorialShowcase />
      <LatestDrops />
      <CollectionHighlights />
      <Banner imageSrc="/images/latest-drop/LD2.png" altText="Latest Drop Banner" height="70vh" />
      <WorkoutShowcase />
      <BrandDifference />
      <PinterestGrid />
      <ProductCatalogueSection onActiveChange={(p) => setActiveProduct(p)} />
      <Footer />
    </main>
  );
}

