'use client';

import { useLanguage } from '../providers/LanguageProvider';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  const toggleLanguage = () => {
    setLanguage(language === 'ko' ? 'en' : 'ko');
  };

  return (
    <button
      onClick={toggleLanguage}
      style={{
        background: 'transparent',
        border: '1px solid var(--card-border)', // Subtle border like a badge
        cursor: 'pointer',
        padding: '0.25rem 0.5rem', // Small compact size
        borderRadius: '0.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--foreground)',
        fontSize: '0.75rem', 
        fontWeight: '700',
        transition: 'all 0.2s',
        marginLeft: '0.5rem'
      }}
      title="Switch Language"
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'rgba(128, 128, 128, 0.1)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {language === 'ko' ? 'EN' : 'KO'}
    </button>
  );
}
