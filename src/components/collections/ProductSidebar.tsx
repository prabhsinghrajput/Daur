import Link from 'next/link';
import React from 'react';
import { motion } from 'motion/react';
import styles from './collections.module.css';
import { Product } from '../home/product-catalogue/products.data';

interface ProductSidebarProps {
  totalProducts: Product[];
  setActiveLook: (index: number) => void;
}

export default function ProductSidebar({ totalProducts, setActiveLook }: ProductSidebarProps) {
  const sidebarRef = React.useRef<HTMLDivElement>(null);

  // Initial scroll to middle of the tripled list for infinite scroll feel
  React.useEffect(() => {
    if (sidebarRef.current) {
      const cardHeight = sidebarRef.current.scrollHeight / 3;
      sidebarRef.current.scrollTop = cardHeight;
    }
  }, []);

  // Loop back smoothly when reaching boundaries
  const handleScroll = () => {
    if (!sidebarRef.current) return;
    const { scrollTop, scrollHeight } = sidebarRef.current;
    const setHeight = scrollHeight / 3;

    if (scrollTop < 10) {
      sidebarRef.current.scrollTop = setHeight + 10;
    } else if (scrollTop > setHeight * 2 - 10) {
      sidebarRef.current.scrollTop = setHeight - 10;
    }
  };

  return (
    <aside 
      className={styles.productSidebar} 
      ref={sidebarRef}
      onScroll={handleScroll}
    >
      {/* Triple the list to create infinite scroll illusion */}
      {[...totalProducts, ...totalProducts, ...totalProducts].map((product, index) => (
        <Link key={`${product.id}-${index}`} href={`/products/${product.id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
          <motion.div 
            className={styles.productCard}
            initial={{ opacity: 0.3, scale: 0.9, filter: 'blur(4px)', y: 20 }}
            whileInView={{ 
              opacity: 1, 
              scale: 1, 
              filter: 'blur(0px)', 
              y: 0 
            }}
            onViewportEnter={() => setActiveLook(index % totalProducts.length)}
            viewport={{ once: false, margin: "-40% 0px -40% 0px" }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            {/* Wishlist Icon */}
            <div className={styles.wishlistIcon}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
              </svg>
            </div>

            <div className={styles.productImageWrapper}>
              <img
                src={product.heroImage}
                alt={product.name}
                className={styles.productImage}
              />
            </div>

            <div className={styles.productInfo}>
              <h3 className={styles.productName}>{product.name}</h3>
              <span className={styles.productPrice}>{product.price}</span>
            </div>

            {/* Add to Bag Icon */}
            <div className={styles.addToBagIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 5V19M5 12H19" />
              </svg>
            </div>
          </motion.div>
        </Link>
      ))}
    </aside>
  );
}
