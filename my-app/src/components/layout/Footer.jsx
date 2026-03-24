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
                  <span className="text-sm font-mj2">010-9548-1340</span>
                </li>
                <li className="flex items-center space-x-3 text-zinc-400">
                  <Mail size={16} className="text-primary/70" />
                  <span className="text-sm font-mj2">shhe1209@gmail.com</span>
                </li>
              </ul>

              {/* Social Icons in Contact area */}
              <div className="flex space-x-3 pt-2">
                <Link href="https://www.instagram.com/vue_photobooth/" target="_blank" className="p-2.5 bg-zinc-800/50 rounded-full hover:bg-primary hover:text-white transition-all duration-300 group">
                  <Instagram size={18} className="text-zinc-400 group-hover:text-white" />
                </Link>
                <Link href="https://pf.kakao.com/_tqRxcxj" target="_blank" className="p-2.5 bg-zinc-800/50 rounded-full hover:bg-primary hover:text-white transition-all duration-300 group">
                  <MessageCircle size={18} className="text-zinc-400 group-hover:text-white" />
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
                <p><span className="text-zinc-400">대표자:</span> 이형언</p>
                <p><span className="text-zinc-400">주소:</span> 서울특별시 송파구 가락로 256 202호</p>
              </div>
              <div className="space-y-2">
                <p><span className="text-zinc-400">사업자등록번호:</span> 772-54-00772</p>
                <p><span className="text-zinc-400">통신판매업신고:</span>  2023-서울강남-02288호</p>
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
