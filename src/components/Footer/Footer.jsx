import { Link } from 'react-router-dom';
import { SOCIALS } from '../../data/content';
import styles from './Footer.module.scss';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.watermark}>KHYNETIC</div>
      <div className={styles.inner}>
        <div className={styles.left}>
          <p className={styles.tagline}>Crafting visual stories that bring African narratives to the world.</p>
          <p className={styles.email}>Contact@khyneticstudio.com</p>
          <p className={styles.location}>www.khynetic studio.com</p>
        </div>
        <div className={styles.cols}>
          <div className={styles.col}>
            <h4>Navigate</h4>
            {['/', '/about', '/portfolio', '/projects', '/contact'].map(p => (
              <Link key={p} to={p}>{p === '/' ? 'Home' : p.slice(1).charAt(0).toUpperCase() + p.slice(2)}</Link>
            ))}
          </div>
          <div className={styles.col}>
            <h4>Connect</h4>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
        </div>
      </div>
      <div className={styles.bottom}>
        <span>© 2026 Khynetic Studio. All rights reserved.</span>
      </div>
    </footer>
  );
}
