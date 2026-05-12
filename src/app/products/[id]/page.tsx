"use client";

import React, { useState, use, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

import Navbar from '../../../components/Navbar';
import Footer from '../../../components/home/Footer';
import { useCart } from '../../../context/CartContext';

import Product3D from '../../../components/products/Product3D';
import styles from './product.module.css';
import { products } from '../../../components/home/product-catalogue/products.data';
import { activeProducts } from '../../../components/active/active-catalogue/activeProducts.data';
import { labsProducts } from '../../../components/labs/labsProducts.data';
import Link from 'next/link';


const AccordionItem = ({ title, children, defaultOpen = false }: { title: string, children: React.ReactNode, defaultOpen?: boolean }) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <div className={styles.accordionItem}>
      <button className={styles.accordionHeader} onClick={() => setIsOpen(!isOpen)}>
        <span>{title}</span>
        <svg
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s' }}
        >
          <path d="M6 9l6 6 6-6" />
        </svg>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className={styles.accordionContent}
          >
            <div className={styles.accordionInner}>{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export default function ProductPage({ params }: ProductPageProps) {
  const resolvedParams = use(params);
  const productId = parseInt(resolvedParams.id);

  // Look for product in all catalogues
  const product =
    products.find(p => p.id === productId) ||
    activeProducts.find(p => p.id === productId) ||
    labsProducts.find(p => (p as any).id === productId);



  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedView, setSelectedView] = useState(0);
  const [activeTab, setActiveTab] = useState('Features');
  const [show360, setShow360] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  // REVIEW STATES
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [userRating, setUserRating] = useState(5);
  const [reviewText, setReviewText] = useState('');
  const [userName, setUserName] = useState('');
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  interface Review {
    id: number;
    name: string;
    date: string;
    rating: number;
    content: string;
    photos: string[];
  }

  const [reviews, setReviews] = useState<Review[]>([
    {
      id: 1,
      name: 'Aditya S.',
      date: 'May 12, 2026',
      rating: 5,
      content: 'The texture of this pullover is unlike anything I have owned before. The 3D-knit topology gives it a very architectural feel. Fits true to size and feels incredibly premium.',
      photos: []
    },
    {
      id: 2,
      name: 'Ishani K.',
      date: 'April 28, 2026',
      rating: 4,
      content: 'Absolutely love the shadow grey color. It has a depth to it that doesn\'t show fully in photos. The only minor thing is the weight; it\'s slightly heavier than expected, but perfect for evenings.',
      photos: []
    }
  ]);

  const [recommendedProducts, setRecommendedProducts] = useState<any[]>([]);

  useEffect(() => {
    const shuffled = [...products, ...activeProducts, ...labsProducts]
      .filter(p => p.id !== product?.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 4);
    setRecommendedProducts(shuffled);
  }, [product?.id]);

  const { addToCart } = useCart();


  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newReview = {
      id: Date.now(),
      name: userName || 'Anonymous',
      date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      rating: userRating,
      content: reviewText,
      photos: uploadedPhotos
    };
    setReviews([newReview, ...reviews]);
    setShowReviewForm(false);
    setReviewText('');
    setUserName('');
    setUserRating(5);
    setUploadedPhotos([]);
  };

  const handlePhotoUpload = () => {
    if (product) setUploadedPhotos([...uploadedPhotos, product.heroImage]);
  };

  const handleNextView = () => {
    setSelectedView((prev) => (prev + 1) % productViews.length);
    setShow360(false);
  };

  const handlePrevView = () => {
    setSelectedView((prev) => (prev - 1 + productViews.length) % productViews.length);
    setShow360(false);
  };



  if (!product) {
    return (
      <div className={styles.main}>
        <Navbar />
        <div style={{ padding: '100px', textAlign: 'center' }}>
          <h1>Product not found</h1>
        </div>
      </div>
    );
  }

  // Define gallery views (simulated for now with heroImage if specific ones aren't provided)
  const productViews = [
    { label: 'Front', image: product.heroImage },
    { label: 'Back', image: product.heroImage }, // In a real app, these would be separate props
    { label: 'Fabric', image: product.heroImage },
    { label: 'Detail', image: product.heroImage },
  ];

  // Find other colors (same category, different color)
  const colorVariants = products.filter(p => p.category === product.category);

  const handleAddToCart = () => {
    setIsAdding(true);
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      size: selectedSize,
      image: product.heroImage,
      quantity: 1
    });

    setTimeout(() => setIsAdding(false), 2000);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    alert('Redirecting to checkout...');
  };

  const sizes = ['XS', 'S', 'M', 'L', 'XL'];

  return (
    <main className={styles.main}>
      <Navbar />

      <div className={styles.productLayout}>
        {/* LEFT SIDE: GALLERY */}
        <div className={styles.gallery}>
          <div className={styles.galleryGrid}>
            <div className={styles.thumbnails}>
              {productViews.map((view, i) => (
                <div
                  key={i}
                  className={`${styles.thumb} ${selectedView === i && !show360 ? styles.thumbActive : ''}`}
                  onClick={() => {
                    setSelectedView(i);
                    setShow360(false);
                  }}
                >
                  <img src={view.image} alt={view.label} />
                </div>
              ))}
              <div
                className={`${styles.thumb} ${show360 ? styles.thumbActive : ''}`}
                onClick={() => setShow360(true)}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', fontSize: '10px', fontWeight: 600 }}>360°</div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className={styles.galleryImageWrapper}
            >


              {show360 ? (
                <Product3D 
                  modelPath="/tshirt_model/blue.glb" 
                  fallbackImage={product.heroImage} 
                />
              ) : (
                <motion.img
                  key={productViews[selectedView].image + selectedView}
                  src={productViews[selectedView].image}
                  alt={product.name}
                  className={styles.galleryImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                />
              )}

              {!show360 && (
                <>
                  <button
                    className={styles.view360Btn}
                    onClick={() => setShow360(true)}
                  >
                    <div className={styles.btnIcon}>
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
                        <path d="M12 6V12L16 14" />
                      </svg>
                    </div>
                    <span>360° EXPERIENCE</span>
                  </button>

                  <div className={styles.galleryControls}>
                    <button className={styles.arrowBtn} onClick={handlePrevView} aria-label="Previous image">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="19" y1="12" x2="5" y2="12"></line>
                        <polyline points="12 19 5 12 12 5"></polyline>
                      </svg>
                    </button>
                    <button className={styles.arrowBtn} onClick={handleNextView} aria-label="Next image">
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="5" y1="12" x2="19" y2="12"></line>
                        <polyline points="12 5 19 12 12 19"></polyline>
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </motion.div>
          </div>
        </div>

        {/* RIGHT SIDE: INFO */}
        <aside className={styles.stickyInfo}>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className={styles.infoContent}
          >
            <header className={styles.productHeader}>
              <div className={styles.headerTop}>
                <h1 className={styles.productName}>{product.name}</h1>
                {product.isNew && <span className={styles.newTag}>New</span>}
              </div>
              <p className={styles.price}>{product.price}</p>
              <div className={styles.headerDivider} />
              <p className={styles.tagline}>{product.tagline}</p>
            </header>

            {/* COLOR SELECTOR */}
            <section className={styles.colorSelector}>
              <span className={styles.colorLabel}>Color: {product.color}</span>
              <div className={styles.colorGrid}>
                {colorVariants.map(variant => (
                  <Link
                    href={`/products/${variant.id}`}
                    key={variant.id}
                    className={`${styles.colorSwatch} ${variant.id === product.id ? styles.colorSwatchActive : ''}`}
                    style={{ backgroundColor: variant.accentColor }}
                    title={variant.color}
                  />
                ))}
              </div>
            </section>

            <section className={styles.selectorSection}>
              <div className={styles.selectorHeader}>
                <span className={styles.selectorLabel}>Size</span>
                <button className={styles.sizeGuideBtn}>Size Guide</button>
              </div>
              <div className={styles.sizeGrid}>
                {sizes.map(size => (
                  <button
                    key={size}
                    className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </section>

            <div className={styles.actionButtons}>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`${styles.addToCartBtn} ${isAdding ? styles.btnLoading : ''}`}
                onClick={handleAddToCart}
                disabled={isAdding}
              >
                {isAdding ? 'ADDING...' : 'ADD TO BAG'}
              </motion.button>
              <button className={styles.buyNowBtn} onClick={handleBuyNow}>INSTANT CHECKOUT</button>
            </div>

            {/* DELIVERY & SHIPPING INFO */}
            <section className={styles.shippingInfo}>
              <div className={styles.shippingItem}>
                <svg className={styles.shippingIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M1 3h15v13H1zM16 8h4l3 3v5h-7V8z" />
                  <circle cx="5.5" cy="18.5" r="2.5" />
                  <circle cx="18.5" cy="18.5" r="2.5" />
                </svg>
                <span>Free shipping across India</span>
              </div>
              <div className={styles.shippingItem}>
                <svg className={styles.shippingIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
                <span>Delivery in 3–5 days</span>
              </div>
              <div className={styles.shippingItem}>
                <svg className={styles.shippingIcon} width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
                  <path d="M3 3v5h5" />
                </svg>
                <span>Easy returns within 7 days</span>
              </div>
              <p className={styles.shippingMinimal}>Free shipping & easy returns.</p>
            </section>


            <section className={styles.detailsAccordion}>

              <AccordionItem title="The Look" defaultOpen={true}>
                <p>{product.description}</p>
              </AccordionItem>

              <AccordionItem title="Product Highlights">
                <div className={styles.highlightsGrid}>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightLabel}>Sleeve</span>
                    <span className={styles.highlightValue}>Half Sleeve</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightLabel}>Fabric</span>
                    <span className={styles.highlightValue}>{product.material.split(' ')[1] || 'Cotton'} Blend</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightLabel}>Neck Type</span>
                    <span className={styles.highlightValue}>Crew Neck</span>
                  </div>
                  <div className={styles.highlightItem}>
                    <span className={styles.highlightLabel}>Pattern</span>
                    <span className={styles.highlightValue}>Solid</span>
                  </div>
                </div>
              </AccordionItem>

              <AccordionItem title="Composition & Fit">
                <ul className={styles.detailsList}>
                  <li><strong>Material:</strong> {product.material}</li>
                  <li><strong>Weight:</strong> {product.gsm ? `${product.gsm} GSM` : "Premium Weight"}</li>
                  <li><strong>Fit:</strong> {product.fit || "Tailored Fit"}</li>
                  <li><strong>Color:</strong> {product.color}</li>
                </ul>
              </AccordionItem>

              <AccordionItem title="Sustainability & Ethics">
                <p>Ethically sourced and crafted in our signature studios. Our commitment to sustainability ensures each piece is made with respect for both the planet and the people behind the craft.</p>
              </AccordionItem>
            </section>

            {/* INFO TABS (Moved to Right Side) */}
            <div className={styles.tabsContainer} style={{ marginTop: '3rem' }}>
              <div className={styles.tabsHeader}>
                {['Features', 'Specs'].map(tab => (
                  <button
                    key={tab}
                    className={`${styles.tabBtn} ${activeTab === tab ? styles.tabBtnActive : ''}`}
                    onClick={() => setActiveTab(tab)}
                    style={{ padding: '0.8rem 1rem', fontSize: '9px' }}
                  >
                    {tab}
                  </button>
                ))}
              </div>
              <div className={styles.tabContent} style={{ padding: '1.5rem 0' }}>
                <AnimatePresence mode="wait">
                  {activeTab === 'Features' ? (
                    <motion.div
                      key="features"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={styles.highlightsGrid}
                      style={{ gridTemplateColumns: '1fr', gap: '1rem' }}
                    >
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Product Code</span>
                        <span className={styles.highlightValue}>DAUR-PRM-{product.id}</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Origin</span>
                        <span className={styles.highlightValue}>Himalayan Craft Regions</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Manufacturer</span>
                        <span className={styles.highlightValue}>Daur Internationale Studios</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Packaging</span>
                        <span className={styles.highlightValue}>Sustainable Wood-Pulp Box</span>
                      </div>
                    </motion.div>
                  ) : (
                    <motion.div
                      key="specs"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={styles.highlightsGrid}
                      style={{ gridTemplateColumns: '1fr 1fr', gap: '1.5rem 1rem' }}
                    >
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Brand</span>
                        <span className={styles.highlightValue}>DAUR</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Type</span>
                        <span className={styles.highlightValue}>Crew Neck</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Sleeve</span>
                        <span className={styles.highlightValue}>Half Sleeve</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Fit</span>
                        <span className={styles.highlightValue}>{product.fit || 'Tailored'}</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Fabric</span>
                        <span className={styles.highlightValue}>{product.material}</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Ideal For</span>
                        <span className={styles.highlightValue}>Unisex</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Pattern</span>
                        <span className={styles.highlightValue}>Solid</span>
                      </div>
                      <div className={styles.highlightItem}>
                        <span className={styles.highlightLabel}>Fabric Care</span>
                        <span className={styles.highlightValue}>Machine Wash</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

          </motion.div>
        </aside>
      </div>

      {/* RATINGS & REVIEWS SECTION */}
      <section className={styles.recommendedSection} style={{ marginTop: '6rem' }}>
        <div className={styles.reviewsSection}>
          <div className={styles.reviewsHeader}>
            <div className={styles.ratingSummary}>
              <h2 className={styles.recommendedTitle} style={{ marginBottom: '1rem' }}>Ratings and reviews</h2>
              <div className={styles.averageScore}>
                <span className={styles.scoreNumber}>4.8</span>
                <span className={styles.scoreLabel}>EXCEPTIONAL</span>
              </div>
              <span className={styles.ratingCount}>based on {reviews.length + 1246} ratings by Verified Buyers</span>
            </div>
            <button
              className={styles.sizeGuideBtn}
              style={{ opacity: 1 }}
              onClick={() => setShowReviewForm(true)}
            >
              Write a review
            </button>
          </div>

          {/* DYNAMIC USER PHOTO GALLERY (Pulls from reviews) */}
          <div className={styles.userGallery}>
            <img src={product.heroImage} className={`${styles.userPhoto} ${styles.mainPhoto}`} alt="User Review" />
            {reviews.filter(r => r.photos.length > 0).slice(0, 3).map((r, i) => (
              <img key={i} src={r.photos[0]} className={styles.userPhoto} alt="User Review" />
            ))}
            <div className={`${styles.userPhoto} ${styles.morePhotos}`}>
              <img src={product.heroImage} className={styles.userPhoto} alt="User Review" />
              <div className={styles.photoOverlay}>+{reviews.length + 40}</div>
            </div>
          </div>

          <div className={styles.lovedFeatures}>
            <span className={styles.lovedTitle}>Features customers loved</span>
            <div className={styles.featureTags}>
              {['Fabric Quality', 'Precision Stitching', 'Contemporary Fit', 'Signature Color', 'Premium Feel', 'Sustainable Packaging'].map(tag => (
                <span key={tag} className={styles.tag}>{tag}</span>
              ))}
            </div>
          </div>

          {/* DYNAMIC REVIEW LIST */}
          <div className={styles.reviewList}>
            {reviews.map(review => (
              <div key={review.id} className={styles.reviewItem}>
                <div className={styles.reviewItemHeader}>
                  <div className={styles.userInfo}>
                    <div className={styles.userAvatar}>{review.name.charAt(0)}</div>
                    <div>
                      <div className={styles.userName}>{review.name}</div>
                      <div className={styles.reviewDate}>{review.date}</div>
                    </div>
                  </div>
                  <div className={styles.starRating}>
                    {[1, 2, 3, 4, 5].map(s => (
                      <svg
                        key={s}
                        width="14" height="14"
                        viewBox="0 0 24 24"
                        fill={s <= review.rating ? "currentColor" : "none"}
                        stroke="currentColor"
                        strokeWidth="1"
                        className={s <= review.rating ? styles.starActive : styles.star}
                      >
                        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <p className={styles.reviewContent}>{review.content}</p>
                {review.photos.length > 0 && (
                  <div className={styles.reviewPhotos}>
                    {review.photos.map((photo, i) => (
                      <img key={i} src={photo} className={styles.reviewPhoto} alt="Review attachment" />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* REVAMPED REVIEW MODAL */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            className={styles.modalOverlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className={styles.reviewModal}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <button className={styles.closeModal} onClick={() => setShowReviewForm(false)}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                  <path d="M18 6L6 18M6 6l12 12" />
                </svg>
              </button>

              {/* LEFT SIDE: PRODUCT CONTEXT */}
              <aside className={styles.modalProductSidebar}>
                <div className={styles.modalProductInfo}>
                  <img src={product.heroImage} className={styles.modalProductImg} alt={product.name} />
                  <div>
                    <h3 className={styles.highlightValue} style={{ fontSize: '1.2rem' }}>{product.name}</h3>
                    <p className={styles.highlightLabel}>{product.price}</p>
                  </div>
                </div>
                <div className={styles.ratingCount}>
                  Your feedback helps us maintain the Daur standard of excellence.
                </div>
              </aside>

              {/* RIGHT SIDE: PREMIUM FORM */}
              <main className={styles.modalFormSide}>
                <h2 className={styles.formTitle}>Write a review</h2>

                <form onSubmit={handleReviewSubmit}>
                  <div className={styles.premiumInputGroup}>
                    <span className={styles.premiumLabel}>Overall Rating</span>
                    <div className={styles.starRatingLarge}>
                      {[1, 2, 3, 4, 5].map(s => (
                        <div
                          key={s}
                          onClick={() => setUserRating(s)}
                          className={s <= userRating ? styles.starLargeActive : styles.starLarge}
                        >
                          <svg width="32" height="32" viewBox="0 0 24 24" fill={s <= userRating ? "currentColor" : "none"} stroke="currentColor" strokeWidth="1">
                            <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                          </svg>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={styles.premiumInputGroup}>
                    <label className={styles.premiumLabel}>Your Name</label>
                    <input
                      type="text"
                      className={styles.premiumInput}
                      placeholder="Enter your name"
                      value={userName}
                      onChange={(e) => setUserName(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.premiumInputGroup}>
                    <label className={styles.premiumLabel}>Review Details</label>
                    <textarea
                      className={styles.premiumTextarea}
                      placeholder="Share your experience with the fit, feel and finish..."
                      value={reviewText}
                      onChange={(e) => setReviewText(e.target.value)}
                      required
                    />
                  </div>

                  <div className={styles.premiumInputGroup}>
                    <label className={styles.premiumLabel}>Media Portfolio</label>
                    <div className={styles.luxuryUpload} onClick={handlePhotoUpload}>
                      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                        <path d="M21 15l-5-5L5 21" />
                        <circle cx="9" cy="9" r="2" />
                      </svg>
                      <span className={styles.highlightLabel}>
                        {uploadedPhotos.length > 0 ? `${uploadedPhotos.length} IMAGE ATTACHED` : 'UPLOAD PRODUCT PHOTOS'}
                      </span>
                    </div>
                  </div>

                  <button type="submit" className={styles.submitLuxuryBtn}>
                    SUBMIT TO COLLECTIONS
                  </button>
                </form>
              </main>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>



      {/* RECOMMENDED SECTION */}
      <section className={styles.recommendedSection}>


        <div className={styles.recommendedHeader}>
          <h2 className={styles.recommendedTitle}>Recommended for you</h2>
          <Link href="/collections" className={styles.sizeGuideBtn} style={{ opacity: 1, textDecoration: 'none' }}>View All</Link>
        </div>
        <div className={styles.recommendedGrid}>
          {recommendedProducts.map(rec => (
            <Link href={`/products/${rec.id}`} key={rec.id} className={styles.recommendedCard}>
              <div className={styles.recommendedImageWrapper}>
                <img src={rec.heroImage} alt={rec.name} className={styles.recommendedImage} />
              </div>
              <div className={styles.recommendedInfo}>
                <span className={styles.recName}>{rec.name}</span>
                <span className={styles.recPrice}>{rec.price}</span>
              </div>
            </Link>
          ))}

        </div>
      </section>

      <Footer />
    </main>

  );
}

