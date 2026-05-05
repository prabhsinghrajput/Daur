"use client";

import { useEffect, useRef, useState } from 'react';
import styles from './home.module.css';
import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import FeaturedCollection from '../components/FeaturedCollection';
import Editorial from '../components/Editorial';
import About from '../components/About';
import FeaturedCollectionDark from '../components/sections/FeaturedCollection';
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

  const featuredProducts = [
    { id: 1, name: "Sculptural Coat", price: "€2,450", image: "https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 2, name: "Silk Draped Dress", price: "€1,850", image: "https://images.pexels.com/photos/2916814/pexels-photo-2916814.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 3, name: "Structured Blazer", price: "€1,200", image: "https://images.pexels.com/photos/1036623/pexels-photo-1036623.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 4, name: "V-Neck Cashmere", price: "€890", image: "https://images.pexels.com/photos/11007874/pexels-photo-11007874.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 5, name: "High-Waisted Trousers", price: "€750", image: "https://images.pexels.com/photos/1036627/pexels-photo-1036627.jpeg?auto=compress&cs=tinysrgb&w=800" },
    { id: 6, name: "Geometric Handbag", price: "€1,450", image: "https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=800" },
  ];

  return (
    <main className={styles.main}>
      <Navbar />
      <Hero trackRef={trackRef} scrollProgress={scrollProgress} />
      <ProductCatalogueSection />
      <FeaturedCollection products={featuredProducts} />
      <Editorial />
      <About />
      <FeaturedCollectionDark />
      <Footer />
    </main>
  );
}
