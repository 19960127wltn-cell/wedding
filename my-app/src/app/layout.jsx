import "./globals.css";
import GNB from '@/components/layout/GNB';
import Footer from '@/components/layout/Footer';
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "VUE PHOTOBOOTH | 프리미엄 웨딩 포토부스",
  description: "소중한 순간을 기록하는 프리미엄 웨딩 포토부스 VUE PHOTOBOOTH입니다.",
  openGraph: {
    title: "VUE PHOTOBOOTH | 프리미엄 웨딩 포토부스",
    description: "소중한 순간을 기록하는 프리미엄 웨딩 포토부스 VUE PHOTOBOOTH입니다.",
    url: "https://vuephoto.co.kr",
    siteName: "VUE PHOTOBOOTH",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/gift.png",
        width: 1200,
        height: 630,
        alt: "VUE PHOTOBOOTH - 프리미엄 웨딩 포토부스",
      },
    ],
  },
  icons: {
    icon: "/images/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="ko">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Birthstone&family=Playfair+Display:ital,wght@0,400..700;1,400..700&family=Prata&display=swap" rel="stylesheet" />

      </head>
      <body className="pt-14" suppressHydrationWarning> {/* GNB 높이만큼 padding-top 추가 */}
        <GNB />
        {children}
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}