import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap, ScrollTrigger } from '../../hooks/useGsap';
import { PROJECTS } from '../../data/content';
import styles from './Home.module.scss';

export default function Home() {
  const homeRef = useRef(null);
  const [showReel, setShowReel] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Parallax hero image
      gsap.to(`.${styles.heroBgImg}`, {
        yPercent: 20, ease: 'none',
        scrollTrigger: { trigger: `.${styles.hero}`, start: 'top top', end: 'bottom top', scrub: true },
      });

      // Hero tagline reveal
      gsap.fromTo(`.${styles.heroTagline}`, { y: 20, opacity: 0 }, {
        y: 0, opacity: 1, duration: 1.2, delay: 1, ease: 'power3.out',
      });

      // Hero scroll indicator
      gsap.to(`.${styles.scrollIndicator}`, {
        y: 8, repeat: -1, yoyo: true, duration: 1.5, ease: 'power1.inOut',
      });

      // About section reveal
      gsap.fromTo(`.${styles.aboutText} > *`, { y: 40, opacity: 0 }, {
        y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.about}`, start: 'top 75%' },
      });

      // About image reveal
      gsap.fromTo(`.${styles.aboutImage}`, { clipPath: 'inset(100% 0 0 0)' }, {
        clipPath: 'inset(0% 0 0 0)', duration: 1.2, ease: 'power3.inOut',
        scrollTrigger: { trigger: `.${styles.about}`, start: 'top 65%' },
      });

      // Showcase parallax
      gsap.to(`.${styles.showcaseImg}`, {
        yPercent: -10, ease: 'none',
        scrollTrigger: { trigger: `.${styles.showcase}`, start: 'top bottom', end: 'bottom top', scrub: true },
      });

      // Chapter reveals
      document.querySelectorAll(`.${styles.chapter}`).forEach((ch) => {
        gsap.fromTo(ch, { y: 60, opacity: 0 }, {
          y: 0, opacity: 1, duration: 1, ease: 'power3.out',
          scrollTrigger: { trigger: ch, start: 'top 80%' },
        });
      });

      // Stats counter animation
      gsap.fromTo(`.${styles.statNumber}`, { textContent: 0 }, {
        duration: 2, ease: 'power2.out',
        scrollTrigger: { trigger: `.${styles.stats}`, start: 'top 80%' },
        snap: { textContent: 1 },
        stagger: 0.3,
      });

      // Stats text
      gsap.fromTo(`.${styles.statsContent}`, { y: 30, opacity: 0 }, {
        y: 0, opacity: 1, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: `.${styles.stats}`, start: 'top 80%' },
      });

      // Marquee text
      gsap.to(`.${styles.marqueeTrack}`, {
        xPercent: -33.333,
        repeat: -1,
        duration: 25,
        ease: 'none',
      });

    }, homeRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className={styles.home} ref={homeRef}>
      {/* ═══ HERO ═══ */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <img src="/images/hero.jpg" alt="" className={styles.heroBgImg} />
          <div className={styles.heroGradient} />
        </div>

        {/* Hero Label */}
        <motion.div
          className={styles.heroLabel}
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className={styles.heroLabelLine} />
          <span>Khynetic Studio — Animation & Visual Storytelling</span>
        </motion.div>

        <motion.div
          className={styles.heroContent}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1>If the world<br/>never stops moving,<br/>neither should <em>we.</em></h1>
        </motion.div>

        <motion.p
          className={styles.heroTagline}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 0, y: 20 }}
        >
          We craft animated stories that celebrate African culture and push creative boundaries.
        </motion.p>

        {/* Scroll indicator */}
        <div className={styles.scrollIndicator}>
          <span className={styles.scrollLine} />
          <span className={styles.scrollLabel}>Scroll</span>
        </div>
      </section>

      {/* ═══ MARQUEE DIVIDER ═══ */}
      <section className={styles.marquee}>
        <div className={styles.marqueeTrack}>
          {[...Array(3)].map((_, i) => (
            <span key={i} className={styles.marqueeItem}>
              2D Animation &nbsp;●&nbsp; Character Design &nbsp;●&nbsp; Visual Development &nbsp;●&nbsp; Illustration &nbsp;●&nbsp; Brand Storytelling &nbsp;●&nbsp; Motion Graphics &nbsp;●&nbsp;
            </span>
          ))}
        </div>
      </section>

      {/* ═══ ABOUT + CHARACTER ART ═══ */}
      <section className={styles.about}>
        <div className={styles.aboutGrid}>
          <div className={styles.aboutText}>
            <span className={styles.sectionLabel}>
              <span className={styles.labelLine} />
              About Us
            </span>
            <h2>Bringing <em>stories</em> to life through the art of animation</h2>
            <p>Khynetic Studio is a creative animation and illustration studio driven by the power of visual storytelling. We specialize in 2D animation, character design, and narratives that celebrate African culture while pushing creative boundaries.</p>
            <p>From short films to animated features, brand storytelling to music videos — our passionate team of animators and illustrators bring every frame to life with intention and artistry.</p>
            <Link to="/about" className="btn-outline">Learn More →</Link>
          </div>
          <div className={styles.aboutImage}>
            <img src="/images/child.jpg" alt="Khynetic character art" loading="lazy" />
          </div>
        </div>
      </section>

      {/* ═══ FULL-WIDTH SHOWCASE (text over art) ═══ */}
      <section className={styles.showcase}>
        <img src="/images/child.jpg" alt="" className={styles.showcaseImg} loading="lazy" />
        <div className={styles.showcaseOverlay} />
        <div className={styles.showcaseContent}>
          <h2>We bring stories to life</h2>
          <p>Over 500,000+ followers trust our vision. 623+ minutes of animation crafted with purpose. Every frame tells a story.</p>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className={styles.stats}>
        <div className={styles.statsContent}>
          <div className={styles.statsGrid}>
            <div className={styles.statItem}>
              <span className={styles.statNumber}>500</span>
              <span className={styles.statSuffix}>K+</span>
              <span className={styles.statLabel}>Followers</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>623</span>
              <span className={styles.statSuffix}>+</span>
              <span className={styles.statLabel}>Minutes of Animation</span>
            </div>
            <div className={styles.statDivider} />
            <div className={styles.statItem}>
              <span className={styles.statNumber}>50</span>
              <span className={styles.statSuffix}>+</span>
              <span className={styles.statLabel}>Projects Delivered</span>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ SHOWREEL ═══ */}
      <section className={styles.reel}>
        <div className={styles.reelHeader}>
          <span className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            Showreel
          </span>
          <h2>Watch our <em>latest</em> work</h2>
        </div>
        <div className={styles.reelCard} onClick={() => setShowReel(true)}>
          <img src="/images/ojuju.jpg" alt="Watch our showreel" loading="lazy" />
          <div className={styles.reelOverlay}>
            <div className={styles.playBtn}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><polygon points="8,5 19,12 8,19"/></svg>
            </div>
            <h3>Watch Our Showreel</h3>
          </div>
        </div>
      </section>

      {/* Showreel modal */}
      <AnimatePresence>
        {showReel && (
          <motion.div className={styles.modal} onClick={() => setShowReel(false)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
            <motion.div className={styles.modalInner} onClick={e => e.stopPropagation()}
              initial={{ scale: 0.9 }} animate={{ scale: 1 }} exit={{ scale: 0.9 }} transition={{ duration: 0.4 }}>
              <iframe src="https://www.youtube.com/embed/IFcNFxJjW2c?autoplay=1&rel=0" width="100%" height="100%" frameBorder="0" allow="autoplay; encrypted-media" allowFullScreen title="Showreel" />
            </motion.div>
            <button className={styles.modalClose} onClick={() => setShowReel(false)}>✕</button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══ FULL-BLEED IMAGE ═══ */}
      <section className={styles.fullBleed}>
        <img src="/images/driving.jpg" alt="Night Drive — animation scene" loading="lazy" />
      </section>

      {/* ═══ PROJECTS AS CHAPTERS ═══ */}
      <section className={styles.chapters}>
        <div className={styles.chaptersHeader}>
          <span className={styles.sectionLabel}>
            <span className={styles.labelLine} />
            Featured Work
          </span>
          <h2>Our <em>stories</em></h2>
        </div>
        {PROJECTS.map((p, i) => (
          <div key={p.id} className={`${styles.chapter} ${i % 2 !== 0 ? styles.reversed : ''}`}>
            <div className={styles.chapterImage}>
              <img src={p.image} alt={p.title} loading="lazy" />
            </div>
            <div className={styles.chapterText}>
              <span className={styles.chapterNum}>{p.chapter}</span>
              <h3>{p.title}</h3>
              <span className={styles.chapterTag}>{p.tag}</span>
              <p>{p.desc}</p>
              <Link to="/portfolio" className="btn-outline">View Project →</Link>
            </div>
          </div>
        ))}
      </section>

      {/* ═══ CTA ═══ */}
      <section className={styles.cta}>
        <div className={styles.ctaBg}>
          <img src="/images/hero.jpg" alt="" />
          <div className={styles.ctaOverlay} />
        </div>
        <div className={styles.ctaContent}>
          <span className={styles.sectionLabel} style={{justifyContent: 'center'}}>
            <span className={styles.labelLine} />
            Get in Touch
          </span>
          <h2>Have a project in <em>mind?</em></h2>
          <p>Let's bring your vision to life through the power of animation and storytelling.</p>
          <div className={styles.ctaBtns}>
            <Link to="/contact" className="btn-primary">Start a Project</Link>
            <Link to="/portfolio" className="btn-outline">View Portfolio</Link>
          </div>
        </div>
      </section>
    </div>
  );
}
