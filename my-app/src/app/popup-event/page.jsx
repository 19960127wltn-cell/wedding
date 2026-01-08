'use client';

import React from 'react';
import PopupHero from '../../components/PopupHero';
import PopupServiceContent from '../../components/PopupServiceContent';

export default function PopupEventPage() {
    return (
        <div className="flex flex-col min-h-screen bg-background text-foreground">
            {/* 1. Hero Area */}
            <PopupHero />

            {/* 2. Content Area (Single Page Layout) */}
            <main className="w-full pt-0">
                <PopupServiceContent />
            </main>

        </div>
    );
}
