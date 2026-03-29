import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { PROJECTS } from '../../data/content';
import styles from './Portfolio.module.scss';

export default function Portfolio() {
  const pageRef = useRef(null);
  const [lightbox, setLightbox] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      document.querySelectorAll(`.${styles.project}`).forEach((el) => {
        gsap.fromTo(el, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 80%' },
        });
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  const lbIdx = lightbox ? PROJECTS.findIndex(p => p.id === lightbox.id) : -1;
  const goNext = () => { if (lbIdx < PROJECTS.length - 1) setLightbox(PROJECTS[lbIdx + 1]); };
  const goPrev = () => { if (lbIdx > 0) setLightbox(PROJECTS[lbIdx - 1]); };

  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape') setLightbox(null); if (e.key === 'ArrowRight') goNext(); if (e.key === 'ArrowLeft') goPrev(); };
    if (lightbox) window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, lbIdx]);

  return (
    <div className={styles.portfolio} ref={pageRef}>
      <section className={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
          <div className={styles.label}>Our Work</div>
          <h1>Selected <em>projects</em></h1>
          <p className={styles.heroSub}>A showcase of our animation, illustration, and visual storytelling — presented as the stories they are.</p>
        </motion.div>
      </section>

      {/* Editorial project sections — alternating image/text */}
      <section className={styles.projectList}>
        {PROJECTS.map((p, i) => (
          <div key={p.id} className={`${styles.project} ${i % 2 !== 0 ? styles.reversed : ''}`}>
            <div className={styles.projectImage} onClick={() => setLightbox(p)} data-cursor-hover>
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className={styles.projectInfo}>
              <span className={styles.projectChapter}>{p.chapter}</span>
              <h2>{p.title}</h2>
              <span className={styles.projectTag}>{p.tag}</span>
              <p>{p.desc}</p>
              <button className="btn-outline" onClick={() => setLightbox(p)}>View Project →</button>
            </div>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className={styles.cta}>
        <p>Ready to start your project?</p>
        <Link to="/contact" className="btn-primary">Get in Touch</Link>
      </section>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox && (
          <motion.div className={styles.lightbox} onClick={() => setLightbox(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.lbContent} onClick={e => e.stopPropagation()}
              initial={{ scale: 0.92, y: 30 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.92 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}>
              <img src={lightbox.image} alt={lightbox.title} />
              <div className={styles.lbInfo}>
                <span className={styles.lbCounter}>0{lbIdx + 1} / 0{PROJECTS.length}</span>
                <h2>{lightbox.title}</h2>
                <p>{lightbox.desc}</p>
              </div>
              <div className={styles.lbNav}>
                <button onClick={goPrev} disabled={lbIdx === 0}>←</button>
                <button onClick={goNext} disabled={lbIdx === PROJECTS.length - 1}>→</button>
              </div>
            </motion.div>
            <button className={styles.lbClose} onClick={() => setLightbox(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
