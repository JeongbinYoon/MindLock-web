import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ThemeProvider from "../components/providers/ThemeProvider";
import { LanguageProvider } from "../components/providers/LanguageProvider";

import JsonLd from "../components/seo/JsonLd";

import "./globals.css";

export const metadata = {
  metadataBase: new URL('https://mindlock.today'),
  title: {
    default: "MindLock - 집중력 강화 및 웹사이트 차단기",
    template: "%s | MindLock"
  },
  description: "MindLock으로 생산성을 높이세요. 불필요한 웹사이트를 차단하고 목표에 집중하세요. 뽀모도로 타이머와 웹사이트 차단 기능을 제공합니다.",
  keywords: [
    "MindLock", "마인드락", 
    "생산성", "Productivity", 
    "집중력", "Focus", 
    "웹사이트 차단", "Website Blocker", 
    "뽀모도로", "Pomodoro", 
    "타이머", "Timer", 
    "시간 관리", "Time Management", 
    "자기계발", "Self-improvement", 
    "익스텐션", "Extension", 
    "크롬 익스텐션", "Chrome Extension"
  ],
  authors: [{ name: "MindLock Team" }],
  creator: "MindLock Team",
  publisher: "MindLock",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "MindLock - 집중력 강화 및 웹사이트 차단기",
    description: "불필요한 웹사이트를 차단하고 목표에 집중하세요. 당신의 시간을 되찾아드립니다.",
    url: 'https://mindlock.today',
    siteName: 'MindLock',
    locale: 'ko_KR',
    type: 'website',
    images: [
      {
        url: '/assets/thumbnail.png',
        width: 1200,
        height: 630,
        alt: 'MindLock Preview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: "MindLock - 집중력 강화 및 웹사이트 차단기",
    description: "불필요한 웹사이트를 차단하고 목표에 집중하세요.",
    creator: "@mindlock",
    images: ['/assets/thumbnail.png'], 
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/assets/logo16.png',
    shortcut: '/assets/logo64.png',
    apple: '/assets/logo128.png',
  },
  alternates: {
    canonical: 'https://mindlock.today',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <LanguageProvider>
            <JsonLd />
            <Header />
            <main style={{ minHeight: 'calc(100vh - 300px)' }}>
              {children}
            </main>
            <Footer />
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
