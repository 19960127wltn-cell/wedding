'use client';
import React, { useEffect, useRef } from 'react';
import { Instagram, Phone, X } from 'lucide-react';
import './ContactDialog.css';

// Simplified KakaoTalk SVG icon
const KakaoIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.044 2 10.985C2 13.922 3.55 16.51 6.01 18.22L4.393 21.082C4.167 21.469 4.544 21.921 4.965 21.782L8.525 20.65C9.625 20.895 10.79 21.03 12 21.03C17.523 21.03 22 16.986 22 12.045C22 7.104 17.523 3.06 12 3.06C12 2.528 12.448 2.08 12 2Z" fill="#FEE500"/>
    <path fillRule="evenodd" clipRule="evenodd" d="M12.019 7.962C12.448 7.962 12.793 8.307 12.793 8.736V11.23L14.779 11.23C15.208 11.23 15.553 11.575 15.553 12.004C15.553 12.433 15.208 12.778 14.779 12.778H12.793V14.5C12.793 14.929 12.448 15.274 12.019 15.274C11.59 15.274 11.245 14.929 11.245 14.5V12.778H9.259C8.83 12.778 8.485 12.433 8.485 12.004C8.485 11.575 8.83 11.23 9.259 11.23H11.245V8.736C11.245 8.307 11.59 7.962 12.019 7.962Z" fill="#191919"/>
  </svg>
);


const ContactDialog = ({ isOpen, onClose }) => {
  const dialogRef = useRef(null);

  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
    }
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="contact-dialog-overlay" onClick={onClose}>
      <div className="contact-dialog-container" onClick={(e) => e.stopPropagation()} ref={dialogRef}>
        <button className="close-button" onClick={onClose}>
          <X size={24} />
        </button>
        <h3 className="dialog-title">문의하기</h3>
        <p className="dialog-description">아래 채널을 통해 편하게 문의해주세요.</p>
        <div className="contact-icons-wrapper">
          <a href="#" className="contact-icon-item" aria-label="KakaoTalk">
            <KakaoIcon />
            <span>카카오톡</span>
          </a>
          <a href="#" className="contact-icon-item" aria-label="Instagram">
            <Instagram size={24} />
            <span>인스타그램</span>
          </a>
          <a href="#" className="contact-icon-item" aria-label="Phone">
            <Phone size={24} />
            <span>전화</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ContactDialog;
