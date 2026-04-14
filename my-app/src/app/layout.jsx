import "./globals.css";
import GNB from '@/components/layout/GNB';
import Footer from '@/components/layout/Footer';
import { Analytics } from "@vercel/analytics/next"

export const metadata = {
  // 네이버 가이드: 브랜드명 중심, 간결하게 (과도한 길이 · 반복 키워드는 노출 불이익)
  title: "뷰포토부스 | 프리미엄 포토부스 대여 전문",
  description: "웨딩·돌잔치·기업행사 전문 프리미엄 포토부스. 뷰포토부스(VUE PHOTOBOOTH)에서 고품질 촬영과 감각적인 디자인으로 소중한 순간을 완벽하게 기록하세요.",
  keywords: "뷰포토부스, 포토부스, VUE PHOTOBOOTH, vuephoto, 웨딩포토부스, 포토부스대여, 이벤트포토부스, 돌잔치포토부스, 기업행사포토부스",
  authors: [{ name: "뷰포토부스" }],
  verification: {
    other: {
      // 네이버 서치어드바이저 사이트 소유 확인
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
  // 네이버 가이드: og 태그는 검색 로봇도 활용하므로 필수 항목 모두 포함
  openGraph: {
    type: "website",
    title: "뷰포토부스 | 프리미엄 포토부스 대여 전문",
    description: "웨딩·돌잔치·기업행사 전문 프리미엄 포토부스. 고품질 촬영과 감각적인 인화지 디자인으로 소중한 순간을 완벽하게 기록해 드립니다.",
    url: "https://vuephoto.co.kr",
    siteName: "뷰포토부스 VUE PHOTOBOOTH",
    locale: "ko_KR",
    images: [
      {
        // 네이버 가이드: 절대 URL, 150x150 이상, 가로:세로 3:1 미만, 5000byte 이상
        url: "https://vuephoto.co.kr/images/gift.png",
        width: 1200,
        height: 630,
        alt: "뷰포토부스 VUE PHOTOBOOTH - 프리미엄 포토부스",
      },
    ],
  },
  // 네이버 가이드: 소셜 미디어 메타태그(Twitter Card) 추가 권장
  twitter: {
    card: "summary_large_image",
    title: "뷰포토부스 | 프리미엄 포토부스 대여 전문",
    description: "웨딩·돌잔치·기업행사 전문 프리미엄 포토부스. 뷰포토부스에서 특별한 순간을 완벽하게 기록하세요.",
    images: ["https://vuephoto.co.kr/images/gift.png"],
    site: "@vue_photobooth",
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