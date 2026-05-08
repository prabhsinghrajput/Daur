import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './LatestDrops.module.css';

const SLIDES = [
  {
    id: 1,
    image: '/images/paris_fashion_week.png',
    title: 'Paris Fashion Week',
    subtitle: 'Straight From',
    sideTitle: 'Himalayan Art',
    sideSubtitle: 'Expressed Through Intricate',
    hasLogo: true
  },
  {
    id: 2,
    image: '/images/fashion_banner_2.png',
    title: 'Luxury Collection',
    subtitle: 'New Season',
    sideTitle: 'Minimalist Elegance',
    sideSubtitle: 'Defined By',
    hasLogo: false
  },
  {
    id: 3,
    image: '/images/paris_fashion_week.png',
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
  
  const loopSlides = [...SLIDES, ...SLIDES, ...SLIDES];
  const totalSlides = SLIDES.length;

  useEffect(() => {
    if (scrollRef.current) {
      const slide = scrollRef.current.children[0] as HTMLElement;
      const slideWidth = slide.offsetWidth + 20;
      scrollRef.current.scrollLeft = slideWidth * totalSlides;
    }

    const startAutoScroll = () => {
      return setInterval(() => {
        if (!isScrollingRef.current) {
          scrollToSlide('next');
        }
      }, 4000);
    };

    let interval = startAutoScroll();

    const handleMouseEnter = () => clearInterval(interval);
    const handleMouseLeave = () => {
      clearInterval(interval);
      interval = startAutoScroll();
    };

    const track = scrollRef.current;
    if (track) {
      track.addEventListener('mouseenter', handleMouseEnter);
      track.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      clearInterval(interval);
      if (track) {
        track.removeEventListener('mouseenter', handleMouseEnter);
        track.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [totalSlides]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, offsetWidth } = scrollRef.current;
    const slide = scrollRef.current.children[0] as HTMLElement;
    if (!slide) return;
    
    const slideWidth = slide.offsetWidth + 20;
    const totalWidth = slideWidth * totalSlides;

    // Calculate active index for dots
    const relativeScroll = scrollLeft % totalWidth;
    const index = Math.round(relativeScroll / slideWidth);
    setActiveIndex(index % totalSlides);

    // SEAMLESS JUMP LOGIC
    // We only jump when the user isn't actively being moved by our scrollToSlide function
    // or when they've reached the extreme ends of our 3x buffer.
    if (!isScrollingRef.current) {
      if (scrollLeft <= slideWidth * 0.5) {
        // Near start of 1st set -> Jump to 2nd set
        scrollRef.current.style.scrollBehavior = 'auto';
        scrollRef.current.scrollLeft = scrollLeft + totalWidth;
        scrollRef.current.style.scrollBehavior = 'smooth';
      } else if (scrollLeft >= slideWidth * (totalSlides * 2.5)) {
        // Near end of 3rd set -> Jump to 2nd set
        scrollRef.current.style.scrollBehavior = 'auto';
        scrollRef.current.scrollLeft = scrollLeft - totalWidth;
        scrollRef.current.style.scrollBehavior = 'smooth';
      }
    }
  };

  const scrollToSlide = (direction: 'prev' | 'next') => {
    if (scrollRef.current) {
      const slide = scrollRef.current.children[0] as HTMLElement;
      const slideWidth = slide.offsetWidth + 20;
      const currentScroll = scrollRef.current.scrollLeft;
      
      isScrollingRef.current = true;
      
      const targetScroll = direction === 'next' 
        ? currentScroll + slideWidth 
        : currentScroll - slideWidth;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      // Clear the scrolling flag after the animation completes
      setTimeout(() => {
        isScrollingRef.current = false;
        // After manual move, check if we need a silent jump to stay in the middle set
        if (scrollRef.current) {
          const { scrollLeft } = scrollRef.current;
          const totalWidth = slideWidth * totalSlides;
          if (scrollLeft < slideWidth * totalSlides || scrollLeft >= slideWidth * totalSlides * 2) {
             const normalizedScroll = (scrollLeft % totalWidth) + totalWidth;
             scrollRef.current.style.scrollBehavior = 'auto';
             scrollRef.current.scrollLeft = normalizedScroll;
             scrollRef.current.style.scrollBehavior = 'smooth';
          }
        }
      }, 600); // Matches standard smooth scroll duration
    }
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

      <h2 className={styles.sectionTitle}>Latest Drops</h2>

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
              <Image 
                src={slide.image} 
                alt={slide.title} 
                fill
                className={styles.bannerImage}
                style={slide.grayscale ? { filter: 'grayscale(1) brightness(0.7)' } : {}}
              />
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
