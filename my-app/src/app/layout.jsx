import "./globals.css";
import GNB from '../components/GNB';
import Footer from '../components/Footer';

export const metadata = {
  title: "Admin Dashboard",
  description: "관리자 페이지",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Birthstone&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Prata&family=Nanum+Myeongjo:wght@400;700;800&display=swap" rel="stylesheet" />

      </head>
      <body className="pt-14" suppressHydrationWarning> {/* GNB 높이만큼 padding-top 추가 */}
        <GNB />
        {children}
        <Footer />
      </body>
    </html>
  );
}