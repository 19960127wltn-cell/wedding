import "./globals.css";
import GNB from '../components/GNB'; // GNB 컴포넌트 임포트

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
        <link href="https://fonts.googleapis.com/css2?family=Birthstone&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Prata&display=swap" rel="stylesheet" />
        <link href="https://fonts.googleapis.com/earlyaccess/nanummyeongjo.css" rel="stylesheet" />
      </head>
      <body className="pt-14"> {/* GNB 높이만큼 padding-top 추가 */}
        <GNB />
        {children}
      </body>
    </html>
  );
}