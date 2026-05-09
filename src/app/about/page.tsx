import Navbar from '../../components/Navbar';
import Footer from '../../components/home/Footer';
import Image from 'next/image';
import styles from './about.module.css';

export default function AboutPage() {
  return (
    <main className={styles.main}>
      <Navbar />
      
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>Defining the <br /> <span>New Standard</span></h1>
          <p className={styles.subtitle}>
            Daur is more than a label. It is a philosophy of reduction, 
            precision, and the relentless pursuit of the absolute minimum.
          </p>
        </div>
        <div className={styles.heroImageWrapper}>
          <Image 
            src="/download (5).jpg" 
            alt="Daur Studio" 
            fill 
            className={styles.heroImage}
            priority
          />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className={styles.philosophy}>
        <div className={styles.grid}>
          <div className={styles.textBlock}>
            <span className={styles.tag}>Our Vision</span>
            <h2 className={styles.sectionTitle}>Crafted for the <br /> Modern Nomad</h2>
            <p className={styles.text}>
              At the heart of Daur lies a commitment to technical excellence. 
              We blend avant-garde silhouettes with functional performance, 
              creating garments that adapt to the shifting environments of 
              contemporary life.
            </p>
          </div>
          <div className={styles.imageBlock}>
            <div className={styles.sideImage}>
              <Image src="/download (4).jpg" alt="Detail" fill className={styles.image} />
            </div>
            <div className={styles.mainImage}>
              <Image src="/Instagram.jpg" alt="Process" fill className={styles.image} />
            </div>
          </div>
        </div>
      </section>

      {/* Atelier Section */}
      <section className={styles.atelier}>
        <div className={styles.atelierContent}>
          <h2 className={styles.atelierTitle}>The Atelier</h2>
          <div className={styles.atelierGrid}>
             <div className={styles.atelierCard}>
                <div className={styles.cardImage}>
                   <Image src="/download (6).jpg" alt="Atelier" fill className={styles.image} />
                </div>
                <h3>Precision</h3>
                <p>Every seam is a statement. Every stitch is intentional.</p>
             </div>
             <div className={styles.atelierCard}>
                <div className={styles.cardImage}>
                   <Image src="/download (7).jpg" alt="Atelier" fill className={styles.image} />
                </div>
                <h3>Innovation</h3>
                <p>Pushing the boundaries of textile technology and form.</p>
             </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
