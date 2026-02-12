'use client';

import React, { useState, useEffect } from 'react';
import WeddingServiceContent from '@/components/features/wedding/WeddingServiceContent';
import WeddingTemplateContent from '@/components/features/wedding/WeddingTemplateContent';
import WeddingHero from '@/components/features/wedding/WeddingHero';
import ContactSection from '@/components/features/contact/ContactSection';

export default function WeddingPage() {
  const [activeTab, setActiveTab] = useState('service');
  const tabsRef = React.useRef(null);
  const handleTabClick = (tabId) => {
    setActiveTab(tabId);

    // Use setTimeout to ensure the state has updated and content might have changed height
    setTimeout(() => {
      if (tabsRef.current) {
        const gnbHeight = 56; // GNB height (h-14)
        const elementPosition = tabsRef.current.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - gnbHeight;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  const tabs = [
    { id: 'service', label: 'Service' },
    { id: 'template', label: 'Template' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 1. Hero Area */}
      <WeddingHero />

      {/* 2. Tab Area */}
      <section ref={tabsRef} className="bg-background backdrop-blur-sm shadow-sm sticky top-14 z-20 pt-2 md:pt-0">
        <div className="max-w-7xl mx-auto flex justify-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabClick(tab.id)}
              className={`py-2.5 px-6 md:px-8 text-md lg:text-lg font-gnb font-semibold tracking-wide transition-colors duration-300 ${activeTab === tab.id
                ? 'border-b-2 border-primary text-primary'
                : 'text-muted-foreground hover:text-primary'
                }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </section>

      {/* 3. Content Area */}
      <main className="max-w-7xl mx-auto w-full pt-0 pb-8 md:pb-12">
        {activeTab === 'service' && (
          <>
            <WeddingServiceContent />
            <ContactSection />
          </>
        )}
        {activeTab === 'template' && <WeddingTemplateContent />}
      </main>
    </div>
  );
}
