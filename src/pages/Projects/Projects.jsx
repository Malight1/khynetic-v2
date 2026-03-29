import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { VIDEOS, YOUTUBE_CHANNEL } from '../../data/content';
import styles from './Projects.module.scss';

const PROCESS = [
  { num: '01', title: 'Concept', desc: 'Brief, research & creative direction' },
  { num: '02', title: 'Storyboard', desc: 'Shot planning & visual scripting' },
  { num: '03', title: 'Design', desc: 'Character & environment design' },
  { num: '04', title: 'Animation', desc: 'Frame-by-frame production' },
  { num: '05', title: 'Compositing', desc: 'Color, effects & sound design' },
  { num: '06', title: 'Delivery', desc: 'Final render & delivery' },
];

export default function Projects() {
  const [activeVideo, setActiveVideo] = useState(null);
  const pageRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(`.${styles.videoCard}`, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.7, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.videoGrid}`, start: 'top 80%' },
      });
      gsap.fromTo(`.${styles.processStep}`, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.08, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.process}`, start: 'top 80%' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.projects} ref={pageRef}>
      {/* Hero */}
      <section className={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
          <div className={styles.label}>From Our Studio</div>
          <h1>Watch our <em>projects</em></h1>
          <p className={styles.heroSub}>Animated films, reels, and behind-the-scenes content.</p>
        </motion.div>
      </section>

      {/* Featured video */}
      <section className={styles.featured}>
        <div className={styles.container}>
          <div className={styles.featuredCard} onClick={() => setActiveVideo(VIDEOS[0].id)}>
            <img src={`https://img.youtube.com/vi/${VIDEOS[0].id}/maxresdefault.jpg`} alt={VIDEOS[0].title} />
            <div className={styles.featuredOverlay}>
              <div className={styles.playBtn}>
                <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 19,12 8,19"/></svg>
              </div>
              <h3>{VIDEOS[0].title}</h3>
              <p>{VIDEOS[0].desc}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Video grid */}
      <section className={styles.more}>
        <div className={styles.container}>
          <h2>More from <em>Khynetic</em></h2>
          <div className={styles.videoGrid}>
            {VIDEOS.slice(1).map((v) => (
              <div key={v.id} className={styles.videoCard} onClick={() => setActiveVideo(v.id)}>
                <div className={styles.videoThumb}>
                  <img src={`https://img.youtube.com/vi/${v.id}/hqdefault.jpg`} alt={v.title} loading="lazy" />
                  <div className={styles.videoPlay}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 19,12 8,19"/></svg>
                  </div>
                </div>
                <div className={styles.videoInfo}>
                  <h4>{v.title}</h4>
                  <p>{v.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className={styles.process}>
        <div className={styles.container}>
          <div className={styles.label}>How We Work</div>
          <h2>Our <em>process</em></h2>
          <div className={styles.processGrid}>
            {PROCESS.map((s) => (
              <div key={s.num} className={styles.processStep}>
                <span className={styles.processNum}>{s.num}</span>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subscribe CTA */}
      <section className={styles.subscribe}>
        <div className={styles.container}>
          <h2>Subscribe to our channel</h2>
          <p>Get notified when we release new animations, behind-the-scenes content, and tutorials.</p>
          <a href={YOUTUBE_CHANNEL} target="_blank" rel="noopener noreferrer" className="btn-primary">Subscribe on YouTube →</a>
        </div>
      </section>

      {/* Modal */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div className={styles.modal} onClick={() => setActiveVideo(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modalInner} onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} transition={{ duration: 0.4 }}>
              <iframe src={`https://www.youtube.com/embed/${activeVideo}?autoplay=1&rel=0`} width="100%" height="100%" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title="Video" />
            </motion.div>
            <button className={styles.modalClose} onClick={() => setActiveVideo(null)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
