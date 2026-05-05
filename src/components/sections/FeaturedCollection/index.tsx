"use client";

import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type MotionValue,
} from "motion/react";
import { useCollectionHover } from "./hooks/useCollectionHover";
import styles from "./FeaturedCollection.module.css";

type GridArea = "hero" | "wide" | "sq1" | "sq2" | "tall";

interface Product {
  id: string;
  category: string;
  title: string;
  price: string;
  image: string;
  gridArea: GridArea;
}

const PRODUCTS: Product[] = [
  {
    id: "f1",
    category: "Evening Wear",
    title: "Obsidian Bias-Cut Gown",
    price: "₹38,000",
    image:
      "https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=900&q=90",
    gridArea: "hero",
  },
  {
    id: "f2",
    category: "Signature",
    title: "Crimson Draped Column",
    price: "₹22,500",
    image:
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=90",
    gridArea: "wide",
  },
  {
    id: "f3",
    category: "Power Wear",
    title: "Ivory Structured Coat",
    price: "₹45,000",
    image:
      "https://images.unsplash.com/photo-1487222477894-8943e31ef7b2?w=900&q=90",
    gridArea: "sq1",
  },
  {
    id: "f4",
    category: "Couture",
    title: "Noir Feathered Hem",
    price: "₹62,000",
    image:
      "https://images.unsplash.com/photo-1483985988355-763728e1935b?w=900&q=90",
    gridArea: "sq2",
  },
  {
    id: "f5",
    category: "Essentials",
    title: "Gold Chain Minimal Slip",
    price: "₹16,500",
    image:
      "https://images.unsplash.com/photo-1614252369475-531eba835eb1?w=900&q=90",
    gridArea: "tall",
  },
];

const EASE_EXPO_OUT = [0.16, 1, 0.3, 1] as const;

const AREA_CLASS: Record<GridArea, string> = {
  hero: styles.areaHero,
  wide: styles.areaWide,
  sq1: styles.areaSq1,
  sq2: styles.areaSq2,
  tall: styles.areaTall,
};

interface CardProps {
  product: Product;
  index: number;
  parallaxY: MotionValue<number>;
  prefersReduced: boolean;
}

function Card({ product, index, parallaxY, prefersReduced }: CardProps) {
  const isHero = product.gridArea === "hero";
  const maxTilt = isHero ? 7 : 5;
  const { cardRef, rotateX, rotateY, glareGradient, onMouseMove, onMouseLeave } =
    useCollectionHover<HTMLAnchorElement>(maxTilt);

  const initial = prefersReduced
    ? { opacity: 0 }
    : { opacity: 0, y: 50, rotateX: -6 };
  const whileInView = prefersReduced
    ? { opacity: 1 }
    : { opacity: 1, y: 0, rotateX: 0 };

  return (
    <motion.div
      className={`${styles.cardWrapper} ${AREA_CLASS[product.gridArea]}`}
      style={{ y: parallaxY }}
      initial={initial}
      whileInView={whileInView}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: prefersReduced ? 0.4 : 0.8,
        ease: EASE_EXPO_OUT,
        delay: prefersReduced ? 0 : index * 0.07,
      }}
    >
      <motion.a
        ref={cardRef}
        href={`/collections/${product.id}`}
        className={styles.card}
        onMouseMove={onMouseMove}
        onMouseLeave={onMouseLeave}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      >
        <div className={styles.imageWrap}>
          {/* Decorative — visible product name carries the accessible name */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={product.image} alt="" className={styles.image} />
        </div>

        <motion.div
          className={styles.glare}
          style={{ background: glareGradient }}
          aria-hidden="true"
        />

        <div className={styles.content}>
          <span className={styles.category} aria-hidden="true">
            {product.category}
          </span>
          <h3 className={styles.productName}>{product.title}</h3>
          <span className={styles.price}>{product.price}</span>
          <span className={styles.addLink} aria-hidden="true">
            Add to Collection
          </span>
        </div>
      </motion.a>
    </motion.div>
  );
}

export default function FeaturedCollection() {
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const headerYActive = useTransform(scrollYProgress, [0, 1], [60, -40]);
  const heroYActive = useTransform(scrollYProgress, [0, 1], [30, -30]);
  const otherYActive = useTransform(scrollYProgress, [0, 1], [50, -20]);
  const railScaleActive = scrollYProgress;
  const heroGlowOpacityActive = useTransform(
    scrollYProgress,
    [0.1, 0.4],
    [0, 1],
  );

  const headerYStill = useTransform(scrollYProgress, () => 0);
  const zeroY = useTransform(scrollYProgress, () => 0);
  const oneScale = useTransform(scrollYProgress, () => 1);
  const oneOpacity = useTransform(scrollYProgress, () => 1);

  const headerY = prefersReduced ? headerYStill : headerYActive;
  const heroY = prefersReduced ? zeroY : heroYActive;
  const otherY = prefersReduced ? zeroY : otherYActive;
  const railScale = prefersReduced ? oneScale : railScaleActive;
  const heroGlowOpacity = prefersReduced ? oneOpacity : heroGlowOpacityActive;

  return (
    <section
      ref={sectionRef}
      className={styles.section}
      style={{ position: "relative" }}
      aria-labelledby="featured-collection-title"
    >
      <motion.div
        className={styles.depthRail}
        style={{ scaleY: railScale }}
        aria-hidden="true"
      />

      <motion.div className={styles.header} style={{ y: headerY }}>
        <div>
          <span className={styles.eyebrow}>Essential Selection</span>
          <h2 id="featured-collection-title" className={styles.title}>
            Featured
            <br />
            Collection
          </h2>
        </div>

        <svg
          className={styles.rule}
          viewBox="0 0 200 1"
          aria-hidden="true"
          focusable="false"
        >
          <motion.line
            x1="0"
            y1="0.5"
            x2="200"
            y2="0.5"
            className={styles.rulePath}
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: EASE_EXPO_OUT, delay: 0.2 }}
          />
        </svg>
      </motion.div>

      <div className={styles.grid}>
        {PRODUCTS.map((product, i) => (
          <Card
            key={product.id}
            product={product}
            index={i}
            parallaxY={product.gridArea === "hero" ? heroY : otherY}
            prefersReduced={!!prefersReduced}
          />
        ))}
      </div>

      <motion.div
        className={styles.heroGlow}
        style={{ opacity: heroGlowOpacity }}
        aria-hidden="true"
      />

      <span className={styles.countStamp} aria-hidden="true">
        05
      </span>

      <div className={styles.ctaRow}>
        <motion.a
          href="/collections"
          className={styles.cta}
          whileHover={prefersReduced ? undefined : { x: 6 }}
          transition={{ duration: 0.3, ease: EASE_EXPO_OUT }}
        >
          View All
        </motion.a>
      </div>
    </section>
  );
}
