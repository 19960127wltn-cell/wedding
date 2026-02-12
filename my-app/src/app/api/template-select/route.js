import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const XLSX = require('xlsx');

export async function POST(request) {
    try {
        const body = await request.json();
        const { formData, templateName } = body;

        const dataDir = path.join(process.cwd(), 'src/data');
        if (!fs.existsSync(dataDir)) {
            fs.mkdirSync(dataDir, { recursive: true });
        }

        const filePath = path.join(dataDir, 'template_selections.json');

        // Read existing data with safety
        let existingData = [];
        if (fs.existsSync(filePath)) {
            try {
                const fileContent = fs.readFileSync(filePath, 'utf8');
                existingData = fileContent ? JSON.parse(fileContent) : [];
            } catch (e) {
                console.error('JSON Parse Error:', e);
                existingData = [];
            }
        }

        // Add new selection (Mapping updated fields)
        const newSelection = {
            id: Date.now(),
            customerName: formData.name,
            weddingDate: formData.weddingDate,
            branch: formData.branch,
            groomNameEn: formData.groomNameEn,
            brideNameEn: formData.brideNameEn,
            templateName,
            submittedAt: new Date().toLocaleString('ko-KR')
        };

        existingData.push(newSelection);

        // Save back to JSON
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

        // Update Excel files by branch
        try {
            const excelDir = path.join(process.cwd(), 'public', 'data');
            if (!fs.existsSync(excelDir)) {
                fs.mkdirSync(excelDir, { recursive: true });
            }
            const branches = ['서울', '대전', '광주', '부산'];

            for (const branchName of branches) {
                // Filter data for this specific branch
                const branchData = existingData
                    .filter(item => item.branch === branchName)
                    .map(({ id, ...rest }) => rest); // Exclude ID

                if (branchData.length >= 0) {
                    const excelFilePath = path.join(excelDir, `template_selections_${branchName}.xlsx`);

                    const worksheet = XLSX.utils.json_to_sheet(branchData);
                    const workbook = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(workbook, worksheet, 'Selections');

                    const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
                    fs.writeFileSync(excelFilePath, buf);
                }
            }

            console.log('Branch-specific Excel files updated');
        } catch (excelError) {
            console.warn('Excel Update Warning:', excelError.message);
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }
}
