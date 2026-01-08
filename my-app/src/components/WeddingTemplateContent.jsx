import React, { useState } from 'react';
import Image from 'next/image';
import FadeInOnScroll from './FadeInOnScroll';
import TemplateDialog from './TemplateDialog';

const WeddingTemplateContent = () => {
  const categories = ['All', 'Signature', 'Best', 'New'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);

  const galleryImages = [
    { src: '/images/templat1.png', alt: 'Wedding Template 01', category: 'Signature' },
    { src: '/images/templat2.png', alt: 'Wedding Template 02', category: 'Best' },
    { src: '/images/templat1.png', alt: 'Wedding Template 03', category: 'New' },
    { src: '/images/templat2.png', alt: 'Wedding Template 04', category: 'Signature' },
    { src: '/images/templat1.png', alt: 'Wedding Template 05', category: 'Best' },
    { src: '/images/templat2.png', alt: 'Wedding Template 06', category: 'New' },
    { src: '/images/templat1.png', alt: 'Wedding Template 07', category: 'Signature' },
    { src: '/images/templat2.png', alt: 'Wedding Template 08', category: 'Best' },
  ];

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-10">
      {/* Category Filter Chips */}
      <div className="flex flex-wrap justify-center gap-3 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setActiveCategory(category)}
            className={`px-6 py-2 rounded-full text-sm font-mj2 font-medium transition-all duration-300 ${activeCategory === category
              ? 'bg-primary text-white shadow-md shadow-primary/20'
              : 'bg-muted/50 text-muted-foreground hover:bg-muted transform hover:-translate-y-0.5'
              }`}
          >
            {category}
          </button>
        ))}
      </div>

      <FadeInOnScroll>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 md:gap-10">
          {filteredImages.map((image, index) => (
            <div key={index} className="flex flex-col gap-4">
              <div
                className="relative rounded-2xl overflow-hidden shadow-sm group bg-muted/30 cursor-pointer"
                onClick={() => setSelectedImage(image)}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  width={600}
                  height={800}
                  className="w-full h-auto group-hover:scale-105 transition-transform duration-700 ease-out"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
                  <span className="bg-white/80 backdrop-blur-md text-foreground px-4 py-2 rounded-full text-sm font-medium shadow-lg transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">
                    View Details
                  </span>
                </div>
              </div>
              <div className="px-1">
                <p className="text-sm font-mj2 font-medium text-muted-foreground mb-1">No {String(index + 1).padStart(2, '0')}</p>
                <h4 className="text-lg font-mj2 font-bold text-foreground">{image.alt}</h4>
              </div>
            </div>
          ))}
        </div>
      </FadeInOnScroll>

      {/* Detail Dialog */}
      <TemplateDialog
        isOpen={!!selectedImage}
        onClose={() => setSelectedImage(null)}
        image={selectedImage}
      />
    </div>
  );
};

export default WeddingTemplateContent;