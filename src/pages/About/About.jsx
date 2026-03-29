import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { SERVICES } from '../../data/content';
import styles from './About.module.scss';

const TIMELINE = [
  { year: '2020', title: 'Studio Founded', desc: 'Started with a team of 3 passionate animators in Lagos.' },
  { year: '2021', title: 'First Major Project', desc: 'Completed our first animated short film commission.' },
  { year: '2022', title: '100K Followers', desc: 'Our work went viral, reaching audiences across Africa and beyond.' },
  { year: '2023', title: 'Ojuju Calabar', desc: 'Released our award-winning animated short film.' },
  { year: '2024', title: '500K+ Community', desc: 'Half a million followers across all platforms.' },
];

const VALUES = [
  { num: '01', title: 'African Stories', desc: 'We believe in the power of African narratives to inspire and transform. Every project roots itself in authentic storytelling.' },
  { num: '02', title: 'Craft & Detail', desc: 'Every frame matters. We obsess over details — from character expressions to color grading — to deliver excellence.' },
  { num: '03', title: 'Innovation', desc: 'We push the boundaries of 2D animation, blending traditional techniques with modern technology.' },
];

export default function About() {
  const pageRef = useRef(null);
  const [activeService, setActiveService] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero image parallax
      gsap.to(`.${styles.heroImg} img`, {
        yPercent: -12, ease: 'none',
        scrollTrigger: { trigger: `.${styles.heroImg}`, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Timeline items stagger
      gsap.fromTo(`.${styles.timelineItem}`, { x: -30, opacity: 0 }, {
        x: 0, opacity: 1, stagger: 0.15, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.timeline}`, start: 'top 75%' },
      });

      // Service rows stagger
      gsap.fromTo(`.${styles.serviceRow}`, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.06, duration: 0.6, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.services}`, start: 'top 80%' },
      });

      // Value cards
      gsap.fromTo(`.${styles.valueCard}`, { y: 50, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.15, duration: 0.9, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.values}`, start: 'top 75%' },
      });
    }, pageRef);
    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.about} ref={pageRef}>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroGrid}>
          <motion.div className={styles.heroText}
            initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <div className={styles.label}>About Khynetic</div>
            <h1>Crafting stories that <em>move</em> the world</h1>
            <p>Khynetic Studio is a creative animation and illustration studio driven by the power of visual storytelling. We specialize in 2D animation, character design, and narratives that celebrate African culture while pushing creative boundaries.</p>
            <p>From short films to animated features, brand storytelling to music videos — our passionate team brings every frame to life with intention and artistry.</p>
          </motion.div>
          <motion.div className={styles.heroImg}
            initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}>
            <img src="/images/child.jpg" alt="Khynetic character art" />
          </motion.div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className={styles.stats}>
        {[
          { num: '500K+', lbl: 'Followers' },
          { num: '623+', lbl: 'Minutes of Animation' },
          { num: '50+', lbl: 'Projects' },
          { num: '12+', lbl: 'Awards' },
        ].map((s, i) => (
          <div key={s.lbl} className={styles.statCard}>
            <span className={styles.statNum}>{s.num}</span>
            <span className={styles.statLbl}>{s.lbl}</span>
          </div>
        ))}
      </section>

      {/* ═══ TIMELINE ═══ */}
      <section className={styles.timeline}>
        <div className={styles.container}>
          <div className={styles.label}>Our Journey</div>
          <h2>The <em>story</em> so far</h2>
          <div className={styles.timelineTrack}>
            <div className={styles.timelineLine} />
            {TIMELINE.map((t) => (
              <div key={t.year} className={styles.timelineItem}>
                <div className={styles.timelineDot} />
                <div className={styles.timelineYear}>{t.year}</div>
                <div className={styles.timelineContent}>
                  <h4>{t.title}</h4>
                  <p>{t.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ SERVICES ═══ */}
      <section className={styles.services}>
        <div className={styles.container}>
          <div className={styles.label}>What We Do</div>
          <h2>Our <em>services</em></h2>
          <div className={styles.serviceList}>
            {SERVICES.map((s) => (
              <div key={s.num} className={styles.serviceRow}
                onMouseEnter={() => setActiveService(s.num)}
                onMouseLeave={() => setActiveService(null)}>
                <div className={styles.serviceTop}>
                  <span className={styles.serviceNum}>{s.num}</span>
                  <span className={`${styles.serviceName} ${activeService === s.num ? styles.active : ''}`}>{s.title}</span>
                  <span className={`${styles.serviceArrow} ${activeService === s.num ? styles.active : ''}`}>→</span>
                </div>
                <AnimatePresence>
                  {activeService === s.num && (
                    <motion.div className={styles.serviceExpanded}
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}>
                      <div className={styles.serviceExpandedInner}>
                        <p>{s.desc}</p>
                        <div className={styles.servicePreview}>
                          <img src={s.image} alt={s.title} loading="lazy" />
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ VALUES ═══ */}
      <section className={styles.values}>
        <div className={styles.container}>
          <div className={styles.label}>Our Philosophy</div>
          <h2>What drives <em>us</em></h2>
          <div className={styles.valuesGrid}>
            {VALUES.map((v) => (
              <div key={v.num} className={styles.valueCard}>
                <span className={styles.valueNum}>{v.num}</span>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
