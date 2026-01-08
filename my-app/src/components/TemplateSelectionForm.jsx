'use client';
import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import './TemplateSelectionForm.css';

const TemplateSelectionForm = ({ isOpen, onClose, templateName }) => {
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        memo: '',
        agreed: false
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [toast, setToast] = useState({ visible: false, message: '' });

    if (!isOpen) return null;

    const showToast = (message) => {
        setToast({ visible: true, message });
        setTimeout(() => {
            setToast({ visible: false, message: '' });
        }, 2000);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.name.trim()) {
            showToast('성함을 입력해주세요.');
            return;
        }

        if (!formData.phone.trim()) {
            showToast('연락처를 입력해주세요.');
            return;
        }

        if (!formData.agreed) {
            showToast('개인정보 처리방침에 동의해주세요.');
            return;
        }

        setIsLoading(true);

        try {
            const response = await fetch('/api/template-select', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ formData, templateName }),
            });

            if (response.ok) {
                setIsSubmitted(true);
            } else {
                showToast('신청 중 오류가 발생했습니다. 다시 시도해주세요.');
            }
        } catch (error) {
            console.error('Error:', error);
            showToast('네트워크 오류가 발생했습니다.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isSubmitted) {
        return (
            <div className="form-dialog-overlay" onClick={onClose}>
                <div className="form-dialog-container success-container" onClick={e => e.stopPropagation()}>
                    <div className="success-content">
                        <CheckCircle2 size={64} className="success-icon" />
                        <h3 className="success-title font-mj2">신청이 완료되었습니다</h3>
                        <p className="success-desc">확인 후 담당 매니저가 연락드리겠습니다.</p>
                        <button className="form-close-button font-mj2" onClick={onClose}>닫기</button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="form-dialog-overlay" onClick={onClose}>
            <div className="form-dialog-container" onClick={e => e.stopPropagation()}>
                <button className="form-x-button" onClick={onClose}>
                    <X size={24} />
                </button>

                <div className="form-header">
                    <h3 className="form-title font-mj2">템플릿 선택 신청</h3>
                    <p className="form-subtitle">선택하신 템플릿: <span className="text-primary font-bold">{templateName}</span></p>
                </div>

                <form onSubmit={handleSubmit} className="selection-form" noValidate>
                    <div className="form-group">
                        <label>예약자 성함</label>
                        <input
                            type="text"
                            placeholder="성함을 입력해주세요"
                            value={formData.name}
                            onChange={e => setFormData({ ...formData, name: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>예약자 번호</label>
                        <input
                            type="tel"
                            placeholder="연락처를 입력해주세요"
                            value={formData.phone}
                            onChange={e => setFormData({ ...formData, phone: e.target.value })}
                        />
                    </div>



                    <div className="form-group">
                        <label>메모</label>
                        <textarea
                            placeholder="추가 요청사항이 있다면 입력해주세요"
                            rows="3"
                            value={formData.memo}
                            onChange={e => setFormData({ ...formData, memo: e.target.value })}
                        ></textarea>
                    </div>

                    <div className="form-agreement">
                        <label className="checkbox-container">
                            <input
                                type="checkbox"
                                checked={formData.agreed}
                                onChange={e => setFormData({ ...formData, agreed: e.target.checked })}
                            />
                            <span className="checkmark"></span>
                            <span className="agreement-text">개인정보 처리방침에 동의합니다</span>
                        </label>
                    </div>

                    <button type="submit" className="form-submit-button font-mj2" disabled={isLoading}>
                        {isLoading ? '신청 중...' : '신청 완료하기'}
                    </button>
                </form>
            </div>

            {toast.visible && (
                <div className="toast-popup">
                    {toast.message}
                </div>
            )}
        </div>
    );
};

export default TemplateSelectionForm;
