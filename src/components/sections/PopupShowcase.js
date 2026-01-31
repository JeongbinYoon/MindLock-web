'use client';

import { useState } from 'react';
import { CheckCircle2, Lock, Star, Puzzle, MoreVertical, Search, Youtube, Instagram, Facebook } from 'lucide-react';
import styles from './PopupShowcase.module.css';
import { useLanguage } from '../providers/LanguageProvider';
import ExtensionMockup from '../features/ExtensionMockup';
import Button from '../ui/Button';

export default function PopupShowcase() {
  const { t } = useLanguage();
  const [isPopupOpen, setIsPopupOpen] = useState(true);
  const [extStatus, setExtStatus] = useState('idle');
  const [activePage, setActivePage] = useState('newtab'); // 'newtab', 'google', 'youtube', 'instagram', 'facebook'

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
          <div style={{ marginTop: '2.5rem' }}>
             <p style={{ 
                color: '#4ade80', 
                fontWeight: '700', 
                fontSize: '1.2rem',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                marginBottom: '0.5rem'
             }}>
                {t.popup.simulationTitle}
             </p>
             <p 
                style={{ fontSize: '0.95rem', color: '#6b7280', lineHeight: '1.5' }}
                dangerouslySetInnerHTML={{ __html: t.popup.simulationDesc }}
             />
          </div>
          </div>
        </div>

        {/* Right: Tilted Mockup or Interactive Demo */}
        <div className={styles.imageWrapper}>
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
                        <span className={styles.urlText} style={{marginLeft:'8px', fontSize:'13px'}}>
                           {activePage === 'newtab' ? 'mindlock.app' : 
                            activePage === 'google' ? 'google.com' :
                            activePage === 'tiktok' ? 'tiktok.com' :
                            activePage === 'youtube' ? 'youtube.com' : 'instagram.com'}
                        </span>
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
                     <div className={styles.pagePlaceholder}>
                        <div style={{ 
                           position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
                           display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                           background: activePage === 'newtab' ? 'transparent' : '#f9fafb'
                        }}>
                           {activePage === 'newtab' && (
                              <>
                                 <div style={{ marginBottom: '30px' }}>
                                    <h1 style={{ fontSize: '28px', fontWeight: '800', color: '#111827', marginBottom: '8px', letterSpacing: '-0.5px' }}>MindLock</h1>
                                    <p 
                                       style={{ fontSize: '15px', color: '#4b5563', lineHeight: '1.4' }}
                                       dangerouslySetInnerHTML={{ __html: t.popup.browser.tagline }}
                                    />
                                 </div>
                                 
                                 {/* Search Bar Mock */}
                                 <div style={{
                                    width: '100%', maxWidth: '300px', margin: '0 auto 30px auto',
                                    background: 'white', borderRadius: '24px', padding: '10px 16px',
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05), 0 0 0 1px #e5e7eb',
                                    cursor: 'text'
                                 }}>
                                    <Search size={16} color="#9ca3af" />
                                    <span style={{ fontSize: '13px', color: '#9ca3af' }}>{t.popup.browser.searchPlaceholder}</span>
                                 </div>

                                 {/* Shortcuts Mock */}
                                 <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                                    {/* Google */}
                                    <div onClick={(e) => { e.stopPropagation(); setActivePage('google'); }} style={{
                                       width: '40px', height: '40px', borderRadius: '50%', background: 'white',
                                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                                       boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer'
                                    }}>
                                       <span style={{ fontSize: '18px', fontWeight: 'bold', background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>G</span>
                                    </div>
                                    
                                    {/* YouTube - Distraction */}
                                    <div onClick={(e) => { e.stopPropagation(); setActivePage('youtube'); }} style={{
                                       width: '40px', height: '40px', borderRadius: '50%', background: 'white',
                                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                                       boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer',
                                       position: 'relative'
                                    }}>
                                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="#FF0000"/>
                                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
                                       </svg>
                                       <div style={{
                                          position: 'absolute', bottom: '-6px', right: '-6px',
                                          width: '18px', height: '18px', borderRadius: '50%',
                                          background: '#ef4444', border: '2px solid white',
                                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                       }}>
                                          <Lock size={10} color="white" />
                                       </div>
                                    </div>

                                    {/* Instagram - Distraction */}
                                    <div onClick={(e) => { e.stopPropagation(); setActivePage('instagram'); }} style={{
                                       width: '40px', height: '40px', borderRadius: '50%', background: 'white',
                                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                                       boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer',
                                       position: 'relative'
                                    }}>
                                        <Instagram size={20} color="#E1306C" />
                                        <div style={{
                                          position: 'absolute', bottom: '-6px', right: '-6px',
                                          width: '18px', height: '18px', borderRadius: '50%',
                                          background: '#ef4444', border: '2px solid white',
                                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                                       }}>
                                          <Lock size={10} color="white" />
                                       </div>
                                    </div>
                                    
                                    {/* TikTok */}
                                    <div onClick={(e) => { e.stopPropagation(); setActivePage('tiktok'); }} style={{
                                       width: '40px', height: '40px', borderRadius: '50%', background: 'white',
                                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                                       boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer'
                                    }}>
                                       <svg width="20" height="20" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                       </svg>
                                    </div>
                                 </div>
                              </>
                           )}

                           {/* Unlocked Page Mock */}
                           {((activePage !== 'newtab' && (activePage === 'google' || activePage === 'tiktok')) || 
                             ((activePage === 'youtube' || activePage === 'instagram') && extStatus === 'idle')) && (
                              <div style={{ textAlign: 'center' }}>
                                 {activePage === 'google' ? (
                                    <>
                                       <span style={{ fontSize: '40px', fontWeight: 'bold', background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display:'block', marginBottom:'20px' }}>Google</span>
                                       <div style={{ width: '200px', height: '30px', borderRadius: '15px', border: '1px solid #ddd', margin: '0 auto' }} />
                                    </>
                                 ) : activePage === 'tiktok' ? (
                                    <div style={{ width: '100%', height: '100%', display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
                                       <h2 style={{color: '#000000', fontWeight:'bold', fontSize:'24px', fontFamily:'sans-serif'}}>TikTok</h2>
                                       <div style={{ width: '120px', height: '180px', background: '#eee', borderRadius: '8px' }} />
                                    </div>
                                 ) : activePage === 'youtube' ? (
                                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
                                       <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                          <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" fill="#FF0000"/>
                                          <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="white"/>
                                       </svg>
                                       <h2 style={{color: '#282828', fontWeight:'bold', fontSize:'22px'}}>YouTube</h2>
                                       <div style={{ width: '250px', height: '140px', background: '#eee', borderRadius: '12px', marginTop:'10px' }} />
                                    </div>
                                 ) : (
                                    <div style={{ display:'flex', flexDirection:'column', alignItems:'center', gap:'10px' }}>
                                       <Instagram size={40} color="#E1306C" />
                                       <h2 style={{color: '#262626', fontWeight:'bold', fontSize:'22px'}}>Instagram</h2>
                                       <div style={{ width: '200px', height: '200px', background: '#eee', borderRadius: '4px', marginTop:'10px' }} />
                                    </div>
                                 )}
                                 <button onClick={(e) => { e.stopPropagation(); setActivePage('newtab'); }} style={{ marginTop: '40px', padding: '5px 10px', fontSize: '11px', background:'#eee', border:'none', borderRadius:'4px', cursor: 'pointer' }}>{t.popup.browser.backButton}</button>
                              </div>
                           )}

                           {/* Blocked Page Mock (YouTube/Instagram) - ONLY IF ACTIVE */}
                           {(activePage === 'youtube' || activePage === 'instagram') && extStatus !== 'idle' && (
                              <div style={{ 
                                 width: '100%', height: '100%', background: '#111827', 
                                 display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
                                 color: 'white', textAlign: 'center'
                              }}>
                                 <div style={{ 
                                    width: '60px', height: '60px', borderRadius: '50%', background: 'rgba(239, 68, 68, 0.2)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px'
                                 }}>
                                    <Lock size={30} color="#ef4444" />
                                 </div>
                                 <h2 style={{ fontSize: '18px', fontWeight: 'bold', marginBottom: '8px' }}>{t.popup.browser.siteBlockedTitle}</h2>
                                 <p 
                                    style={{ fontSize: '13px', color: '#9ca3af', marginBottom: '20px' }}
                                    dangerouslySetInnerHTML={{ __html: t.popup.browser.siteBlockedDesc.replace('{site}', activePage === 'youtube' ? 'YouTube' : 'Instagram') }}
                                 />
                                 <button onClick={(e) => { e.stopPropagation(); setActivePage('newtab'); }} style={{ 
                                    padding: '8px 16px', background: 'white', color: 'black', 
                                    border: 'none', borderRadius: '6px', fontSize: '12px', fontWeight: 'bold',
                                    cursor: 'pointer'
                                 }}>
                                    {t.popup.browser.backButton}
                                 </button>
                              </div>
                           )}
                        </div>
                     </div>
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
        </div>
      </div>
    </section>
  );
}
