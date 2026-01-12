const fs = require('fs');
const path = require('path');
const XLSX = require('xlsx');

// 1. JSON 파일 경로 설정
const jsonFilePath = path.join(__dirname, '../src/data/template_selections.json');
const excelFilePath = path.join(__dirname, '../public/template_selections.xlsx');

async function exportToExcel() {
  try {
    // 2. JSON 데이터 읽기
    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    // 3. 워크북 및 워크시트 생성
    const worksheet = XLSX.utils.json_to_sheet(jsonData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selections');

    // 4. 엑셀 파일로 저장
    XLSX.writeFile(workbook, excelFilePath);

    console.log(`Successfully exported to ${excelFilePath}`);
  } catch (error) {
    console.error('Error during Excel export:', error);
  }
}

exportToExcel();
