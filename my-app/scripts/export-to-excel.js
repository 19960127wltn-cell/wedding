const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// 1. 경로 설정
const jsonFilePath = path.join(__dirname, '../src/data/template_selections.json');
const publicDirPath = path.join(__dirname, '../public');

async function exportToExcel() {
  try {
    // 2. JSON 데이터 읽기
    if (!fs.existsSync(jsonFilePath)) {
      console.log('JSON file does not exist.');
      return;
    }
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // 3. 지점 목록
    const branches = ['서울', '대전', '광주', '부산'];

    // 4. 각 지점별로 엑셀 파일 생성
    branches.forEach(branchName => {
      // 해당 지점 데이터만 필터링 및 ID 제외
      const branchData = jsonData
        .filter(item => item.branch === branchName)
        .map(({ id, ...rest }) => rest);

      const worksheet = XLSX.utils.json_to_sheet(branchData);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, 'Selections');

      const excelFileName = `template_selections_${branchName}.xlsx`;
      const excelFilePath = path.join(publicDirPath, excelFileName);

      // 엑셀 파일로 저장
      XLSX.writeFile(workbook, excelFilePath);
      console.log(`Successfully exported branch [${branchName}] to ${excelFilePath}`);
    });

    console.log('\nAll branch-specific Excel files updated successfully.');
  } catch (error) {
    console.error('Error during Excel export:', error);
  }
}

exportToExcel();
