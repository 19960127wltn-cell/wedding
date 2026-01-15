import React, { useEffect, useState, useRef } from 'react';


import WeddingBenefits from './WeddingBenefits';
import WeddingDifferentiation from './WeddingDifferentiation';
import AffiliatedHalls from './AffiliatedHalls';
import WeddingReview from './WeddingReview';
import WeddingProcess from './WeddingProcess';
import ContactDialog from './ContactDialog';
import WeddingPackageConfig from './WeddingPackageConfig'; // Import WeddingPackageConfig
import './WeddingProcess.css';
import './WeddingDifferentiation.css';
import './ContactDialog.css';
import './WeddingPackageConfig.css'; // Import WeddingPackageConfig.css
import './WeddingReview.css';


const WeddingServiceContent = () => {
  const [processHeaderVisible, setProcessHeaderVisible] = useState(false);
  const [processLine1Visible, setProcessLine1Visible] = useState(false);
  const [processLine2Visible, setProcessLine2Visible] = useState(false);
  const processHeaderRef = useRef(null);
  const [isContactDialogOpen, setContactDialogOpen] = useState(false); // State for dialog

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setProcessHeaderVisible(true);
          setTimeout(() => setProcessLine1Visible(true), 200);
          setTimeout(() => setProcessLine2Visible(true), 500);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.5 }
    );

    if (processHeaderRef.current) observer.observe(processHeaderRef.current);

    return () => observer.disconnect();
  }, []);


  return (
    <div className="space-y-20 md:space-y-28">
      <WeddingBenefits />
      <WeddingDifferentiation />
      <div>
        <WeddingReview />
        <AffiliatedHalls />
      </div>

      {/* Process Section */}
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2
          ref={processHeaderRef}
          className={`benefits-title text-3xl md:text-4xl font-bold text-left leading-relaxed ${processHeaderVisible ? 'visible' : ''}`}
          style={{ marginBottom: '35px' }}
        >
          <span className="text-primary block text-[32px] font-normal mb-2" style={{ fontFamily: 'Weddingday' }}>
            Process
          </span>
          <span className="text-3xl md:text-4xl font-mj2 font-black block">
            <span className={`diff-title-line ${processLine1Visible ? 'visible' : ''}`}>모든 여정을 완벽하게,</span>
            <br />
            <span className={`diff-title-line ${processLine2Visible ? 'visible' : ''}`}>VUE가 동행해요</span>
          </span>
          <div className="benefits-divider"></div>
        </h2>
        <WeddingProcess />
      </div>

      {/* NEW PACKAGE CONFIG SECTION */}
      <WeddingPackageConfig />



      <ContactDialog
        isOpen={isContactDialogOpen}
        onClose={() => setContactDialogOpen(false)}
      />
    </div>
  );
};

export default WeddingServiceContent;
