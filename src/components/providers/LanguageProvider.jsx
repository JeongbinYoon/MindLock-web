'use client';

import { createContext, useContext, useState, useEffect } from 'react';
import { ko } from '../../locales/ko';
import { en } from '../../locales/en';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  // Default to 'ko' initially to match SSR/Server default if needed
  // But we want to check browser.
  // Ideally, state starts as null to avoid hydration mismatch if we render different text?
  // Or we just default to 'ko' and update after mount. 
  // Updating after mount works but causes a flash of KO text if user is EN.
  // Standard solution: `suppressHydrationWarning` on hidden text, or accept the flash.
  // Given "check on every visit", we useEffect.

  const [language, setLanguage] = useState('ko');

  useEffect(() => {
    // Check browser language
    // If it starts with 'ko', use 'ko', else 'en'
    const browserLang = navigator.language || navigator.userLanguage; 
    const isKorean = browserLang && browserLang.toLowerCase().startsWith('ko');
    
    setLanguage(isKorean ? 'ko' : 'en');
  }, []);

  const t = language === 'ko' ? ko : en;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}
