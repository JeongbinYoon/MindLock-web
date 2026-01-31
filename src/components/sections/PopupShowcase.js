'use client';

import { useState } from 'react';
import { CheckCircle2 } from 'lucide-react';
import styles from './PopupShowcase.module.css';
import { useLanguage } from '../providers/LanguageProvider';
import ExtensionMockup from '../features/ExtensionMockup';
import Button from '../ui/Button';

export default function PopupShowcase() {
  const { t } = useLanguage();
  const [isDemoActive, setIsDemoActive] = useState(false);

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

          <div style={{ marginTop: '2.5rem' }}>
            {!isDemoActive ? (
               <Button onClick={() => setIsDemoActive(true)} variant="primary">
                 {t.popup.tryDemo}
               </Button>
            ) : (
               <Button onClick={() => setIsDemoActive(false)} variant="secondary" style={{ padding: '0.8rem 1.5rem'}}>
                 {t.extension.stop || "Close Demo"}
               </Button>
            )}
          </div>
        </div>

        {/* Right: Tilted Mockup or Interactive Demo */}
        <div className={styles.imageWrapper}>
          {isDemoActive ? (
            <div style={{ display: 'flex', justifyContent: 'center', filter: 'drop-shadow(0 20px 30px rgba(0,0,0,0.2))' }}>
              <ExtensionMockup />
            </div>
          ) : (
            <div className={styles.mockup}>
              {/* Using the generated artifact image. In a real scenario, this would be a real screenshot */}
              <img 
                src="/assets/popup_mockup.png" 
                alt="MindLock Extension Popup Interface" 
                className={styles.mockupImage}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
