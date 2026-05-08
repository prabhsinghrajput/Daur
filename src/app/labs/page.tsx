'use client';

import React from 'react';
import Navbar from '../../components/Navbar';
import Runway from '../../components/collections/Runway';
import ProductSidebar from '../../components/collections/ProductSidebar';
import collectionsStyles from '../../components/collections/collections.module.css';
import { labsProducts } from '../../components/labs/labsProducts.data';

export default function LabsPage() {
  const [activeLook, setActiveLook] = React.useState(0);
  
  // Expand to ensure deep runway depth
  const totalProducts = [...labsProducts, ...labsProducts].slice(0, 8);

  return (
    <main className={collectionsStyles.main}>
      <Navbar />

      <div className={collectionsStyles.contentWrapper}>
        {/* LEFT PANEL: RUNWAY VIEW */}
        <Runway 
          totalProducts={totalProducts as any} 
          activeLook={activeLook} 
        />

        {/* RIGHT PANEL: PRODUCT SIDEBAR (INFINITE LOOP) */}
        <ProductSidebar 
          totalProducts={totalProducts as any} 
          setActiveLook={setActiveLook} 
        />
      </div>
    </main>
  );
}
