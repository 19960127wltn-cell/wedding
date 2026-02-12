'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function ImageCarousel({ images, interval = 5000, className = "" }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);
    return () => clearInterval(timer);
  }, [images, interval]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt={`Hero Image ${index + 1}`}
          fill
          className={`object-cover transition-opacity duration-1000 ease-in-out ${
            index === currentImageIndex ? 'opacity-100' : 'opacity-0'
          }`}
          priority={index === 0} // Prioritize loading the first image
        />
      ))}
    </div>
  );
}