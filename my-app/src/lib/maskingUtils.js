/**
 * 마스킹 유틸리티 함수
 * 명세서 6장 마스킹 정책에 따라 구현
 */

/**
 * 값에 마스킹을 적용합니다
 * @param {string} value - 원본 값
 * @param {string} maskingType - 마스킹 유형 ('NONE', 'PARTIAL', 'FULL')
 * @returns {string} 마스킹이 적용된 값
 */
export function applyMasking(value, maskingType) {
    if (!value || maskingType === 'NONE') {
        return value;
    }

    if (maskingType === 'FULL') {
        return '*'.repeat(value.length);
    }

    if (maskingType === 'PARTIAL') {
        return applyPartialMasking(value);
    }

    return value;
}

/**
 * 부분 마스킹 적용 (1/3 기준)
 * @param {string} value - 원본 값
 * @returns {string} 부분 마스킹이 적용된 값
 */
function applyPartialMasking(value) {
    const length = value.length;

    if (length <= 2) {
        // 2자 이하는 마지막 1자만 마스킹
        return value.substring(0, length - 1) + '*';
    }

    // 1/3 기준 마스킹
    const maskLength = Math.ceil(length / 3);
    const startVisible = Math.floor((length - maskLength) / 2);
    const endVisible = length - maskLength - startVisible;

    return (
        value.substring(0, startVisible) +
        '*'.repeat(maskLength) +
        value.substring(length - endVisible)
    );
}

/**
 * 마스킹 미리보기 텍스트 생성
 * @param {string} value - 원본 값
 * @param {string} maskingType - 마스킹 유형
 * @returns {string} 미리보기 텍스트
 */
export function getMaskingPreview(value, maskingType) {
    if (!value) return '';

    const masked = applyMasking(value, maskingType);
    return `원본: ${value} → 마스킹: ${masked}`;
}
