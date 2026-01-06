#!/bin/bash

# --- 설정 영역 ---
LINK_FILE="link.txt"
PROMPT_FILE="prompt.txt"
GLOBALS_CSS="globals.css"
DESIGN_GUIDE="app/design_guide/page.jsx"
COMPONENTS_DIR="components"
# ----------------

if [ ! -f "$LINK_FILE" ]; then
    echo "❌ $LINK_FILE 파일이 없습니다."
    exit 1
fi

# 라인 수 계산
TOTAL_LINES=$(grep -c '^http' "$LINK_FILE")
CURRENT_COUNT=0

echo "🚀 안전한 순차 업데이트 모드를 시작합니다. (총 $TOTAL_LINES 개)"

while read -r FIGMA_URL || [ -n "$FIGMA_URL" ]; do
    # 빈 줄이나 주석 제외
    [[ -z "$FIGMA_URL" || "$FIGMA_URL" == #* ]] && continue
    
    CURRENT_COUNT=$((CURRENT_COUNT + 1))
    
    echo ""
    echo "===================================================="
    echo " [$CURRENT_COUNT / $TOTAL_LINES] 현재 대상 링크:"
    echo " $FIGMA_URL"
    echo "===================================================="
    
    # 1. 피그마 노드 이름 분석
    echo "🔍 피그마에서 컴포넌트명을 확인하고 있습니다..."
    COMPONENT_NAME=$(node -e "
const axios = require('axios');
async function getName() {
    try {
        const url = '$FIGMA_URL';
        const fileKey = url.split('/design/')[1].split('/')[0];
        const nodeId = new URL(url).searchParams.get('node-id').replace('-', ':');
        const { data } = await axios.get('https://api.figma.com/v1/files/' + fileKey + '/nodes?ids=' + nodeId, {
            headers: { 'X-Figma-Token': 'YOUR_FIGMA_API_KEY' }
        });
        console.log(data.nodes[nodeId].document.name.replace(/\s+/g, ''));
    } catch (e) { process.exit(1); }
}
getName();
")

    if [ -z "$COMPONENT_NAME" ]; then
        echo "❌ 컴포넌트명을 가져오지 못했습니다. 링크를 건너뜁니다."
        continue
    fi

    echo "📦 매칭된 파일: ${COMPONENTS_DIR}/${COMPONENT_NAME}.jsx"
    
    # 사용자 확인 단계 (오류 방지 핵심)
    read -p "❓ 위 컴포넌트를 업데이트하시겠습니까? (Enter: 진행 / s: 건너뛰기 / q: 종료): " USER_INPUT
    
    if [[ "$USER_INPUT" == "q" ]]; then
        echo "👋 작업을 종료합니다."
        break
    elif [[ "$USER_INPUT" == "s" ]]; then
        echo "⏭️ 건너뜁니다."
        continue
    fi

    TARGET_FILE="${COMPONENTS_DIR}/${COMPONENT_NAME}.jsx"
    if [ ! -f "$TARGET_FILE" ]; then touch "$TARGET_FILE"; fi

    # 2. 컴포넌트 세분화 업데이트 실행
    echo "🔄 Gemini CLI가 코드를 업데이트하고 있습니다..."
    gemini run --prompt "$(cat $PROMPT_FILE)" \
               --files "$TARGET_FILE" "$GLOBALS_CSS" \
               --input "$FIGMA_URL" > "${TARGET_FILE}.tmp"
    
    if [ $? -eq 0 ]; then
        mv "${TARGET_FILE}.tmp" "$TARGET_FILE"
        echo "✅ [$COMPONENT_NAME] 코드 업데이트 완료!"
    else
        echo "❌ 업데이트 중 오류가 발생했습니다. 임시 파일을 삭제합니다."
        rm "${TARGET_FILE}.tmp"
        continue
    fi

    # 3. 디자인 가이드 페이지 업데이트
    echo "📝 디자인 가이드에 예시를 추가하는 중..."
    gemini run --prompt "컴포넌트($COMPONENT_NAME)의 세분화된 모든 Variant, State, Size 예시를 $DESIGN_GUIDE 파일에 새로운 섹션으로 추가하거나 업데이트해줘." \
               --files "$TARGET_FILE" "$DESIGN_GUIDE" > "${DESIGN_GUIDE}.tmp"
    
    mv "${DESIGN_GUIDE}.tmp" "$DESIGN_GUIDE"
    echo "✨ 디자인 가이드 업데이트 완료."

done < "$LINK_FILE"

echo ""
echo "🎉 모든 개별 확인 프로세스가 완료되었습니다."