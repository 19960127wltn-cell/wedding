'use client';
import React, { useState } from 'react';
import { X, CheckCircle2 } from 'lucide-react';
import './TemplateSelectionForm.css';

const TemplateSelectionForm = ({ isOpen, onClose, templateName }) => {
    const [formData, setFormData] = useState({
        name: '',
        weddingDate: '',
        groomNameEn: '',
        brideNameEn: '',
        branch: '서울'
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

        if (!formData.weddingDate) {
            showToast('예식 일자를 선택해주세요.');
            return;
        }

        if (!formData.groomNameEn.trim() || !formData.brideNameEn.trim()) {
            showToast('신랑/신부 영문 성함을 입력해주세요.');
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
                    <h3 className="form-title font-mj2">템플릿 선택</h3>
                    <p className="form-subtitle">템플릿명: <span className="text-primary font-bold">{templateName}</span></p>
                </div>

                <form onSubmit={handleSubmit} className="selection-form" noValidate>
                    <div className="form-group">
                        <label>지점 선택</label>
                        <div className="branch-chips">
                            {['서울', '대전', '광주', '부산'].map((city) => (
                                <button
                                    key={city}
                                    type="button"
                                    className={`branch-chip ${formData.branch === city ? 'active' : ''}`}
                                    onClick={() => setFormData({ ...formData, branch: city })}
                                >
                                    {city}
                                </button>
                            ))}
                        </div>
                    </div>

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
                        <label>예식 일자</label>
                        <input
                            type="date"
                            value={formData.weddingDate}
                            onChange={e => setFormData({ ...formData, weddingDate: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>신랑 영문 성함</label>
                        <input
                            type="text"
                            placeholder="예시)Hong Gildong"
                            value={formData.groomNameEn}
                            onChange={e => setFormData({ ...formData, groomNameEn: e.target.value })}
                        />
                    </div>

                    <div className="form-group">
                        <label>신부 영문 성함</label>
                        <input
                            type="text"
                            placeholder="예시)Hong Gildong"
                            value={formData.brideNameEn}
                            onChange={e => setFormData({ ...formData, brideNameEn: e.target.value })}
                        />
                    </div>

                    <button type="submit" className="form-submit-button font-mj2" disabled={isLoading}>
                        {isLoading ? '신청 중...' : '선택 완료'}
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
