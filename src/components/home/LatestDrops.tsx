"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import styles from "./LatestDrops.module.css";

interface ProjectData {
  title: string;
  image: string;
  category: string;
  year: string;
  description: string;
}

const PROJECT_DATA: ProjectData[] = [
  {
    title: "Paris Fashion Week",
    image: "/images/latest-drop/paris_fashion_week.png",
    category: "Concept Series",
    year: "2025",
    description: "Straight from the runway - an expressive motion study",
  },
  {
    title: "Luxury Collection",
    image: "/images/latest-drop/fashion_banner_2.png",
    category: "New Season",
    year: "2024",
    description: "Minimalist elegance defined by urban silhouettes",
  },
  {
    title: "Urban Nomads",
    image: "/images/latest-drop/download (12).jpg",
    category: "Collection 01",
    year: "2024",
    description: "Shadow & light play in the concrete jungle",
  },
  {
    title: "Heritage Knit",
    image: "/images/latest-drop/download (13).jpg",
    category: "Artisanal Series",
    year: "2023",
    description: "Ancient techniques woven with modern vision",
  },
];

const CONFIG = {
  LERP_FACTOR: 0.1,
};

const lerp = (start: number, end: number, factor: number) =>
  start + (end - start) * factor;

export default function LatestDrops() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  
  // Internal animation state
  const state = useRef({
    currentY: 0,
    targetY: 0,
    projectHeight: 0,
    minimapHeight: 280,
    totalHeight: 0,
  });

  const projectsRef = useRef<Map<number, HTMLLIElement>>(new Map());
  const minimapRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const infoRef = useRef<Map<number, HTMLDivElement>>(new Map());
  const requestRef = useRef<number | undefined>(undefined);

  const updateParallax = (
    img: HTMLImageElement | null,
    scroll: number,
    index: number,
    height: number
  ) => {
    if (!img) return;
    if (!img.dataset.parallaxCurrent) img.dataset.parallaxCurrent = "0";
    
    let current = parseFloat(img.dataset.parallaxCurrent);
    const target = (-scroll - index * height) * 0.35;
    current = lerp(current, target, 0.1);
    
    if (Math.abs(current - target) > 0.01) {
        img.style.transform = `translate3d(0, ${current}px, 0) scale(1.15)`;
        img.dataset.parallaxCurrent = current.toString();
    }
  };

  const updatePositions = () => {
    const s = state.current;
    if (s.projectHeight === 0) return;
    
    const minimapY = (s.currentY * s.minimapHeight) / s.projectHeight;

    projectsRef.current.forEach((el, index) => {
      const y = index * s.projectHeight + s.currentY;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      const img = el.querySelector("img");
      updateParallax(img, s.currentY, index, s.projectHeight);
    });

    minimapRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      const img = el.querySelector("img");
      updateParallax(img, minimapY, index, s.minimapHeight);
    });

    infoRef.current.forEach((el, index) => {
      const y = index * s.minimapHeight + minimapY;
      el.style.transform = `translate3d(0, ${y}px, 0)`;
      const fadeDist = s.minimapHeight * 0.4;
      const opacity = Math.max(0, 1 - Math.abs(y) / fadeDist);
      el.style.opacity = opacity.toString();
    });
  };

  function animationLoop() {
    const s = state.current;
    s.currentY = lerp(s.currentY, s.targetY, CONFIG.LERP_FACTOR);
    updatePositions();
    requestRef.current = requestAnimationFrame(animationLoop);
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!trackRef.current) return;
      
      const rect = trackRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const scrollHeight = rect.height - windowHeight;
      
      // Calculate how far we've scrolled through the track
      // offsetTop is negative when track starts moving above viewport
      const offsetTop = -rect.top;
      const progress = Math.min(1, Math.max(0, offsetTop / scrollHeight));
      
      const s = state.current;
      s.projectHeight = windowHeight;
      s.totalHeight = (PROJECT_DATA.length - 1) * windowHeight;
      s.targetY = -progress * s.totalHeight;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    requestRef.current = requestAnimationFrame(animationLoop);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (requestRef.current) cancelAnimationFrame(requestRef.current);
    };
  }, [animationLoop]);

  return (
    <section className={styles.latestDropsTrack} ref={trackRef}>
      <div className={styles.stickyContainer}>
        <div className={styles.parallaxContainer}>
          <div className={styles.sectionLabel}>Latest Drops</div>
          
          <div className={styles.scrollHint}>
            <div className={styles.scrollLine}></div>
            <span>Scroll to Explore</span>
          </div>

          <ul className={styles.projectList}>
            {PROJECT_DATA.map((data, i) => (
              <li
                key={i}
                className={styles.project}
                ref={(el) => {
                  if (el) projectsRef.current.set(i, el);
                  else projectsRef.current.delete(i);
                }}
              >
                <img src={data.image} alt={data.title} />
              </li>
            ))}
          </ul>

          <div className={styles.minimap}>
            <div className={styles.minimapWrapper}>
              <div className={styles.minimapImgPreview}>
                {PROJECT_DATA.map((data, i) => (
                  <div
                    key={i}
                    className={styles.minimapImgItem}
                    ref={(el) => {
                      if (el) minimapRef.current.set(i, el);
                      else minimapRef.current.delete(i);
                    }}
                  >
                    <img src={data.image} alt={data.title} />
                  </div>
                ))}
              </div>
              <div className={styles.minimapInfoList}>
                {PROJECT_DATA.map((data, i) => {
                  const num = (i + 1).toString().padStart(2, "0");
                  return (
                    <div
                      key={i}
                      className={styles.minimapItemInfo}
                      ref={(el) => {
                        if (el) infoRef.current.set(i, el);
                        else infoRef.current.delete(i);
                      }}
                    >
                      <div className={styles.minimapItemInfoRow}>
                        <p>{num}</p>
                        <p>{data.title}</p>
                      </div>
                      <div className={styles.minimapItemInfoRow}>
                        <p>{data.category}</p>
                        <p>{data.year}</p>
                      </div>
                      <div className={styles.minimapItemInfoRow}>
                        <p>{data.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
