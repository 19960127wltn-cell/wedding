import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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

        return NextResponse.json({ success: true });
    } catch (error) {
        console.error('Error saving template selection:', error);
        return NextResponse.json({ success: false, error: 'Failed to save data' }, { status: 500 });
    }
}
