'use client';

import Link from 'next/link';
import { Instagram, Mail, Phone, MessageCircle } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a1a1a] text-white pt-16 pb-8 px-6 md:px-12 border-t border-white/10">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="font-gnb text-lg text-primary tracking-widest uppercase">Contact</h4>
            <div className="space-y-4">
              <ul className="space-y-3">
                <li className="flex items-center space-x-3 text-zinc-400">
                  <Phone size={16} className="text-primary/70" />
                  <span className="text-sm font-mj2">010-1234-5678</span>
                </li>
                <li className="flex items-center space-x-3 text-zinc-400">
                  <Mail size={16} className="text-primary/70" />
                  <span className="text-sm font-mj2">contact@vuephotobooth.com</span>
                </li>
                <li className="flex items-start space-x-3 text-zinc-400">
                  <MessageCircle size={16} className="text-primary/70 mt-1" />
                  <div className="text-sm font-mj2">
                    <p>카카오톡 채널: VUE PHOTOBOOTH</p>
                    <p className="text-[11px] mt-1 text-zinc-500">평일 10:00 - 18:00 (주말 휴무)</p>
                  </div>
                </li>
              </ul>
              
              {/* Social Icons in Contact area */}
              <div className="flex space-x-3 pt-2">
                <Link href="https://instagram.com" target="_blank" className="p-2.5 bg-zinc-800/50 rounded-full hover:bg-primary hover:text-white transition-all duration-300 group">
                  <Instagram size={18} className="text-zinc-400 group-hover:text-white" />
                </Link>
                <Link href="#" className="p-2.5 bg-zinc-800/50 rounded-full hover:bg-primary hover:text-white transition-all duration-300 group">
                  <MessageCircle size={18} className="text-zinc-400 group-hover:text-white" />
                </Link>
                <Link href="mailto:contact@vuephotobooth.com" className="p-2.5 bg-zinc-800/50 rounded-full hover:bg-primary hover:text-white transition-all duration-300 group">
                  <Mail size={18} className="text-zinc-400 group-hover:text-white" />
                </Link>
              </div>
            </div>
          </div>

          {/* Business Info (Information) */}
          <div className="space-y-6">
            <h4 className="font-gnb text-lg text-primary tracking-widest uppercase">Information</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2 text-[11px] text-zinc-500 leading-relaxed font-mj2">
              <div className="space-y-2">
                <p><span className="text-zinc-400">상호명:</span> 뷰 포토부스 (VUE PHOTOBOOTH)</p>
                <p><span className="text-zinc-400">대표자:</span> 홍길동</p>
                <p><span className="text-zinc-400">주소:</span> 서울특별시 강남구 테헤란로 123, 4층</p>
              </div>
              <div className="space-y-2">
                <p><span className="text-zinc-400">사업자등록번호:</span> 000-00-00000</p>
                <p><span className="text-zinc-400">통신판매업신고:</span> 제 2024-서울강남-0000호</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 text-center">
          <p className="text-[10px] text-zinc-600 font-sans tracking-wider uppercase">
            &copy; {currentYear} VUE PHOTOBOOTH. ALL RIGHTS RESERVED.
          </p>
        </div>
      </div>
    </footer>
  );
}
