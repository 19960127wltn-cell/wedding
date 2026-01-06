import React from 'react';
import Image from 'next/image';
import FadeInOnScroll from './FadeInOnScroll';

const WeddingTemplateContent = () => {
  const galleryImages = [
    { src: '/images/hero-wedding.png', alt: 'Template 1' },
    { src: '/images/hero-wedding-01.png', alt: 'Template 2' },
    { src: '/images/hero-wedding-02.png', alt: 'Template 3' },
    { src: '/images/promo-wedding.png', alt: 'Template 4' },
    { src: '/images/hero-wedding1.png', alt: 'Template 5' },
    // Add more images as needed
    { src: '/images/hero-wedding.png', alt: 'Template 6' },
    { src: '/images/hero-wedding-01.png', alt: 'Template 7' },
    { src: '/images/hero-wedding-02.png', alt: 'Template 8' },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8">
      <FadeInOnScroll>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {galleryImages.map((image, index) => (
            <div key={index} className="relative aspect-w-1 aspect-h-1 rounded-lg overflow-hidden shadow-lg group">
              <Image src={image.src} alt={image.alt} fill className="object-cover group-hover:scale-110 transition-transform duration-300" />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300" />
              <div className="absolute bottom-0 left-0 p-4">
                <p className="text-white font-semibold">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </FadeInOnScroll>
    </div>
  );
};

export default WeddingTemplateContent;