import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import * as XLSX from 'xlsx';

export async function POST(request) {
    try {
        const body = await request.json();
        const { formData, templateName } = body;

        const filePath = path.join(process.cwd(), 'src/data/template_selections.json');

        // Read existing data
        let existingData = [];
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            existingData = JSON.parse(fileContent);
        }

        // Add new selection
        const newSelection = {
            id: Date.now(),
            ...formData,
            templateName,
            submittedAt: new Date().toISOString()
        };

        existingData.push(newSelection);

        // Save back to file
        fs.writeFileSync(filePath, JSON.stringify(existingData, null, 2));

        // Update Excel file in real-time
        try {
            const excelFilePath = path.resolve(process.cwd(), 'public/template_selections.xlsx');
            
            const worksheet = XLSX.utils.json_to_sheet(existingData);
            const workbook = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(workbook, worksheet, 'Selections');
            
            // Generate buffer and write using fs to get better error details
            const buf = XLSX.write(workbook, { type: 'buffer', bookType: 'xlsx' });
            fs.writeFileSync(excelFilePath, buf);
            
            console.log('Excel file successfully updated in real-time');
        } catch (excelError) {
            if (excelError.code === 'EBUSY') {
                console.error('CRITICAL: Excel file is currently open in another program and cannot be updated.');
            } else {
                console.error('CRITICAL: Error updating Excel file:', excelError);
            }
        }

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving template selection:', error);
        return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
    }
}
