import styles from '../../app/home.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerTop}>
        <div className={styles.footerCol}>
          <div className={styles.footerLogo}>DAUR</div>
          <p style={{ fontSize: '0.8rem', color: '#7a7a7a', lineHeight: 1.6, maxWidth: '220px' }}>
            High-end luxury fashion House inspired by Himalayan heritage and modern silhouettes.
          </p>
        </div>
        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Collections</h4>
          <a href="/collections" className={styles.footerLink}>Main Collection</a>
          <a href="/active" className={styles.footerLink}>Daur Active</a>
          <a href="/labs" className={styles.footerLink}>Daur Labs</a>
        </div>
        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Brand</h4>
          <a href="/about" className={styles.footerLink}>Our Story</a>
          <a href="#" className={styles.footerLink}>Sustainability</a>
          <a href="#" className={styles.footerLink}>Journal</a>
        </div>

        <div className={styles.footerCol}>
          <h4 className={styles.footerTitle}>Inquiries</h4>
          <div style={{ display: 'flex', borderBottom: '1px solid #1a1a1a', paddingBottom: '0.8rem', marginTop: '1rem' }}>
            <input
              type="email"
              placeholder="EMAIL ADDRESS"
              style={{ border: 'none', outline: 'none', width: '100%', fontFamily: 'inherit', fontSize: '0.8rem', letterSpacing: '1px' }}
            />
            <button style={{ background: 'none', border: 'none', cursor: 'pointer' }}>→</button>
          </div>
        </div>
      </div>
      <div className={styles.footerBottom}>
        <span>© 2026 DAUR INTERNATIONALE. ALL RIGHTS RESERVED.</span>
        <div style={{ display: 'flex', gap: '2rem' }}>
          <span>PRIVACY</span>
          <span>TERMS</span>
          <span>COOKIE POLICY</span>
        </div>
      </div>
    </footer>
  );
}
