import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './LatestDrops.module.css';

const SLIDES = [
  {
    id: 1,
    image: '/images/latest-drop/paris_fashion_week.png',
    title: 'Paris Fashion Week',
    subtitle: 'Straight From',
    sideTitle: 'Himalayan Art',
    sideSubtitle: 'Expressed Through Intricate',
    hasLogo: true
  },
  {
    id: 2,
    image: '/images/latest-drop/fashion_banner_2.png',
    title: 'Luxury Collection',
    subtitle: 'New Season',
    sideTitle: 'Minimalist Elegance',
    sideSubtitle: 'Defined By',
    hasLogo: false
  },
  {
    id: 3,
    image: '/images/latest-drop/download (12).jpg',
    title: 'Urban Nomads',
    subtitle: 'Collection 01',
    sideTitle: 'Structured Tones',
    sideSubtitle: 'Featuring Bold',
    hasLogo: false
  },
  {
    id: 4,
    image: '/images/latest-drop/download (13).jpg',
    title: 'Heritage Knit',
    subtitle: 'Artisanal Series',
    sideTitle: 'Ancient Techniques',
    sideSubtitle: 'Woven With',
    hasLogo: false
  },
  {
    id: 5,
    image: '/images/latest-drop/download (14).jpg',
    title: 'Monochrome Era',
    subtitle: 'Winter 2024',
    sideTitle: 'Shadow & Light',
    sideSubtitle: 'The Play Of',
    hasLogo: false
  },
  {
    id: 6,
    image: '/images/latest-drop/paris_fashion_week.png',
    title: 'Artisan Craft',
    subtitle: 'The Art Of',
    sideTitle: 'Kathmandu',
    sideSubtitle: 'Handmade In',
    hasLogo: false,
    grayscale: true
  }
];

const LatestDrops = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);
  const isScrollingRef = useRef(false);
  const totalSlides = SLIDES.length;

  // We use 3 sets of slides for seamless looping
  const loopSlides = [...SLIDES, ...SLIDES, ...SLIDES];

  const getSlideWidth = () => {
    if (scrollRef.current && scrollRef.current.children.length > 0) {
      return (scrollRef.current.children[0] as HTMLElement).offsetWidth;
    }
    return 0;
  };

  const handleSilentJump = () => {
    if (!scrollRef.current) return;
    const slideWidth = getSlideWidth();
    const { scrollLeft } = scrollRef.current;
    const totalWidth = slideWidth * totalSlides;

    if (scrollLeft < totalWidth * 0.5) {
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.scrollLeft = scrollLeft + totalWidth;
    } else if (scrollLeft > totalWidth * 2.5) {
      scrollRef.current.style.scrollBehavior = 'auto';
      scrollRef.current.scrollLeft = scrollLeft - totalWidth;
    }
  };

  useEffect(() => {
    const track = scrollRef.current;
    if (!track) return;

    // Initial position: start of the middle set
    const init = () => {
      const slideWidth = getSlideWidth();
      if (track && slideWidth > 0) {
        track.style.scrollBehavior = 'auto';
        track.scrollLeft = slideWidth * totalSlides;
      }
    };

    const timer = setTimeout(init, 200);

    // Auto-scroll logic
    const interval = setInterval(() => {
      if (!isScrollingRef.current) {
        scrollToSlide('next');
      }
    }, 5000);

    const handleResize = () => {
      if (track) {
        track.style.scrollBehavior = 'auto';
        init();
      }
    };
    window.addEventListener('resize', handleResize);

    return () => {
      clearTimeout(timer);
      clearInterval(interval);
      window.removeEventListener('resize', handleResize);
    };
  }, [totalSlides]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft } = scrollRef.current;
    const slideWidth = getSlideWidth();
    if (slideWidth === 0) return;

    // Calculate active index for dots based on scroll position
    const relativeScroll = scrollLeft % (slideWidth * totalSlides);
    const index = Math.round(relativeScroll / slideWidth);
    setActiveIndex(index % totalSlides);

    // Continuous jump check for manual scrolling (only when not animating)
    if (!isScrollingRef.current) {
      handleSilentJump();
    }
  };

  const scrollToSlide = (direction: 'prev' | 'next') => {
    if (!scrollRef.current || isScrollingRef.current) return;

    const track = scrollRef.current;
    const slideWidth = getSlideWidth();
    const currentScroll = track.scrollLeft;

    isScrollingRef.current = true;
    track.style.scrollBehavior = 'smooth';

    // Target the next slide's exact offset
    const targetScroll = direction === 'next'
      ? Math.round((currentScroll + slideWidth) / slideWidth) * slideWidth
      : Math.round((currentScroll - slideWidth) / slideWidth) * slideWidth;

    track.scrollLeft = targetScroll;

    // Allow animation to finish before resetting flag and checking jump
    setTimeout(() => {
      isScrollingRef.current = false;
      handleSilentJump();
    }, 800);
  };

  return (
    <section className={styles.latestDrops}>
      {/* Pagination Dots */}
      <div className={styles.pagination}>
        {SLIDES.map((_, i) => (
          <div
            key={i}
            className={`${styles.dot} ${i === activeIndex ? styles.active : ''}`}
          ></div>
        ))}
      </div>

      {/* Feature Bar */}
      <div className={styles.featureBar}>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
            </svg>
          </div>
          <div>
            <strong>10% Cashback</strong>
            on all App orders
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 8l-2-2H5L3 8v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V8z" />
              <path d="M3 8h18" />
              <path d="M10 12l-2 2 2 2" />
              <path d="M14 16l2-2-2-2" />
            </svg>
          </div>
          <div>
            <strong>30 days Easy Returns</strong>
            & Exchanges
          </div>
        </div>
        <div className={styles.featureItem}>
          <div className={styles.featureIcon}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="1" y="3" width="15" height="13" />
              <polygon points="16 8 20 8 23 11 23 16 16 16 16 8" />
              <circle cx="5.5" cy="18.5" r="2.5" />
              <circle cx="18.5" cy="18.5" r="2.5" />
            </svg>
          </div>
          <div>
            <strong>Free &</strong>
            Fast Shipping
          </div>
        </div>
      </div>

      <h2 className={styles.sectionTitle}>LATEST DROPS</h2>

      <div className={styles.bannerContainer}>
        <button
          className={`${styles.navArrow} ${styles.prev}`}
          onClick={() => scrollToSlide('prev')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6"></polyline>
          </svg>
        </button>

        <div
          className={styles.scrollTrack}
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {loopSlides.map((slide, idx) => (
            <div key={`${slide.id}-${idx}`} className={styles.bannerSlide}>
              <div className={styles.imageWrapper}>
                <Image
                  src={slide.image}
                  alt={slide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 95vw"
                  className={styles.bannerImage}
                  style={slide.grayscale ? { filter: 'grayscale(1) brightness(0.7)' } : {}}
                />
              </div>
              <div className={styles.bannerOverlay}>
                <div className={`${styles.textGroup} ${styles.left}`}>
                  <div className={styles.logoAndText}>
                    {slide.hasLogo && (
                      <div className={styles.pfwLogo}>
                        <span>P</span>
                        <span>W</span>
                        <span className={styles.pfwF}>F</span>
                      </div>
                    )}
                    <div>
                      <span className={styles.smallLabel}>{slide.subtitle}</span>
                      <span className={styles.mainLabel}>{slide.title}</span>
                    </div>
                  </div>
                </div>
                <div className={`${styles.textGroup} ${styles.right}`}>
                  <span className={styles.smallLabel}>{slide.sideSubtitle}</span>
                  <span className={styles.mainLabel}>{slide.sideTitle}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          className={`${styles.navArrow} ${styles.next}`}
          onClick={() => scrollToSlide('next')}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default LatestDrops;
