'use client';

import { useState } from 'react';
import { CheckCircle2, Lock, Star, Puzzle, MoreVertical } from 'lucide-react';
import styles from './PopupShowcase.module.css';
import { useLanguage } from '../providers/LanguageProvider';
import ExtensionMockup from '../features/ExtensionMockup';
import Button from '../ui/Button';

export default function PopupShowcase() {
  const { t } = useLanguage();
  const [isDemoActive, setIsDemoActive] = useState(false);
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [extStatus, setExtStatus] = useState('idle');

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
               <Button onClick={() => { setIsDemoActive(true); setIsPopupOpen(true); }} variant="primary">
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
            <div className={styles.mockup} style={{ background: 'transparent', border: 'none', padding: 0 }}>
               <div className={styles.browserWindow}>
                  {/* Browser Header */}
                  <div className={styles.browserHeader}>
                     <div className={styles.trafficLights}>
                        <div className={`${styles.trafficLight} ${styles.closeLight}`} />
                        <div className={`${styles.trafficLight} ${styles.minimizeLight}`} />
                        <div className={`${styles.trafficLight} ${styles.maximizeLight}`} />
                     </div>
                     
                     <div className={styles.addressBar}>
                        <Lock size={14} color="#6b7280" />
                        <span className={styles.urlText} style={{marginLeft:'8px', fontSize:'13px'}}>mindlock.app</span>
                        <Star size={18} color="#6b7280" style={{fill: 'none', cursor:'pointer'}} />
                     </div>

                     <div className={styles.toolbarActions}>
                        {/* MindLock Icon */}
                        <div 
                           className={`${styles.mindlockIconWrapper} ${isPopupOpen ? styles.mindlockIconWrapperActive : ''}`} 
                           title="MindLock"
                           onClick={() => setIsPopupOpen(!isPopupOpen)}
                           style={{cursor: 'pointer'}}
                        >
                           <img src="/assets/logo64.png" alt="MindLock" style={{width:'20px', height:'20px'}} />
                           {extStatus !== 'idle' && (
                              <div style={{
                                 position: 'absolute',
                                 bottom: '0px',
                                 right: '0px',
                                 background: '#4ade80',
                                 color: '#000000',
                                 fontSize: '9px',
                                 fontWeight: '800',
                                 padding: '3px',
                                 borderRadius: '4px',
                                 lineHeight: '1',
                                 fontFamily: 'sans-serif',
                                 boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                              }}>
                                 ON
                              </div>
                           )}
                           {!isPopupOpen && (
                              <div className={styles.clickHint}>
                                 Click!
                              </div>
                           )}
                        </div>
                        
                        {/* Extensions Icon */}
                        <div className={styles.iconButton} title="Extensions">
                           <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5f6368" strokeWidth="1.5" xmlns="http://www.w3.org/2000/svg">
                             <path d="M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z" />
                           </svg>
                        </div>
                        
                        <div style={{width:'1px', height:'24px', background:'#e5e7eb', margin:'0 2px'}} />
                        
                        {/* Profile & Menu */}
                        <div className={styles.profileAvatar} title="Google Account">
                           Y
                        </div>
                        <div className={styles.iconButton} title="Menu">
                           <MoreVertical size={20} strokeWidth={1.5} />
                        </div>
                     </div>
                  </div>
                  
                  {/* Browser Content */}
                  <div className={styles.browserContent} onClick={() => setIsPopupOpen(false)}>
                     <div className={styles.pagePlaceholder} />
                     <div 
                        className={styles.popupWrapper} 
                        style={{ display: isPopupOpen ? 'block' : 'none' }}
                     >
                        <div onClick={(e) => e.stopPropagation()}>
                           <ExtensionMockup onStatusChange={setExtStatus} />
                        </div>
                     </div>
                  </div>
               </div>
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
