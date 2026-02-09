import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import FadeInOnScroll from './FadeInOnScroll';
import TemplateDialog from './TemplateDialog';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const WeddingTemplateContent = () => {
  const categories = ['All', 'Signature', 'Best', 'New'];
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedImage, setSelectedImage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  // Expanded gallery images for pagination demonstration
  const baseImages = [
    { src: '/images/templat1.png', alt: 'Wedding Template', category: 'Signature' },
    { src: '/images/templat2.png', alt: 'Wedding Template', category: 'Best' },
    { src: '/images/templat1.png', alt: 'Wedding Template', category: 'New' },
    { src: '/images/templat2.png', alt: 'Wedding Template', category: 'Signature' },
    { src: '/images/templat1.png', alt: 'Wedding Template', category: 'Best' },
    { src: '/images/templat2.png', alt: 'Wedding Template', category: 'New' },
    { src: '/images/templat1.png', alt: 'Wedding Template', category: 'Signature' },
    { src: '/images/templat2.png', alt: 'Wedding Template', category: 'Best' },
    { src: '/images/templat1.png', alt: 'Wedding Template', category: 'New' },
    { src: '/images/templat2.png', alt: 'Wedding Template', category: 'Signature' },
  ];

  // Generate 40 images (repeat base 4 times)
  const galleryImages = Array.from({ length: 44 }, (_, i) => ({
    ...baseImages[i % baseImages.length],
    id: i + 1,
    alt: `Wedding Template ${String(i + 1).padStart(2, '0')}`
  }));

  useEffect(() => {
    setCurrentPage(1);
  }, [activeCategory]);

  const filteredImages = activeCategory === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeCategory);

  // Pagination Logic
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredImages.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredImages.length / itemsPerPage);

  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    window.scrollTo({ top: 400, behavior: 'smooth' });
  };

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
          {currentItems.map((image, idx) => (
            <div key={image.id} className="flex flex-col gap-4">
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
                <p className="text-sm font-mj2 font-medium text-muted-foreground mb-1">No {String(image.id).padStart(2, '0')}</p>
                <h4 className="text-lg font-mj2 font-bold text-foreground">{image.alt}</h4>
              </div>
            </div>
          ))}
        </div>
      </FadeInOnScroll>

      {/* Pagination UI */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-2 mt-20">
          <button
            onClick={() => paginate(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
            className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronLeft size={20} />
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`w-10 h-10 rounded-full text-sm font-medium transition-all ${currentPage === number
                  ? 'bg-primary text-white shadow-lg'
                  : 'hover:bg-muted text-muted-foreground'
                  }`}
              >
                {number}
              </button>
            ))}
          </div>

          <button
            onClick={() => paginate(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
            className="p-2 rounded-full border border-border hover:bg-muted disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      )}

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
