import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SOCIALS } from '../../data/content';
import styles from './Contact.module.scss';

const FAQS = [
  { q: 'What is your typical project timeline?', a: 'Most projects take 4–12 weeks depending on scope and complexity. Short-form content like social media animations can be turned around in 1–2 weeks.' },
  { q: 'What are your rates?', a: 'We provide custom quotes based on project scope, complexity, and timeline. Get in touch and we\'ll put together a detailed proposal.' },
  { q: 'Do you work with international clients?', a: 'Yes! We work with clients worldwide. Our team is based in Lagos, Nigeria, but we collaborate remotely with brands and studios across Africa, Europe, and North America.' },
  { q: 'What software do you use?', a: 'We primarily use Toon Boom Harmony, Adobe Animate, After Effects, and Procreate. Our pipeline is flexible and adapts to each project\'s needs.' },
];

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [focused, setFocused] = useState(null);
  const [sent, setSent] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  const handleSubmit = (e) => { e.preventDefault(); setSent(true); setTimeout(() => setSent(false), 4000); };

  return (
    <div className={styles.contact}>
      <section className={styles.hero}>
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.9 }}>
          <div className={styles.label}>Get in Touch</div>
          <h1>Let's create something <em>extraordinary</em></h1>
        </motion.div>
      </section>

      {/* Split: info + form */}
      <section className={styles.main}>
        <motion.div className={styles.info}
          initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}>
          <p className={styles.infoDesc}>Whether it's animation, illustration, or a full creative production — we'd love to bring your vision to life.</p>
          <div className={styles.infoBlock}>
            <h4>Email</h4>
            <p>Contact@khyneticstudio.com</p>
          </div>
          <div className={styles.infoBlock}>
            <h4>Location</h4>
            <p>Lagos, Nigeria</p>
          </div>
          <div className={styles.infoBlock}>
            <h4>Availability</h4>
            <p>Open for commissions</p>
          </div>
          <div className={styles.socials}>
            {SOCIALS.map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer">{s.label}</a>
            ))}
          </div>
        </motion.div>

        <motion.form className={styles.form} onSubmit={handleSubmit}
          initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}>
          <div className={styles.field}>
            <label className={focused === 'name' ? styles.focused : ''}>Your Name</label>
            <input type="text" placeholder="John Doe" value={form.name}
              onChange={e => setForm(p => ({...p, name: e.target.value}))}
              onFocus={() => setFocused('name')} onBlur={() => setFocused(null)} />
          </div>
          <div className={styles.field}>
            <label className={focused === 'email' ? styles.focused : ''}>Email Address</label>
            <input type="email" placeholder="john@example.com" value={form.email}
              onChange={e => setForm(p => ({...p, email: e.target.value}))}
              onFocus={() => setFocused('email')} onBlur={() => setFocused(null)} />
          </div>
          <div className={styles.field}>
            <label className={focused === 'message' ? styles.focused : ''}>About Your Project</label>
            <textarea placeholder="Describe your project, timeline, and budget..." rows={6} value={form.message}
              onChange={e => setForm(p => ({...p, message: e.target.value}))}
              onFocus={() => setFocused('message')} onBlur={() => setFocused(null)} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            {sent ? '✓ Message Sent!' : 'Send Message'}
          </button>
        </motion.form>
      </section>

      {/* FAQ */}
      <section className={styles.faq}>
        <div className={styles.container}>
          <h2>Frequently Asked <em>Questions</em></h2>
          <div className={styles.faqList}>
            {FAQS.map((f, i) => (
              <div key={i} className={styles.faqItem}>
                <button className={styles.faqQ} onClick={() => setOpenFaq(openFaq === i ? null : i)}>
                  <span>{f.q}</span>
                  <motion.span className={styles.faqIcon} animate={{ rotate: openFaq === i ? 180 : 0 }} transition={{ duration: 0.3 }}>▾</motion.span>
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div className={styles.faqA}
                      initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>
                      <p>{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
