'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import './TemplateDialog.css';
import TemplateSelectionForm from '@/components/features/template/TemplateSelectionForm';

const TemplateDialog = ({ isOpen, onClose, image }) => {
    const [isFormOpen, setIsFormOpen] = useState(false);

    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === 'Escape') {
                if (isFormOpen) {
                    setIsFormOpen(false);
                } else {
                    onClose();
                }
            }
        };
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            document.addEventListener('keydown', handleEscape);
        }
        return () => {
            document.body.style.overflow = 'unset';
            document.removeEventListener('keydown', handleEscape);
        };
    }, [isOpen, isFormOpen, onClose]);

    if (!isOpen || !image) return null;

    return (
        <>
            <div className="template-dialog-overlay" onClick={onClose}>
                <div className="template-dialog-full-container" onClick={(e) => e.stopPropagation()}>
                    <button className="template-dialog-close-fixed" onClick={onClose}>
                        <X size={32} />
                    </button>

                    <div className="template-dialog-scroll-area">
                        <div className="template-dialog-full-content">
                            <div className="template-detail-header">
                                <p className="template-detail-no font-mj2">Selected Template</p>
                                <h3 className="template-detail-title font-mj2">{image.alt}</h3>
                            </div>

                            <div className="template-detail-images">
                                <div className="detail-image-wrapper">
                                    <Image
                                        src="/images/templat_detail1.png"
                                        alt={`${image.alt} Detail 1`}
                                        width={1200}
                                        height={1600}
                                        className="detail-image"
                                        priority
                                    />
                                </div>
                                <div className="detail-image-wrapper">
                                    <Image
                                        src="/images/templat_detail2.png"
                                        alt={`${image.alt} Detail 2`}
                                        width={1200}
                                        height={1600}
                                        className="detail-image"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="template-dialog-footer">
                        <button
                            className="template-select-button font-mj2"
                            onClick={() => setIsFormOpen(true)}
                        >
                            템플릿 선택하기
                        </button>
                    </div>
                </div>
            </div>

            {/* Selection Form Dialog Overlay */}
            <TemplateSelectionForm
                isOpen={isFormOpen}
                onClose={() => setIsFormOpen(false)}
                templateName={image.alt}
            />
        </>
    );
};

export default TemplateDialog;
