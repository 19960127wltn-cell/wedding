import React from 'react';
import './WeddingProcess.css';

const WeddingProcess = () => {
  return (
    <section className="process-section">
      <div className="road-container">
        <svg className="road-svg" viewBox="0 0 1200 300" preserveAspectRatio="none">
          <path d="M0,50 C150,50 250,250 400,250 C550,250 650,50 800,50 C950,50 1050,250 1200,250" 
                fill="none" stroke="#B4A48F" strokeWidth="2" strokeDasharray="10, 10" />
        </svg>

        <div className="step-node">
          <span className="number-badge">STEP 01</span>
          <div className="icon-circle">
            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div className="step-content">
            <b>상담 신청</b>
            <p>카톡으로 나누는<br/>첫 번째 설렘</p>
          </div>
        </div>

        <div className="step-node">
          <span className="number-badge">STEP 02</span>
          <div className="icon-circle">
            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line></svg>
          </div>
          <div className="step-content">
            <b>일정 확인</b>
            <p>베뉴 동선과<br/>스케줄 점검</p>
          </div>
        </div>

        <div className="step-node">
          <span className="number-badge">STEP 03</span>
          <div className="icon-circle">
            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path></svg>
          </div>
          <div className="step-content">
            <b>예약 확정</b>
            <p>전담 팀 배정 및<br/>준비 착수</p>
          </div>
        </div>

        <div className="step-node">
          <span className="number-badge">STEP 04</span>
          <div className="icon-circle">
            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19l7-7 3 3-7 7-3-3z"></path><path d="M18 13l-1.5-7.5L4 2l3.5 12.5L13 18l5-5z"></path></svg>
          </div>
          <div className="step-content">
            <b>디자인 커스텀</b>
            <p>우리만의<br/>맞춤 템플릿 제작</p>
          </div>
        </div>

        <div className="step-node">
          <span className="number-badge">STEP 05</span>
          <div className="icon-circle">
            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><line x1="12" y1="1" x2="12" y2="23"></line><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
          </div>
          <div className="step-content">
            <b>최종 체크</b>
            <p>완벽한 진행을 위한<br/>장비 재점검</p>
          </div>
        </div>

        <div className="step-node">
          <span className="number-badge">STEP 06</span>
          <div className="icon-circle" style={{ background: 'var(--primary)', border: 'none' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>
          </div>
          <div className="step-content">
            <b>행사 진행</b>
            <p>가장 빛나는 순간의<br/>행복한 촬영</p>
          </div>
        </div>

        <div className="step-node">
          <span className="number-badge">STEP 07</span>
          <div className="icon-circle">
            <svg viewBox="0 0 24 24" fill="none" strokeLinecap="round" strokeLinejoin="round"><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"></path></svg>
          </div>
          <div className="step-content">
            <b>기록 전달</b>
            <p>데이터와 메시지북<br/>안전한 전달</p>
          </div>
        </div>

      </div>
    </section>
  );
};

export default WeddingProcess;