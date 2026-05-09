'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Runway from '../../components/collections/Runway';
import ProductSidebar from '../../components/collections/ProductSidebar';
import collectionsStyles from '../../components/collections/collections.module.css';
import { activeProducts } from '../../components/active/active-catalogue/activeProducts.data';

export default function ActivePage() {
  const [activeLook, setActiveLook] = React.useState(0);
  
  // Expand to ensure deep runway depth
  const totalProducts = [...activeProducts, ...activeProducts].slice(0, 8);

  return (
    <main className={collectionsStyles.main}>
      <Navbar />

      <div className={collectionsStyles.contentWrapper}>
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
