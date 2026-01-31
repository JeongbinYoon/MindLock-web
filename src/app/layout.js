import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ThemeProvider from "../components/providers/ThemeProvider";

import "./globals.css";

export const metadata = {
  title: "MindLock - 집중력 강화 및 웹사이트 차단기",
  description: "MindLock으로 생산성을 높이세요. 불필요한 웹사이트를 차단하고 목표에 집중하세요.",
  icons: {
    icon: '/favicon.ico', // 기본 설정, 필요시 수정
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko" suppressHydrationWarning>
      <body>
        <ThemeProvider>
          <Header />
          <main style={{ minHeight: 'calc(100vh - 300px)' }}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
