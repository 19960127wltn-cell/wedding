const fs = require('fs');
const path = require('path');
const { imageSize } = require('image-size');

const dir = 'C:\\Users\\jisu\\Documents\\wedding\\wedding\\my-app\\public\\images\\wedding\\Frame';
const cut2Dir = path.join(dir, '2cut');
const cut4Dir = path.join(dir, '4cut');

if (!fs.existsSync(cut2Dir)) fs.mkdirSync(cut2Dir);
if (!fs.existsSync(cut4Dir)) fs.mkdirSync(cut4Dir);

const files = fs.readdirSync(dir).filter(f => {
  const fullPath = path.join(dir, f);
  return fs.statSync(fullPath).isFile() && /\.(jpg|jpeg|png|gif|JPG|PNG)$/i.test(f);
});

files.forEach(file => {
  const filePath = path.join(dir, file);
  try {
    const buffer = fs.readFileSync(filePath);
    const dimensions = imageSize(buffer);
    const ratio = dimensions.height / dimensions.width;
    const targetDir = ratio >= 1.8 ? cut2Dir : cut4Dir; // Adjusted threshold to 1.8 for strips
    fs.renameSync(filePath, path.join(targetDir, file));
    // console.log(`Moved ${file} (Ratio: ${ratio.toFixed(2)}) -> ${path.basename(targetDir)}`);
  } catch (e) {
    // console.error(`Error processing ${file}: ${e.message}`);
  }
});

console.log('Finished categorization.');
