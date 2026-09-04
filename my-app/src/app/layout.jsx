import "./globals.css";
import GNB from '@/components/layout/GNB';
import Footer from '@/components/layout/Footer';
import { Analytics } from "@vercel/analytics/next"
import Script from "next/script";

export const metadata = {
  // 네이버 가이드: 브랜드명 중심, 간결하게 (과도한 길이 · 반복 키워드는 노출 불이익)
  title: "뷰포토부스 | 프리미엄 포토부스 대여 전문",
  description: "웨딩·돌잔치·기업행사 전문 프리미엄 포토부스.고품질 촬영과 감각적인 디자인으로 소중한 순간을 완벽하게 기록하세요.",
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

        {/* 뷰포토부스 - 유입경로 추적 스크립트 (네이버 전환추적) */}
        <Script
          id="vue-photobooth-tracking"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
(function () {
  'use strict';

  var STORE_KEY = 'vue_track_v1';
  var ENDPOINT  = 'https://script.google.com/macros/s/AKfycbzO1b404N9xsfu7PnunyNgzcmVP0_QBQBhKUmbvCl4CY8xUuIWB8_oLm8S_H7FBX2-vUQ/exec';

  var BRANCH_BY_PHONE = {
    '01095481340': '서울본점',
    '01032808831': '부산지점',
    '01081810281': '대전지점',
    '01034927692': '광주지점'
  };
  var BRANCH_RE = /(서울)\\s*본점|(부산|대전|광주)\\s*지점/;

  function qs(n) {
    var m = new RegExp('[?&]' + n + '=([^&#]*)').exec(location.search);
    return m ? decodeURIComponent(m[1].replace(/\\+/g, ' ')) : '';
  }

  function collect() {
    var d = {
      utm_source: qs('utm_source'), utm_medium: qs('utm_medium'),
      utm_campaign: qs('utm_campaign'), utm_content: qs('utm_content'),
      n_media: qs('n_media'), n_query: qs('n_query'), n_keyword: qs('n_keyword'),
      n_ad_group: qs('n_ad_group'), n_ad: qs('n_ad'), n_rank: qs('n_rank'),
      gclid: qs('gclid'), fbclid: qs('fbclid'),
      landing: location.origin + location.pathname,
      referrer: document.referrer || '',
      device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Mobile' : 'PC',
      first_at: new Date().toISOString()
    };
    if (!d.utm_source && !d.n_media && !d.gclid) {
      var r = d.referrer;
      if (/naver\\./.test(r)) d.utm_source = 'naver';
      else if (/google\\./.test(r)) d.utm_source = 'google';
      else if (/daum\\.|kakao\\./.test(r)) d.utm_source = 'daum';
      else if (/instagram\\./.test(r)) d.utm_source = 'instagram';
      else if (!r) d.utm_source = 'direct';
      else d.utm_source = 'referral';
      d.utm_medium = d.utm_medium || 'organic';
    }
    return d;
  }

  function save() {
    var cur = collect();
    var hasAd = cur.n_media || cur.gclid || cur.utm_medium === 'cpc';
    var old;
    try { old = JSON.parse(sessionStorage.getItem(STORE_KEY)); } catch (e) { old = null; }
    if (old && old.utm_source && old.utm_source !== 'direct' && !hasAd) return old;
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(cur)); } catch (e) {}
    return cur;
  }

  var TRACK = save();
  var landedAt = Date.now();
  window.VUE_TRACK = TRACK;

  function send(payload) {
    var body = {};
    for (var k in TRACK) if (TRACK.hasOwnProperty(k)) body[k] = TRACK[k];
    for (var j in payload) if (payload.hasOwnProperty(j)) body[j] = payload[j];
    body.stay_sec = Math.round((Date.now() - landedAt) / 1000);
    fetch(ENDPOINT, {
      method: 'POST', mode: 'no-cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(body)
    }).catch(function () {});
    try {
      if (typeof wcs !== 'undefined' && typeof wcs_do === 'function') {
        var c = {}; c['type'] = '2'; c['value'] = '0'; window.wcs_do(c);
      }
    } catch (e) {}
    if (typeof window.gtag === 'function') {
      window.gtag('event', 'generate_lead', { method: payload.lead_type || 'contact' });
    }
    console.log('[VUE]', payload.lead_type, payload.branch || '');
  }
  window.vueSendLead = send;

  /* 팝업 제목에서 지점명 추출 */
  function branchFromDom(el) {
    var box = el;
    for (var i = 0; box && i < 6; i++) {
      var m = (box.textContent || '').match(BRANCH_RE);
      if (m) return (m[1] ? '서울본점' : m[2] + '지점');
      box = box.parentElement;
    }
    var body = (document.body.textContent || '');
    var mm = body.match(/(서울)\\s*본점\\s*상담\\s*문의|(부산|대전|광주)\\s*지점\\s*상담\\s*문의/);
    if (mm) return (mm[1] ? '서울본점' : mm[2] + '지점');
    return '';
  }

  var last = 0;
  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a') : null;
    if (!a) return;
    var href = a.getAttribute('href') || '';
    var type = '', phone = '', branch = '';

    if (/^tel:/i.test(href)) {
      type  = '전화클릭';
      phone = href.replace(/^tel:/i, '').trim();
      branch = BRANCH_BY_PHONE[phone.replace(/[^0-9]/g, '')] || '';
    } else if (/pf\\.kakao|open\\.kakao|kakao\\.com/i.test(href)) {
      type = '카톡클릭';
    } else if (/instagram\\.com/i.test(href)) {
      type = '인스타클릭';
    }
    if (!type) return;
    if (!branch) branch = branchFromDom(a);

    var now = Date.now();
    if (now - last < 1500) return;
    last = now;

    send({ lead_type: type, branch: branch, phone: phone });
  }, true);
})();
`,
          }}
        />
      </body>
    </html>
  );
}