'use client';

import { useState } from 'react';
import { CheckCircle2, Lock, Star, Puzzle, MoreVertical, Search, Youtube, Instagram, Facebook, History, ArrowLeft, XCircle } from 'lucide-react';
import styles from './PopupShowcase.module.css';
import { useLanguage } from '../providers/LanguageProvider';
import ExtensionMockup from '../features/ExtensionMockup';
import Button from '../ui/Button';

export default function PopupShowcase() {
  const { t } = useLanguage();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [extStatus, setExtStatus] = useState('idle');
  const [activePage, setActivePage] = useState('newtab'); // 'newtab', 'google', 'youtube', 'instagram', 'facebook'
  const [isFlipped, setIsFlipped] = useState(false);
  const [blockHistory, setBlockHistory] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [centerInput, setCenterInput] = useState('');
  const [addressInput, setAddressInput] = useState('');
  const [isAddressBarFocused, setIsAddressBarFocused] = useState(false);

  const handleSearch = (e) => {
     if (e.key === 'Enter') {
        setSearchQuery(e.target.value);
        setActivePage('google');
        e.target.blur();
        setIsAddressBarFocused(false);
     }
  };

  const handlePageNavigation = (page) => {
    setActivePage(page);
    // If navigating to a blocked site while active, log it
    if (extStatus !== 'idle' && (page === 'youtube' || page === 'google' || page === 'tiktok')) {
       const now = new Date();
       const timeId = Date.now();
       const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false });
       setBlockHistory(prev => [{ id: timeId, site: page, time: timeStr }, ...prev]);
    }
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        {/* Left: Content */}
        <div id="simulation" className={styles.content}>
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
               
               <div className={styles.flipContainer}>
                  <div className={`${styles.flipper} ${isFlipped ? styles.flipped : ''}`}>
                     {/* Front Face: Interactive Browser */}
                     <div className={styles.front}>
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
                        <input
                           type="text"
                           className={styles.urlText}
                           style={{
                               marginLeft:'8px', fontSize:'13px', border:'none', outline:'none', 
                               background:'transparent', width:'100%', color:'#1f2937'
                           }}
                           value={
                               isAddressBarFocused ? addressInput :
                               activePage === 'newtab' ? 'mindlock.app' : 
                               activePage === 'google' ? `google.com/search?q=${searchQuery}` :
                               activePage === 'tiktok' ? 'tiktok.com' :
                               activePage === 'youtube' ? 'youtube.com' : 'instagram.com'
                           }
                           onChange={(e) => setAddressInput(e.target.value)}
                           onKeyDown={handleSearch}
                           onFocus={() => { setIsAddressBarFocused(true); setAddressInput(searchQuery); }}
                           onBlur={() => setIsAddressBarFocused(false)}
                           spellCheck={false}
                        />
                        <Star size={18} color="#6b7280" style={{fill: 'none', cursor:'pointer', flexShrink:0}} />
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
                                    background: 'white', borderRadius: '24px', padding: '0 16px',
                                    display: 'flex', alignItems: 'center', gap: '10px',
                                    boxShadow: '0 2px 5px rgba(0,0,0,0.05), 0 0 0 1px #e5e7eb',
                                    height: '46px'
                                 }}>
                                    <Search size={16} color="#9ca3af" style={{flexShrink:0}} />
                                    <input 
                                       type="text"
                                       placeholder={t.popup.browser.searchPlaceholder}
                                       value={centerInput}
                                       onChange={(e) => setCenterInput(e.target.value)}
                                       onKeyDown={handleSearch}
                                       style={{
                                          border:'none', outline:'none', fontSize:'14px', color:'#1f2937', 
                                          width:'100%', height:'100%', background:'transparent'
                                       }}
                                    />
                                 </div>

                                 {/* Shortcuts Mock */}
                                 <div style={{ display: 'flex', justifyContent: 'center', gap: '24px' }}>
                                    {/* Google - Distraction */}
                                    <div onClick={(e) => { e.stopPropagation(); handlePageNavigation('google'); }} style={{
                                       width: '40px', height: '40px', borderRadius: '50%', background: 'white',
                                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                                       boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer',
                                       position: 'relative'
                                    }}>
                                       <span style={{ fontSize: '18px', fontWeight: 'bold', background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>G</span>
                                       <div style={{
                                          position: 'absolute', bottom: '-5px', right: '-5px',
                                          width: '22px', height: '22px', borderRadius: '50%',
                                          background: '#ef4444', border: '2px solid white',
                                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                       }}>
                                          <Lock size={12} color="white" />
                                       </div>
                                    </div>
                                    
                                    {/* YouTube - Distraction */}
                                    <div onClick={(e) => { e.stopPropagation(); handlePageNavigation('youtube'); }} style={{
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
                                          position: 'absolute', bottom: '-7px', right: '-7px',
                                          width: '22px', height: '22px', borderRadius: '50%',
                                          background: '#ef4444', border: '2px solid white',
                                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                                          boxShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                       }}>
                                          <Lock size={12} color="white" />
                                       </div>
                                    </div>

                                    {/* Instagram - Unblocked */}
                                    <div onClick={(e) => { e.stopPropagation(); handlePageNavigation('instagram'); }} style={{
                                       width: '40px', height: '40px', borderRadius: '50%', background: 'white',
                                       display: 'flex', alignItems: 'center', justifyContent: 'center',
                                       boxShadow: '0 1px 3px rgba(0,0,0,0.1)', cursor: 'pointer'
                                    }}>
                                        <Instagram size={20} color="#E1306C" />
                                    </div>
                                    
                                    {/* TikTok */}
                                    <div onClick={(e) => { e.stopPropagation(); handlePageNavigation('tiktok'); }} style={{
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
                           {((activePage !== 'newtab' && activePage === 'instagram') || 
                             ((activePage === 'youtube' || activePage === 'google' || activePage === 'tiktok') && extStatus === 'idle')) && (
                              <div style={{ textAlign: 'center' }}>
                                 {activePage === 'google' ? (
                                    <>
                                       <span style={{ fontSize: '36px', fontWeight: 'bold', background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', display:'block', marginBottom:'20px' }}>Google</span>
                                       
                                       <div style={{ 
                                          width: '100%', maxWidth:'300px', height: '36px', borderRadius: '18px', 
                                          border: '1px solid #dfe1e5', margin: '0 auto 20px auto',
                                          display: 'flex', alignItems: 'center', padding: '0 15px', gap: '8px',
                                          boxShadow: '0 1px 6px rgba(32,33,36,.28)', background:'white'
                                       }}>
                                          <Search size={14} color="#9aa0a6" />
                                          <span style={{ fontSize:'14px', color:'#202124', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'nowrap' }}>
                                             {searchQuery || "MindLock"}
                                          </span>
                                       </div>

                                       <div style={{ width: '100%', maxWidth:'280px', margin:'0 auto', textAlign:'left' }}>
                                          <div style={{ height:'14px', width:'150px', background:'#e0e7ff', borderRadius:'4px', marginBottom:'6px' }} />
                                          <div style={{ height:'10px', width:'100%', background:'#f3f4f6', borderRadius:'4px', marginBottom:'4px' }} />
                                          <div style={{ height:'10px', width:'90%', background:'#f3f4f6', borderRadius:'4px', marginBottom:'4px' }} />
                                       </div>
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

                           {/* Blocked Page Mock (YouTube/Google/TikTok) - ONLY IF ACTIVE */}
                           {(activePage === 'youtube' || activePage === 'google' || activePage === 'tiktok') && extStatus !== 'idle' && (
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
                                    dangerouslySetInnerHTML={{ __html: t.popup.browser.siteBlockedDesc.replace('{site}', activePage === 'youtube' ? 'YouTube' : activePage === 'tiktok' ? 'TikTok' : 'Google') }}
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
                         
                         {/* View History Button */}
                         <div 
                            className={styles.viewHistoryBtn}
                            onClick={(e) => { e.stopPropagation(); setIsFlipped(true); }}
                         >
                            <History size={14} />
                            <span>{t.popup.browser.viewHistory}</span>
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

                 {/* Back Face: History UI */}
                 <div className={styles.back}>
                    <div className={styles.browserWindow} style={{ height: '100%', background: '#f9fafb' }}>
                        {/* Simple Header for History */}
                        <div className={styles.browserHeader} style={{ background: '#eef2ff', justifyContent:'center' }}>
                            <div style={{ display:'flex', alignItems:'center', gap:'8px' }}>
                               <History size={16} color="#4f46e5" />
                               <span style={{ fontWeight:'700', color: '#4338ca', fontSize:'14px' }}>{t.popup.history.title}</span>
                            </div>
                        </div>

                        <div className={styles.browserContent} style={{ minHeight:0, flex:1, flexDirection: 'column', padding: '0', background:'#fff' }}>
                            <div style={{ flex:1, overflowY:'auto', padding:'20px', display:'flex', flexDirection:'column', gap:'10px' }}>
                               {blockHistory.length === 0 ? (
                                  <div style={{ 
                                     height:'100%', display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', 
                                     color:'#9ca3af', fontSize:'14px', textAlign:'center', lineHeight:'1.5'
                                  }}>
                                     <div style={{ marginBottom:'15px', opacity:0.5, padding:'20px', background:'#f3f4f6', borderRadius:'50%' }}>
                                        <XCircle size={32} />
                                     </div>
                                     <span dangerouslySetInnerHTML={{ __html: t.popup.history.empty }} />
                                  </div>
                               ) : (
                                  blockHistory.map((item) => (
                                     <div key={item.id} style={{ 
                                        display:'flex', alignItems:'center', justifyContent:'space-between',
                                        padding:'12px 16px', background:'white', borderRadius:'12px', 
                                        border:'1px solid #f3f4f6', boxShadow:'0 2px 5px rgba(0,0,0,0.03)'
                                     }}>
                                        <div style={{ display:'flex', alignItems:'center', gap:'12px' }}>
                                           <div style={{ 
                                              width:'32px', height:'32px', borderRadius:'8px', background:'#f9fafb', 
                                              display:'flex', alignItems:'center', justifyContent:'center' 
                                           }}>
                                              {item.site === 'youtube' && <Youtube size={16} color="#FF0000" />}
                                              {item.site === 'instagram' && <Instagram size={16} color="#E1306C" />}
                                              {item.site === 'google' && (
                                                <span style={{ fontSize: '16px', fontWeight: 'bold', background: 'linear-gradient(135deg, #4285F4, #EA4335, #FBBC05, #34A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>G</span>
                                              )}
                                              {item.site === 'tiktok' && (
                                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="black" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
                                                  </svg>
                                              )}
                                           </div>
                                           <div style={{ display:'flex', flexDirection:'column' }}>
                                              <span style={{ fontSize:'14px', fontWeight:'600', color:'#374151' }}>
                                                 {item.site === 'youtube' ? 'YouTube' : item.site === 'instagram' ? 'Instagram' : item.site === 'tiktok' ? 'TikTok' : 'Google'}
                                              </span>
                                              <span style={{ fontSize:'12px', color:'#ef4444', fontWeight:'500' }}>Blocked</span>
                                           </div>
                                        </div>
                                        <span style={{ fontSize:'13px', color:'#9ca3af', fontFamily:'monospace', background:'#f3f4f6', padding:'2px 6px', borderRadius:'4px' }}>
                                           {item.time}
                                        </span>
                                     </div>
                                  ))
                               )}
                            </div>

                            <div style={{ padding:'20px', borderTop:'1px solid #f3f4f6', background:'white' }}>
                               <button 
                                  onClick={(e) => { e.stopPropagation(); setIsFlipped(false); }}
                                  style={{
                                     width:'100%', padding:'12px', background:'#4f46e5', color:'white',
                                     border:'none', borderRadius:'10px', fontWeight:'600', fontSize:'14px', cursor:'pointer',
                                     display:'flex', alignItems:'center', justifyContent:'center', gap:'8px',
                                     transition: 'transform 0.1s', boxShadow:'0 4px 6px rgba(79, 70, 229, 0.2)'
                                  }}
                               >
                                  <ArrowLeft size={16} />
                                  {t.popup.history.back}
                               </button>
                            </div>
                        </div>
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
