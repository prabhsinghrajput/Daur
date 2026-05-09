'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Runway from '../../components/collections/Runway';
import ProductSidebar from '../../components/collections/ProductSidebar';
import collectionsStyles from '../../components/collections/collections.module.css';
import { labsProducts } from '../../components/labs/labsProducts.data';

export default function LabsPage() {
  const [activeLook, setActiveLook] = React.useState(0);
  
  // Use the full set of lab products, doubled for the runway depth effect
  const totalProducts = [...labsProducts, ...labsProducts];


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
