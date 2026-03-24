const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\jisu\\Documents\\wedding\\wedding\\my-app\\public\\images\\wedding\\Frame';

const renameFilesInFolder = (subfolder, prefix) => {
  const dirPath = path.join(baseDir, subfolder);
  if (!fs.existsSync(dirPath)) return;
  
  const files = fs.readdirSync(dirPath).filter(f => fs.statSync(path.join(dirPath, f)).isFile() && /\.(jpg|jpeg|png|gif|JPG|PNG)$/i.test(f));
  files.sort();

  files.forEach((file, index) => {
    const ext = path.extname(file);
    const newName = `${prefix}_${String(index + 1).padStart(2, '0')}${ext}`;
    const oldPath = path.join(dirPath, file);
    const newPath = path.join(dirPath, newName);
    
    if (oldPath !== newPath) {
      fs.renameSync(oldPath, newPath);
      // console.log(`Renamed in ${subfolder}: ${file} -> ${newName}`);
    }
  });
};

renameFilesInFolder('2cut', 'Frame_2C');
renameFilesInFolder('4cut', 'Frame_4C');

console.log('Renaming finished.');
