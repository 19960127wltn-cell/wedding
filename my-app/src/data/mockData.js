/**
 * E-GACS 메뉴 권한 관리 시스템 목 데이터
 * 개발 및 테스트용 샘플 데이터
 */

// 조직 트리 샘플 데이터
export const mockOrgTree = [
    {
        org_id: 1,
        org_code: 'EXEC-001',
        org_name: '임원실',
        parent_org_id: null,
        depth: 1,
        has_children: true,
        children: [
            {
                org_id: 2,
                org_code: 'INSP-001',
                org_name: '검사',
                parent_org_id: 1,
                depth: 2,
                has_children: false,
                children: []
            },
            {
                org_id: 3,
                org_code: 'MVP2-001',
                org_name: 'MVP2',
                parent_org_id: 1,
                depth: 2,
                has_children: false,
                children: []
            }
        ]
    },
    {
        org_id: 4,
        org_code: 'PROD-001',
        org_name: '생산팀',
        parent_org_id: null,
        depth: 1,
        has_children: true,
        children: [
            {
                org_id: 5,
                org_code: 'PROD-A',
                org_name: '생산1팀',
                parent_org_id: 4,
                depth: 2,
                has_children: false,
                children: []
            }
        ]
    }
];

// 메뉴 트리 샘플 데이터
export const mockMenuTree = [
    {
        menu_id: 1,
        menu_code: 'HOME',
        menu_name: '홈',
        parent_menu_id: null,
        menu_type: 'PAGE',
        menu_url: '/home',
        depth: 1,
        checked: true,
        access_allowed: 'Y',
        children: []
    },
    {
        menu_id: 2,
        menu_code: 'DASHBOARD',
        menu_name: '대시보드',
        parent_menu_id: null,
        menu_type: 'PAGE',
        menu_url: '/dashboard',
        depth: 1,
        checked: true,
        access_allowed: 'Y',
        children: []
    },
    {
        menu_id: 100,
        menu_code: 'INSPECTION',
        menu_name: '검수',
        parent_menu_id: null,
        menu_type: 'FOLDER',
        depth: 1,
        checked: true,
        access_allowed: 'Y',
        children: [
            {
                menu_id: 101,
                menu_code: 'INSPECTION_MGMT',
                menu_name: '검수관리',
                parent_menu_id: 100,
                menu_type: 'FOLDER',
                depth: 2,
                checked: true,
                access_allowed: 'Y',
                children: [
                    {
                        menu_id: 102,
                        menu_code: 'INSPECTION_ALL',
                        menu_name: '전체 검수 내역',
                        parent_menu_id: 101,
                        menu_type: 'PAGE',
                        menu_url: '/inspection/all',
                        depth: 3,
                        checked: true,
                        access_allowed: 'Y',
                        children: []
                    },
                    {
                        menu_id: 103,
                        menu_code: 'INSPECTION_MY',
                        menu_name: '나의 검수 내역',
                        parent_menu_id: 101,
                        menu_type: 'PAGE',
                        menu_url: '/inspection/my',
                        depth: 3,
                        checked: true,
                        access_allowed: 'Y',
                        children: []
                    }
                ]
            },
            {
                menu_id: 104,
                menu_code: 'AS_MODIFY',
                menu_name: 'AS/수정',
                parent_menu_id: 100,
                menu_type: 'FOLDER',
                depth: 2,
                checked: true,
                access_allowed: 'Y',
                children: [
                    {
                        menu_id: 105,
                        menu_code: 'MODIFY_REQUEST',
                        menu_name: '수정 요청/처리 내역',
                        parent_menu_id: 104,
                        menu_type: 'PAGE',
                        menu_url: '/as/modify-request',
                        depth: 3,
                        checked: true,
                        access_allowed: 'Y',
                        children: []
                    },
                    {
                        menu_id: 106,
                        menu_code: 'REAPPRAISAL',
                        menu_name: '재감정 내역',
                        parent_menu_id: 104,
                        menu_type: 'PAGE',
                        menu_url: '/as/reappraisal',
                        depth: 3,
                        checked: true,
                        access_allowed: 'Y',
                        children: []
                    }
                ]
            }
        ]
    },
    {
        menu_id: 200,
        menu_code: 'VELDOGWONJEOK',
        menu_name: '벨도 권적 관리',
        parent_menu_id: null,
        menu_type: 'PAGE',
        menu_url: '/veldogwonjeok',
        depth: 1,
        checked: false,
        access_allowed: 'N',
        children: []
    },
    {
        menu_id: 300,
        menu_code: 'PAYMENT',
        menu_name: '결제',
        parent_menu_id: null,
        menu_type: 'PAGE',
        menu_url: '/payment',
        depth: 1,
        checked: true,
        access_allowed: 'Y',
        children: []
    }
];

// 목록화면 그리드 컬럼 메타데이터
export const mockGridColumns = {
    102: [ // 전체 검수 내역
        { element_id: 'inspection_datetime', element_name: '검수일시', visible: true, masking_type: 'NONE' },
        { element_id: 'public_datetime', element_name: '공개일시', visible: true, masking_type: 'NONE' },
        { element_id: 'inspection_number', element_name: '검수번호', visible: true, masking_type: 'NONE' },
        { element_id: 'textbook_name', element_name: '교재명', visible: true, masking_type: 'NONE' },
        { element_id: 'user_id', element_name: 'ID', visible: true, masking_type: 'PARTIAL' },
        { element_id: 'inspection_title', element_name: '검수제목', visible: true, masking_type: 'NONE' },
        { element_id: 'institution', element_name: '기관', visible: true, masking_type: 'NONE' },
        { element_id: 'file', element_name: '파일', visible: false, masking_type: 'NONE' }
    ]
};

// 목록화면 버튼 메타데이터
export const mockListButtons = {
    102: [
        { element_id: 'btn_text_broadcast', element_name: '문자방송', visible: true, risk_level: 'MEDIUM' },
        { element_id: 'btn_excel_download', element_name: '엑셀다운로드', visible: true, risk_level: 'LOW' },
        { element_id: 'btn_schedule_broadcast', element_name: '편성방송', visible: true, risk_level: 'MEDIUM' },
        { element_id: 'btn_inspection_reject', element_name: '검수거부오기', visible: false, risk_level: 'HIGH' }
    ]
};

// 상세화면 폼 필드 메타데이터
export const mockDetailFields = {
    102: [
        { element_id: 'category', element_name: '카테고리', visible: true, masking_type: 'NONE' },
        { element_id: 'maintenance_info', element_name: '유지정보', visible: true, masking_type: 'NONE' },
        { element_id: 'regulation_info', element_name: '규정정보', visible: true, masking_type: 'NONE' },
        { element_id: 'print_info', element_name: '인쇄정보', visible: true, masking_type: 'NONE' },
        { element_id: 'collection_info', element_name: '수집/무계', visible: true, masking_type: 'PARTIAL' },
        { element_id: 'processing_info', element_name: '가공정보', visible: true, masking_type: 'NONE' },
        { element_id: 'additional_request', element_name: '추가요청', visible: false, masking_type: 'NONE' }
    ]
};

// 상세화면 버튼 메타데이터
export const mockDetailButtons = {
    102: [
        { element_id: 'btn_urgent_create', element_name: '긴급생성', visible: true, risk_level: 'HIGH' },
        { element_id: 'btn_inspection_reject_detail', element_name: '검수거부오기', visible: true, risk_level: 'HIGH' },
        { element_id: 'btn_inspection_modify', element_name: '검수수정', visible: true, risk_level: 'MEDIUM' },
        { element_id: 'btn_modify_history', element_name: '수정이력', visible: true, risk_level: 'LOW' },
        { element_id: 'btn_modify_request', element_name: '수정요청', visible: true, risk_level: 'MEDIUM' },
        { element_id: 'btn_price_reflect', element_name: '편도금액반영', visible: true, risk_level: 'MEDIUM' },
        { element_id: 'btn_official_request', element_name: '관선요청', visible: false, risk_level: 'HIGH' },
        { element_id: 'btn_pdf_download', element_name: 'PDF다운', visible: true, risk_level: 'LOW' }
    ]
};

// CRUD 권한 초기값
export const mockCRUDPermissions = {
    102: {
        auth_c: 'Y',
        auth_r: 'Y',
        auth_u: 'Y',
        auth_d: 'N'
    }
};
