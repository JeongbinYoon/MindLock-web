'use client';

import { useState, useEffect, useRef } from 'react';
import styles from './ExtensionMockup.module.css';
import { useLanguage } from '../providers/LanguageProvider';

export default function ExtensionMockup({ onStatusChange }) {
  const { t } = useLanguage();
  
  // States
  const [activeTab, setActiveTab] = useState('timer'); // 'timer' | 'stopwatch'
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('25');
  const [displayTime, setDisplayTime] = useState('');
  
  // Timer Logic States
  // status: 'idle' | 'running' | 'paused' | 'overtime'
  const [status, setStatus] = useState('idle');
  const [targetTime, setTargetTime] = useState(null);
  const [startTime, setStartTime] = useState(null); // For stopwatch
  const [pausedTime, setPausedTime] = useState(null); // For stopwatch/timer pause
  
  // UI States
  const [showGuiltModal, setShowGuiltModal] = useState(false);
  const [currentPauseMsg, setCurrentPauseMsg] = useState('');
  const [currentGuiltMsg, setCurrentGuiltMsg] = useState('');
  
  const timerRef = useRef(null);

  // --- Helpers ---
  const getRandomMessage = (list) => {
    if (!list || list.length === 0) return '';
    return list[Math.floor(Math.random() * list.length)];
  };

  const formatMs = (ms) => {
    const totalSeconds = Math.floor(ms / 1000);
    const h = Math.floor(totalSeconds / 3600);
    const m = Math.floor((totalSeconds % 3600) / 60);
    const s = totalSeconds % 60;
    
    const fmtM = String(m).padStart(2, '0');
    const fmtS = String(s).padStart(2, '0');
    
    if (h > 0) {
      const fmtH = String(h).padStart(2, '0');
      return `${fmtH}:${fmtM}:${fmtS}`;
    }
    return `${fmtM}:${fmtS}`;
  };

  // --- Display Updates ---
  useEffect(() => {
    if (onStatusChange) {
      onStatusChange(status);
    }
  }, [status, onStatusChange]);

  useEffect(() => {
    if (status === 'idle') {
      setDisplayTime('');
      return;
    }

    const update = () => {
      const now = Date.now();
      
      if (status === 'running') {
        if (activeTab === 'timer') {
          // Countdown
          const diff = targetTime - now;
          if (diff <= 0) {
            // Timer Finished -> Start Overtime
            setStatus('overtime');
            setTargetTime(now); // Overtime starts counting UP from "now" (which was end time)
            return;
          }
          setDisplayTime(formatMs(diff));
        } else {
          // Stopwatch
          const diff = now - startTime;
          setDisplayTime(formatMs(diff));
        }
      } else if (status === 'overtime') {
        const diff = now - targetTime; // Counting up
        setDisplayTime('+ ' + formatMs(diff));
      } else if (status === 'paused') {
        // Static display handled by render logic usually, but here we can just keep last display
        // Or calc based on pausedTime
        // For simulation simplicity, we just freeze display or use pausedTime if we tracked it explicitly.
      }
    };

    update(); // Initial call
    timerRef.current = setInterval(update, 1000);

    return () => clearInterval(timerRef.current);
  }, [status, targetTime, startTime, activeTab]);

  // --- Handlers ---
  const startTimer = () => {
    if (activeTab === 'timer') {
      const h = parseInt(hours) || 0;
      const m = parseInt(minutes) || 0;
      if (h === 0 && m === 0) return;
      
      const totalMs = (h * 60 + m) * 60 * 1000;
      setTargetTime(Date.now() + totalMs);
      setStatus('running');
    } else {
      setStartTime(Date.now());
      setStatus('running');
    }
  };

  const pauseTimer = () => {
    // Stopwatch pause logic simulation
    // Ideally we track accumulated time. For demo, just "pause" UI roughly?
    // User requested "Functionality... works".
    // Keep simple: 
    if (status === 'running') {
      setStatus('paused');
      
      // Set random pause message
      const msg = getRandomMessage(t.extension.pauseMessages);
      setCurrentPauseMsg(msg.replace(/\n/g, '<br/>'));

      clearInterval(timerRef.current);
      // Store elapsed for resume
      // (Skipping complex resume logic for accurate demo, just visual pause is okay?)
      // Wait, "Stopwatch should work".
      // If paused, we need to know how much passed.
      // Let's just implement Stop mostly. Pause might be tricky without full stored logic.
      // Actually popup.js implements full pause logic.
      // Let's implement full pause for Stopwatch.
      if (activeTab === 'stopwatch') {
         setPausedTime(Date.now() - startTime);
      }
    } else if (status === 'paused') {
      // Resume
      if (activeTab === 'stopwatch') {
        const now = Date.now();
        setStartTime(now - pausedTime);
        setStatus('running');
      }
    }
  };

  const attemptStop = () => {
    if (status === 'overtime') {
      reset();
    } else {
      // Set random guilt message
      const msg = getRandomMessage(t.extension.guiltMessages);
      setCurrentGuiltMsg(msg.replace(/\n/g, '<br/>'));
      setShowGuiltModal(true);
    }
  };

  const reset = () => {
    setStatus('idle');
    setTargetTime(null);
    setStartTime(null);
    setPausedTime(null);
    setShowGuiltModal(false);
    setDisplayTime('');
    setCurrentGuiltMsg('');
    setCurrentPauseMsg('');
  };

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h2>MindLock 🔒</h2>
        <a className={styles.optionsLink}>{t.extension.settings}</a>
      </header>
      
      <div className={styles.timerCard}>
        {/* Tabs */}
        <div className={`${styles.tabs} ${status !== 'idle' ? styles.tabsHidden : ''}`}>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'timer' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('timer')}
          >
            {t.extension.timerMode}
          </button>
          <button 
            className={`${styles.tabBtn} ${activeTab === 'stopwatch' ? styles.tabBtnActive : ''}`}
            onClick={() => setActiveTab('stopwatch')}
          >
            {t.extension.stopwatchMode}
          </button>
        </div>

        {/* Labels & Inputs */}
        {status === 'idle' && activeTab === 'timer' && (
           <>
             <div className={styles.timerWrapper}>
               <div style={{display: 'flex', alignItems: 'baseline', justifyContent: 'center', marginBottom: '10px'}}>
                  <div className={styles.inputGroup}>
                    <input 
                      type="number" min="0" max="23" 
                      className={styles.timeInput} 
                      value={hours}
                      onChange={(e) => setHours(String(Math.min(23, Math.max(0, parseInt(e.target.value)||0))).padStart(2,'0'))}
                    />
                    <span className={styles.unitLabel}>{t.extension.unitHours}</span>
                  </div>
                  <div className={styles.inputGroup}>
                    <input 
                      type="number" min="0" max="59" 
                      className={styles.timeInput} 
                      value={minutes}
                      onChange={(e) => setMinutes(String(Math.min(59, Math.max(0, parseInt(e.target.value)||0))).padStart(2,'0'))}
                    />
                    <span className={styles.unitLabel}>{t.extension.unitMinutes}</span>
                  </div>
               </div>
               <h1 id="timerDisplay" className={styles.timerDisplay} style={{display:'none'}}>00:00</h1>
             </div>
           </>
        )}

        {status === 'idle' && activeTab === 'stopwatch' && (
          <>
             <div className={styles.timerWrapper}>
                 <p className={styles.stopwatchDesc} dangerouslySetInnerHTML={{__html: t.extension.stopwatchDesc}} />
                 <h1 id="timerDisplay" className={styles.timerDisplay} style={{display:'none'}}>00:00</h1>
             </div>
          </>
        )}

        {/* Running State UI */}
        {status !== 'idle' && (
          <div className={styles.timerWrapper}>
             <span className={styles.timerLabel} style={{
                color: status === 'overtime' ? '#10B981' : 
                       status === 'paused' ? '#F59E0B' : 
                       (activeTab === 'stopwatch' ? '#EF4444' : '#4F46E5')
             }}>
                {status === 'overtime' ? t.extension.overtime : 
                 status === 'paused' ? t.extension.paused : 
                 (activeTab === 'stopwatch' ? t.extension.focusing : t.extension.remainingTime)}
             </span>
             
             <h1 className={`${styles.timerDisplay} ${status === 'paused' ? styles.blurEffect : ''}`} style={{
                display:'block',
                color: status === 'overtime' ? '#10B981' : ''
             }}>
               {displayTime}
             </h1>

             {status === 'paused' && (
                <p className={styles.pauseMessage} dangerouslySetInnerHTML={{__html: currentPauseMsg}} />
             )}
          </div>
        )}

        {/* Controls */}
        <div className={`${styles.timerControls} ${status !== 'idle' ? styles.timerControlsRunningAdjusted : ''}`}>
           {status === 'idle' && (
             <button className={`${styles.controlBtn} ${styles.startTimerBtn}`} onClick={startTimer}>
               ▶ {t.extension.startFocus}
             </button>
           )}

           {status !== 'idle' && status !== 'overtime' && activeTab === 'stopwatch' && (
             <button className={`${styles.controlBtn} ${styles.pauseTimerBtn}`} onClick={pauseTimer}
               style={{ backgroundColor: status === 'paused' ? '#10B981' : '#F59E0B' }}
             >
               {status === 'paused' ? `▶ ${t.extension.resume}` : `⏸ ${t.extension.pause}`}
             </button>
           )}
           
           {status !== 'idle' && (
             <button className={`${styles.controlBtn} ${styles.stopBtn}`} onClick={attemptStop}>
               <span className={styles.iconSquare}></span> {t.extension.stop}
             </button>
           )}
        </div>
      
      </div>

      {/* Guilt Modal */}
      {showGuiltModal && (
        <div className={styles.modalOverlay}>
           <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>⛔ {t.extension.guiltModalTitle}</h3>
              <p className={styles.modalMessage} dangerouslySetInnerHTML={{__html: currentGuiltMsg}} />
              <div className={styles.modalButtons}>
                 <button className={`${styles.modalBtn} ${styles.keepBtn}`} onClick={() => setShowGuiltModal(false)}>
                   😤 {t.extension.keepFocus}
                 </button>
                 <button className={`${styles.modalBtn} ${styles.giveupBtn}`} onClick={reset}>
                   🏳️ {t.extension.giveUp}
                 </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
}
