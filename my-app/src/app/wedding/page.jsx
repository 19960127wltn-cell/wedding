'use client';

import React, { useState } from 'react';
import WeddingServiceContent from '../../components/WeddingServiceContent';
import WeddingTemplateContent from '../../components/WeddingTemplateContent';
import WeddingHero from '../../components/WeddingHero';
import ContactSection from '../../components/ContactSection';

export default function WeddingPage() {
  const [activeTab, setActiveTab] = useState('service');

  const tabs = [
    { id: 'service', label: 'Service' },
    { id: 'template', label: 'Template' },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-background text-foreground">
      {/* 1. Hero Area */}
      <WeddingHero />

      {/* 2. Tab Area */}
      <section className="bg-background backdrop-blur-sm shadow-sm sticky top-14 z-20">
        <div className="max-w-7xl mx-auto flex justify-center">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`py-2.5 px-6 md:px-8 text-sm lg:text-lg font-gnb font-semibold tracking-wide transition-colors duration-300 ${
                activeTab === tab.id
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
        {activeTab === 'service' && <WeddingServiceContent />}
        {activeTab === 'template' && <WeddingTemplateContent />}
      </main>

      <ContactSection />
    </div>
  );
}
