import React from 'react';
import Image from 'next/image';
import styles from './SocialReels.module.css';

const REELS = [
  {
    id: 1,
    user: 'daur.official',
    youtubeId: '84GOmRlJvsI',
    text: "If this isn't what your wish list looks what are you doing?",
    hasQR: true
  },
  {
    id: 2,
    user: 'daur.official',
    youtubeId: 'OgWQ1oWV8lE',
    text: "Fresh racing inspired fits",
    hasQR: false
  },
  {
    id: 3,
    user: 'daur.studio',
    youtubeId: 'RwezQbuLnB0',
    text: "Namita had other brands. We had Daur.",
    hasQR: false
  },
  {
    id: 4,
    user: 'daur.studio',
    youtubeId: '84GOmRlJvsI',
    text: "Obsessed with quality. Passionate about the details",
    hasQR: false
  },
  {
    id: 5,
    user: 'daur.official',
    youtubeId: 'OgWQ1oWV8lE',
    text: "We are Daur for twinning",
    hasQR: false
  },
  {
    id: 6,
    user: 'daur.studio',
    youtubeId: 'RwezQbuLnB0',
    text: "Warning: This haul may cause extreme outfit envy",
    hasQR: false
  },
  {
    id: 7,
    user: 'daur.official',
    youtubeId: '84GOmRlJvsI',
    text: "Explore our latest collection now",
    hasQR: false
  }
];

const SocialReels = () => {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const isScrollingRef = React.useRef(false);

  const loopReels = [...REELS, ...REELS, ...REELS];
  const totalReels = REELS.length;

  React.useEffect(() => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[0] as HTMLElement;
      const cardWidth = card.offsetWidth + 12; // width + gap
      scrollRef.current.scrollLeft = cardWidth * totalReels;
    }

    const startAutoScroll = () => {
      return setInterval(() => {
        if (!isScrollingRef.current) {
          scrollToSlide('next');
        }
      }, 5000);
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
  }, [totalReels]);

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const { scrollLeft, offsetWidth } = scrollRef.current;
    const card = scrollRef.current.children[0] as HTMLElement;
    if (!card) return;
    
    const cardWidth = card.offsetWidth + 12;
    const totalWidth = cardWidth * totalReels;

    // Calculate active index for tracking
    const relativeScroll = scrollLeft % totalWidth;
    const index = Math.round(relativeScroll / cardWidth);
    setActiveIndex(index % totalReels);

    // SEAMLESS JUMP LOGIC
    if (!isScrollingRef.current) {
      if (scrollLeft <= cardWidth * 0.5) {
        scrollRef.current.style.scrollBehavior = 'auto';
        scrollRef.current.scrollLeft = scrollLeft + totalWidth;
        scrollRef.current.style.scrollBehavior = 'smooth';
      } else if (scrollLeft >= cardWidth * (totalReels * 2.5)) {
        scrollRef.current.style.scrollBehavior = 'auto';
        scrollRef.current.scrollLeft = scrollLeft - totalWidth;
        scrollRef.current.style.scrollBehavior = 'smooth';
      }
    }
  };

  const scrollToSlide = (direction: 'prev' | 'next') => {
    if (scrollRef.current) {
      const card = scrollRef.current.children[0] as HTMLElement;
      const cardWidth = card.offsetWidth + 12;
      const currentScroll = scrollRef.current.scrollLeft;
      
      isScrollingRef.current = true;
      
      const targetScroll = direction === 'next' 
        ? currentScroll + cardWidth 
        : currentScroll - cardWidth;
      
      scrollRef.current.scrollTo({
        left: targetScroll,
        behavior: 'smooth'
      });

      setTimeout(() => {
        isScrollingRef.current = false;
        if (scrollRef.current) {
          const { scrollLeft } = scrollRef.current;
          const totalWidth = cardWidth * totalReels;
          if (scrollLeft < cardWidth * totalReels || scrollLeft >= cardWidth * totalReels * 2) {
             const normalizedScroll = (scrollLeft % totalWidth) + totalWidth;
             scrollRef.current.style.scrollBehavior = 'auto';
             scrollRef.current.scrollLeft = normalizedScroll;
             scrollRef.current.style.scrollBehavior = 'smooth';
          }
        }
      }, 600);
    }
  };

  return (
    <section className={styles.section}>
      <h2 className={styles.title}>Explore Our Collection</h2>
      
      <div className={styles.scrollContainer}>
        <div 
          className={styles.track} 
          ref={scrollRef}
          onScroll={handleScroll}
        >
          {loopReels.map((reel, idx) => (
            <div key={`${reel.id}-${idx}`} className={styles.card}>
              <div className={styles.videoWrapper}>
                <iframe
                  className={styles.iframe}
                  src={`https://www.youtube-nocookie.com/embed/${reel.youtubeId}?autoplay=1&mute=1&loop=1&playlist=${reel.youtubeId}&controls=0&modestbranding=1&rel=0&showinfo=0`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              
              <div className={styles.overlay}>
                <div className={styles.topRow}>
                  <div className={styles.user}>
                    <div className={styles.userIcon}>
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    {reel.user}
                  </div>
                  <div className={styles.shopIcon}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                  </div>
                </div>

                {reel.hasQR && (
                  <div className={styles.qrBadge}>
                    <svg width="100%" height="100%" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M3 3h8v8H3zm2 2v4h4V5zm8-2h8v8h-8zm2 2v4h4V5zM3 13h8v8H3zm2 2v4h4v-4zm13-2h3v2h-3zm-3 0h2v2h-2zm3 3h3v2h-3zm-3 0h2v2h-2zm3 3h3v2h-3zm-3 0h2v2h-2zm-3-3h2v2h-2zm0 3h2v2h-2z"/>
                    </svg>
                  </div>
                )}
                
                {reel.hasQR && <span className={styles.downloadApp}>Download our app</span>}

                <p className={styles.bottomContent}>{reel.text}</p>
              </div>
            </div>
          ))}
        </div>
        
        <button 
          className={`${styles.navArrow} ${styles.prev}`}
          onClick={() => scrollToSlide('prev')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M15 18l-6-6 6-6"/>
          </svg>
        </button>

        <button 
          className={`${styles.navArrow} ${styles.next}`}
          onClick={() => scrollToSlide('next')}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M9 18l6-6-6-6"/>
          </svg>
        </button>
      </div>
    </section>
  );
};

export default SocialReels;
