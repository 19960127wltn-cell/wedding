import "./globals.css";
import GNB from '@/components/layout/GNB';
import Footer from '@/components/layout/Footer';
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  title: "뷰포토부스 (VUE PHOTOBOOTH) | 프리미엄 웨딩 포토부스 · 포토부스 대여 전문",
  description: "뷰포토부스(VUE PHOTOBOOTH)는 웨딩, 돌잔치, 기업행사, 팝업스토어를 위한 프리미엄 포토부스 서비스입니다. 고품질 촬영과 감각적인 인화지 디자인으로 특별한 순간을 완벽하게 기록해 드립니다.",
  keywords: "뷰포토부스, 포토부스, VUE PHOTOBOOTH, vuephoto, 웨딩포토부스, 포토부스대여, 포토부스렌탈, 이동식포토부스, 이벤트포토부스, 기업행사포토부스, 돌잔치포토부스, 결혼식포토부스",
  author: "뷰포토부스",
  verification: {
    other: {
      "naver-site-verification": ["fd0686cfcfd1d59070ab27349798fea6"],
    },
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
  alternates: {
    canonical: "https://vuephoto.co.kr",
  },
  openGraph: {
    title: "뷰포토부스 (VUE PHOTOBOOTH) | 프리미엄 웨딩 포토부스 · 포토부스 대여",
    description: "웨딩, 돌잔치, 기업행사의 필수 아이템! 뷰포토부스에서 고품질 촬영과 특별한 추억을 경험하세요.",
    url: "https://vuephoto.co.kr",
    siteName: "뷰포토부스 VUE PHOTOBOOTH",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/images/gift.png",
        width: 1200,
        height: 630,
        alt: "뷰포토부스 VUE PHOTOBOOTH - 프리미엄 웨딩 포토부스",
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