'use client';

import { CheckCircle2 } from 'lucide-react';
import styles from './PopupShowcase.module.css';
import { useLanguage } from '../providers/LanguageProvider';

export default function PopupShowcase() {
  const { t } = useLanguage();

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left: Content */}
        <div className={styles.content}>
          <span className={styles.label}>{t.popup.label}</span>
          <h2 className={styles.title}>
            {t.popup.titlePrefix}<br />
            <span style={{ color: '#818cf8' }}>{t.popup.titleHighlight}</span>
          </h2>
          <p className={styles.description}>
            {t.popup.description}
          </p>

          <div className={styles.featureList}>
            {t.popup.features.map((item, idx) => (
              <div key={idx} className={styles.featureItem}>
                <CheckCircle2 size={20} color="#818cf8" />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Tilted Mockup */}
        <div className={styles.imageWrapper}>
          <div className={styles.mockup}>
            {/* Using the generated artifact image. In a real scenario, this would be a real screenshot */}
            <img 
              src="/assets/popup_mockup.png" 
              alt="MindLock Extension Popup Interface" 
              className={styles.mockupImage}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
