'use client';

import Link from 'next/link';
import { useState } from 'react';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { ChevronLeft, Menu, X } from 'lucide-react';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/wedding', label: 'Wedding' },
  { href: '/popup-event', label: 'Popup/Event' },
  { href: '/review', label: 'Review' },
  { href: '/contact', label: 'Contact' },
];

const MobileMenu = ({ isOpen, pathname, setIsOpen }) => {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full left-0 w-full bg-[var(--gnb-background)]/70 backdrop-blur-sm flex flex-col items-center py-4 space-y-4 shadow-lg">
      {navLinks.map((link) => (
        <Link
          key={link.href}
          href={link.href}
          passHref
          className={`text-lg font-gnb font-regular transition-colors duration-300 ${pathname === link.href ? 'text-primary' : 'text-white hover:text-primary-hover'
            }`}
          onClick={() => setIsOpen(false)}
        >
          {link.label}
        </Link>
      ))}
    </div>
  );
};

export default function GNB() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const isWeddingPage = pathname === '/wedding';
  const isPopupPage = pathname === '/popup-event';
  const pageLabel = isWeddingPage ? 'Wedding' : (isPopupPage ? 'Popup/Event' : '');

  if (isWeddingPage || isPopupPage) {
    return (
      <nav className="fixed w-full top-0 left-0 z-50 bg-gnb-custom shadow-sm flex items-center text-white h-14">
        {/* Mobile & Tablet View (< 1280px) */}
        <div className="xl:hidden flex items-center justify-between w-full px-6 relative h-full">
          <div className="flex items-center">
            <button onClick={() => router.back()} className="text-white focus:outline-none flex items-center">
              <ChevronLeft size={24} strokeWidth={1.5} />
            </button>
          </div>
          <div className="absolute left-1/2 -translate-x-1/2">
            <h1 className="text-md font-semibold font-gnb">{pageLabel}</h1>
          </div>
          <div className="flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
          <MobileMenu isOpen={isOpen} pathname={pathname} setIsOpen={setIsOpen} />
        </div>

        {/* Desktop View (>= 1280px) */}
        <div className="hidden xl:flex items-center justify-between w-full px-12 h-full">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" passHref className="relative w-32 h-10">
              <Image src="/images/logo.png" alt="VUE PHOTOBOOTH Logo" fill className="object-contain" />
            </Link>
          </div>

          {/* Nav Links */}
          <div className="flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                passHref
                className={`text-lg font-gnb transition-colors duration-300 ${pathname === link.href ? 'text-primary' : 'hover:text-primary-hover'
                  }`}
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="fixed w-full top-0 left-0 z-50 bg-gnb-custom shadow-sm py-3 px-6 md:px-12 flex justify-between items-center text-white h-14">
      {/* Mobile Centered Title */}
      <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
        <span className="text-sm font-gnb font-regular">VUE PHOTOBUTH</span>
      </div>

      {/* Logo/Brand Name (Desktop Only) */}
      <div className="hidden md:flex items-center">
        <Link href="/" passHref className="relative w-24 h-8 md:w-32 md:h-10">
          <Image src="/images/logo.png" alt="VUE PHOTOBOOTH Logo" fill className="object-contain" />
        </Link>
      </div>

      {/* Desktop Navigation */}
      <div className="hidden md:flex space-x-8">
        {navLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            passHref
            className={`text-lg font-gnb transition-colors duration-300 ${pathname === link.href ? 'text-primary' : 'hover:text-primary-hover'
              }`}
          >
            {link.label}
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <div className="md:hidden flex items-center ml-auto">
        <button onClick={() => setIsOpen(!isOpen)} className="text-white focus:outline-none">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <MobileMenu isOpen={isOpen} pathname={pathname} setIsOpen={setIsOpen} />
    </nav>
  );
}
