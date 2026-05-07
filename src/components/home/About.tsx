import styles from '../../app/home.module.css';

export default function About() {
  return (
    <section className={styles.about}>
      <div className={styles.aboutContent}>
        <h4 className={styles.aboutTitle}>Our Philosophy</h4>
        <p className={styles.aboutText}>
          Rejecting the superfluous to find beauty in the absolute minimum.
          Luxury redefined through reduction, precision, and craft.
        </p>
        <button className={styles.btn}>The Atelier Story</button>
      </div>
    </section>
  );
}
