import React, { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import styles from './LatestDrops.module.css';
import { motion, AnimatePresence, Variants } from 'framer-motion';

const SLIDES = [
  {
    id: 1,
    image: '/images/latest-drop/paris_fashion_week.png',
    title: 'Paris Fashion Week',
    subtitle: 'Straight From',
    sideTitle: 'Himalayan Art',
    sideSubtitle: 'Expressed Through Intricate',
  },
  {
    id: 2,
    image: '/images/latest-drop/fashion_banner_2.png',
    title: 'Luxury Collection',
    subtitle: 'New Season',
    sideTitle: 'Minimalist Elegance',
    sideSubtitle: 'Defined By',
  },
  {
    id: 3,
    image: '/images/latest-drop/download (12).jpg',
    title: 'Urban Nomads',
    subtitle: 'Collection 01',
    sideTitle: 'Structured Tones',
    sideSubtitle: 'Featuring Bold',
  },
  {
    id: 4,
    image: '/images/latest-drop/download (13).jpg',
    title: 'Heritage Knit',
    subtitle: 'Artisanal Series',
    sideTitle: 'Ancient Techniques',
    sideSubtitle: 'Woven With',
  },
  {
    id: 5,
    image: '/images/latest-drop/download (14).jpg',
    title: 'Monochrome Era',
    subtitle: 'Winter 2024',
    sideTitle: 'Shadow & Light',
    sideSubtitle: 'The Play Of',
  },
  {
    id: 6,
    image: '/images/latest-drop/paris_fashion_week.png',
    title: 'Artisan Craft',
    subtitle: 'The Art Of',
    sideTitle: 'Kathmandu',
    sideSubtitle: 'Handmade In',
  }
];

const variants: Variants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 1.1
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
      opacity: { duration: 0.6 },
      scale: { duration: 1.2, ease: [0.33, 1, 0.68, 1] }
    }
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    scale: 0.9,
    transition: {
      x: { type: "spring", stiffness: 300, damping: 30, mass: 0.8 },
      opacity: { duration: 0.4 }
    }
  })
};

const LatestDrops = () => {
  const [[page, direction], setPage] = useState([0, 0]);
  const activeIndex = (page % SLIDES.length + SLIDES.length) % SLIDES.length;

  const paginate = useCallback((newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  }, [page]);

  useEffect(() => {
    const timer = setInterval(() => paginate(1), 8000);
    return () => clearInterval(timer);
  }, [paginate]);

  return (
    <section className={styles.latestDrops}>
      <div className={styles.pagination}>
        {SLIDES.map((_, i) => (
          <div key={i} className={styles.dot}>
            {i === activeIndex && (
              <motion.div
                className={styles.dotActiveBar}
                initial={{ scaleY: 0 }}
                animate={{ scaleY: 1 }}
                transition={{ duration: 8, ease: "linear" }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Feature Bar */}
      {/* Feature Bar */}
      <div className={styles.featureBar}>
        {[
          { icon: 'M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6', title: '10% Cashback', subtitle: 'on App orders' },
          { icon: 'M21 8l-2-2H5L3 8v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z M3 8h18', title: '30 days returns', subtitle: '& Exchanges' },
          { icon: 'M1 3h15v13H1V3z M16 8h4l3 3v5h-7V8z', title: 'Free &', subtitle: 'Fast Shipping' }
        ].map((feature, idx) => (
          <motion.div
            key={idx}
            className={styles.featureItem}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{
              type: "spring",
              stiffness: 100,
              delay: idx * 0.1
            }}
          >
            <div className={styles.featureIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                {feature.icon.split(' M').map((path, i) => (
                  <path key={i} d={path.startsWith('M') ? path : 'M' + path} />
                ))}
              </svg>
            </div>
            <div className={styles.featureText}>
              <strong>{feature.title}</strong>
              <span>{feature.subtitle}</span>
            </div>
          </motion.div>
        ))}
      </div>

      <div className={styles.sectionTitle}>
        LATEST DROPS
      </div>

      <div className={styles.bannerContainer}>
        <div className={styles.scrollTrack} style={{ overflow: 'visible' }}>
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={page}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              className={styles.bannerSlide}
              style={{ position: 'absolute' }}
            >
              {/* Background Text Overlay */}
              <div className={styles.bannerOverlay}>
                <motion.div
                  className={`${styles.textGroup} ${styles.left}`}
                  initial={{ x: -100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.8, ease: "easeOut" }}
                >
                  <span className={styles.smallLabel}>{SLIDES[activeIndex].subtitle}</span>
                  <h2 className={styles.mainLabel}>{SLIDES[activeIndex].title}</h2>
                </motion.div>

                <motion.div
                  className={`${styles.textGroup} ${styles.right}`}
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
                >
                  <span className={styles.smallLabel}>{SLIDES[activeIndex].sideSubtitle}</span>
                  <h2 className={styles.mainLabel}>{SLIDES[activeIndex].sideTitle}</h2>
                </motion.div>
              </div>

              {/* Main Masked Image */}
              <motion.div
                className={styles.mainImageWrapper}
              >
                <motion.div
                  animate={{ scale: [1, 1.1] }}
                  transition={{ duration: 10, repeat: Infinity, repeatType: "mirror" }}
                  style={{ width: '100%', height: '100%', position: 'relative' }}
                >
                  <Image
                    src={SLIDES[activeIndex].image}
                    alt={SLIDES[activeIndex].title}
                    fill
                    priority
                    className={styles.bannerImage}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
                  />
                </motion.div>
              </motion.div>

              {/* Detail Floating Image */}
              <motion.div
                className={styles.detailImageWrapper}
                initial={{ y: 100, opacity: 0, rotate: 10 }}
                animate={{ y: 0, opacity: 1, rotate: -5 }}
                transition={{ delay: 0.6, duration: 1.2, ease: [0.33, 1, 0.68, 1] }}
              >
                <Image
                  src={SLIDES[activeIndex].image}
                  alt={`${SLIDES[activeIndex].title} detail`}
                  fill
                  className={styles.bannerImage}
                  style={{ transform: 'scale(1.5)', objectPosition: 'center 20%' }}
                  sizes="(max-width: 768px) 50vw, 300px"
                />
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className={styles.navArrow}>
          <button
            className={styles.arrowBtn}
            onClick={() => paginate(-1)}
            aria-label="Previous slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          <button
            className={styles.arrowBtn}
            onClick={() => paginate(1)}
            aria-label="Next slide"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default LatestDrops;
