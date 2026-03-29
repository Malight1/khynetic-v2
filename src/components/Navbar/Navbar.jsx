import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styles from './Navbar.module.scss';
import submarkSvg from '../../assets/KHYNETIC SUBMARK SVG.svg';

const LINKS = [
  { label: 'Home', path: '/' },
  { label: 'About', path: '/about' },
  { label: 'Portfolio', path: '/portfolio' },
  { label: 'Projects', path: '/projects' },
  { label: 'Contact', path: '/contact' },
];

export default function Navbar() {
  const location = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const h = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', h, { passive: true });
    return () => window.removeEventListener('scroll', h);
  }, []);

  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        {/* Left: Logo */}
        <Link to="/" className={styles.logo}>
          <img
            src={submarkSvg}
            alt="Khynetic Studio"
            className={styles.logoImg}
          />
          <span className={styles.logoText}>KHYNETIC</span>
        </Link>

        {/* Center: Desktop nav links */}
        <div className={styles.desktopLinks}>
          {LINKS.map((l) => (
            <Link
              key={l.path}
              to={l.path}
              className={`${styles.navLink} ${location.pathname === l.path ? styles.activeLink : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        {/* Right: CTA + Burger */}
        <div className={styles.navRight}>
          <Link to="/contact" className={styles.navCta}>
            Let's Talk
          </Link>
          <button className={`${styles.burger} ${open ? styles.open : ''}`} onClick={() => setOpen(!open)} aria-label="Menu">
            <span /><span /><span />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className={styles.overlay}
            initial={{ clipPath: 'circle(0% at calc(100% - 3rem) 2rem)' }}
            animate={{ clipPath: 'circle(150% at calc(100% - 3rem) 2rem)', transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] } }}
            exit={{ clipPath: 'circle(0% at calc(100% - 3rem) 2rem)', transition: { duration: 0.5, ease: [0.7, 0, 0.84, 0] } }}
          >
            <div className={styles.overlayContent}>
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.path}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + i * 0.06, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    to={l.path}
                    className={`${styles.overlayLink} ${location.pathname === l.path ? styles.active : ''}`}
                  >
                    <span className={styles.overlayNum}>0{i + 1}</span>
                    <span>{l.label}</span>
                  </Link>
                </motion.div>
              ))}
            </div>
            <div className={styles.overlayFooter}>
              <span>hello@khyneticstudio.com</span>
              <span>Lagos, Nigeria</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
