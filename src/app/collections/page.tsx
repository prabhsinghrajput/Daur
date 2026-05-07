"use client";

import React from 'react';
import Navbar from '../../components/Navbar';
import Runway from '../../components/collections/Runway';
import ProductSidebar from '../../components/collections/ProductSidebar';
import styles from '../../components/collections/collections.module.css';
import { products } from '../../components/home/product-catalogue/products.data';

export default function CollectionsPage() {
  const [activeLook, setActiveLook] = React.useState(0);
  
  // Expand to 8 items to ensure deep runway depth (1 active + 1 exiting + 6 in queue)
  const totalProducts = [...products, ...products].slice(0, 8);

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.contentWrapper}>
        {/* LEFT PANEL: RUNWAY VIEW */}
        <Runway 
          totalProducts={totalProducts} 
          activeLook={activeLook} 
        />

        {/* RIGHT PANEL: PRODUCT SIDEBAR (INFINITE LOOP) */}
        <ProductSidebar 
          totalProducts={totalProducts} 
          setActiveLook={setActiveLook} 
        />
      </div>
    </main>
  );
}
