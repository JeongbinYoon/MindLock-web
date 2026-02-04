'use client';

import { useState, useEffect, useRef } from 'react';
import { Play, Pause, Square } from 'lucide-react';
import styles from './ExtensionMockup.module.css';
import { useLanguage } from '../providers/LanguageProvider';

interface ExtensionMockupProps {
  onStatusChange?: (status: string) => void;
}

export default function ExtensionMockup({ onStatusChange }: ExtensionMockupProps) {
  const { t } = useLanguage();
  
  // States
  const [activeTab, setActiveTab] = useState<'timer' | 'stopwatch'>('timer'); // 'timer' | 'stopwatch'
  const [hours, setHours] = useState('00');
  const [minutes, setMinutes] = useState('25');
  const [displayTime, setDisplayTime] = useState('');
  
  // Timer Logic States
  // status: 'idle' | 'running' | 'paused' | 'overtime'
  const [status, setStatus] = useState<string>('idle');
  const [targetTime, setTargetTime] = useState<number | null>(null);
  const [startTime, setStartTime] = useState<number | null>(null); // For stopwatch
  const [pausedTime, setPausedTime] = useState<number | null>(null); // For stopwatch/timer pause
  
  // UI States
  const [showGuiltModal, setShowGuiltModal] = useState(false);
  const [currentPauseMsgIndex, setCurrentPauseMsgIndex] = useState(-1);
  const [currentGuiltMsgIndex, setCurrentGuiltMsgIndex] = useState(-1);
  
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // --- Helpers ---
  const getRandomIndex = (length: number) => {
    if (!length || length === 0) return -1;
    return Math.floor(Math.random() * length);
  };

  const formatMs = (ms: number) => {
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
          const diff = (targetTime || 0) - now;
          if (diff <= 0) {
            // Timer Finished -> Start Overtime
            setStatus('overtime');
            setTargetTime(now); // Overtime starts counting UP from "now" (which was end time)
            return;
          }
          setDisplayTime(formatMs(diff));
        } else {
          // Stopwatch
          const diff = now - (startTime || 0);
          setDisplayTime(formatMs(diff));
        }
      } else if (status === 'overtime') {
        const diff = now - (targetTime || 0); // Counting up
        setDisplayTime('+ ' + formatMs(diff));
      } else if (status === 'paused') {
        // Static display handled by render logic usually, but here we can just keep last display
        // Or calc based on pausedTime
        // For simulation simplicity, we just freeze display or use pausedTime if we tracked it explicitly.
      }
    };

    update(); // Initial call
    update(); // Initial call
    timerRef.current = setInterval(update, 1000);

    return () => clearInterval(timerRef.current!);
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
      
      // Set random pause message index
      const idx = getRandomIndex(t.extension.pauseMessages?.length || 0);
      setCurrentPauseMsgIndex(idx);

      if (timerRef.current) clearInterval(timerRef.current);
      // Store elapsed for resume
      // (Skipping complex resume logic for accurate demo, just visual pause is okay?)
      // Wait, "Stopwatch should work".
      // If paused, we need to know how much passed.
      // Let's just implement Stop mostly. Pause might be tricky without full stored logic.
      // Actually popup.js implements full pause logic.
      // Let's implement full pause for Stopwatch.
      if (activeTab === 'stopwatch') {
         setPausedTime(Date.now() - (startTime || 0));
      }
    } else if (status === 'paused') {
      // Resume
      if (activeTab === 'stopwatch') {
        const now = Date.now();
        setStartTime(now - (pausedTime || 0));
        setStatus('running');
      }
    }
  };

  const attemptStop = () => {
    if (status === 'overtime') {
      reset();
    } else {
      // Set random guilt message index
      const idx = getRandomIndex(t.extension.guiltMessages?.length || 0);
      setCurrentGuiltMsgIndex(idx);
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
    setCurrentGuiltMsgIndex(-1);
    setCurrentPauseMsgIndex(-1);
  };

  const getPauseMessage = () => {
    if (currentPauseMsgIndex === -1 || !t.extension.pauseMessages) return '';
    return (t.extension.pauseMessages[currentPauseMsgIndex] || '').replace(/\n/g, '<br/>');
  };

  const getGuiltMessage = () => {
    if (currentGuiltMsgIndex === -1 || !t.extension.guiltMessages) return '';
    return (t.extension.guiltMessages[currentGuiltMsgIndex] || '').replace(/\n/g, '<br/>');
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
                <p className={styles.pauseMessage} dangerouslySetInnerHTML={{__html: getPauseMessage()}} />
             )}
          </div>
        )}

        {/* Controls */}
        <div className={`${styles.timerControls} ${status !== 'idle' ? styles.timerControlsRunningAdjusted : ''}`}>
           {status === 'idle' && (
             <button className={`${styles.controlBtn} ${styles.startTimerBtn}`} onClick={startTimer}>
               <Play size={14} fill="currentColor" style={{marginRight: '6px'}} /> {t.extension.startFocus}
             </button>
           )}

           {status !== 'idle' && status !== 'overtime' && activeTab === 'stopwatch' && (
             <button className={`${styles.controlBtn} ${styles.pauseTimerBtn}`} onClick={pauseTimer}
               style={{ backgroundColor: status === 'paused' ? '#10B981' : '#F59E0B' }}
             >
               {status === 'paused' ? (
                 <><Play size={14} fill="currentColor" style={{marginRight: '6px'}} /> {t.extension.resume}</>
               ) : (
                 <><Pause size={14} fill="currentColor" style={{marginRight: '6px'}} /> {t.extension.pause}</>
               )}
             </button>
           )}
           
           {status !== 'idle' && (
             <button className={`${styles.controlBtn} ${styles.stopBtn}`} onClick={attemptStop}>
               <Square size={14} fill="currentColor" style={{marginRight: '6px'}} /> {t.extension.stop}
             </button>
           )}
        </div>
      
      </div>

      {/* Guilt Modal */}
      {showGuiltModal && (
        <div className={styles.modalOverlay}>
           <div className={styles.modalContent}>
              <h3 className={styles.modalTitle}>⛔ {t.extension.guiltModalTitle}</h3>
              <p className={styles.modalMessage} dangerouslySetInnerHTML={{__html: getGuiltMessage()}} />
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
