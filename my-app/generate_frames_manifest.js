const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

const baseDir = 'C:\\Users\\jisu\\Documents\\wedding\\wedding\\my-app\\public\\images\\wedding\\Frame';
const folders = ['2cut', '4cut'];

const frames = [];
let globalId = 1;

folders.forEach(folder => {
  const dirPath = path.join(baseDir, folder);
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath).filter(f => fs.statSync(path.join(dirPath, f)).isFile() && /\.(jpg|jpeg|png|gif|JPG|PNG)$/i.test(f));
  files.sort();

  files.forEach(file => {
    const filePath = path.join(dirPath, file);
    try {
      const buffer = fs.readFileSync(filePath);
      const dimensions = imageSize(buffer);
      
      frames.push({
        id: globalId++,
        src: `/images/wedding/Frame/${folder}/${file}`,
        alt: `Wedding Frame ${String(globalId - 1).padStart(2, '0')}`,
        category: folder === '2cut' ? '2 Cut' : '4 Cut',
        width: dimensions.width,
        height: dimensions.height
      });
    } catch (e) {
      console.error(`Error processing ${filePath}: ${e.message}`);
    }
  });
});

fs.writeFileSync('C:\\Users\\jisu\\Documents\\wedding\\wedding\\my-app\\src\\data\\wedding_frames_manifest.json', JSON.stringify(frames, null, 2));
console.log(`Generated manifest with ${frames.length} images from 2cut/4cut subfolders.`);
