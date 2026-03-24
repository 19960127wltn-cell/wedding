const fs = require('fs');
const path = require('path');

const baseDir = 'C:\\Users\\jisu\\Documents\\wedding\\wedding\\my-app\\public\\images\\popup\\popup_image';
const outputFilePath = 'C:\\Users\\jisu\\Documents\\wedding\\wedding\\my-app\\src\\data\\references_manifest.json';

const getFolders = (dir) => {
  return fs.readdirSync(dir).filter(f => fs.statSync(path.join(dir, f)).isDirectory());
};

const folders = getFolders(baseDir);
const groups = {};

folders.forEach(folder => {
  let baseName = folder.replace(/[\d\s-]+$/, '').trim();
  
  // Normalization
  if (baseName === "판교반디유치") baseName = "판교반디유치원";
  if (baseName === "오감자페스타") baseName = "오감자페스티벌";
  if (baseName === "생일파") baseName = "생일파티";
  if (baseName === "과천초등학") baseName = "과천초등학교";
  if (baseName === "엘지유플러") baseName = "LG U+";
  if (baseName === "문원초등학") baseName = "문원초등학교";
  
  const userNaming = {
    "drift": "DRIFT",
    "geistlich": "Geistlich",
    "gilead": "Gilead",
    "w컨셉": "W컨셉",
    "로레알": "L'OREAL",
    "모더나": "MODERNA",
    "이솝": "AESOP"
  };

  const finalName = userNaming[baseName] || baseName;

  if (!groups[finalName]) {
    groups[finalName] = [];
  }
  groups[finalName].push({ folder, originalName: baseName });
});

const categorize = (name, originalName) => {
  const n = (name + " " + originalName).toLowerCase();
  if (n.includes('대학교') || n.includes('초등학교') || n.includes('중학교') || n.includes('고등학교') || n.includes('유치원') || n.includes('학교')) return 'school';
  if (n.includes('팝업') || n.includes('스토어') || n.includes('스튜디오') || n.includes('바닐라코') || n.includes('올리브영') || n.includes('이솝') || n.includes('w컨셉') || n.includes('마리끌레르') || n.includes('aesop') || n.includes('drift') || n.includes("로레알") || n.includes("바이비") || n.includes("닥터슈라클")) return 'popup';
  if (n.includes('병원') || n.includes('청') || n.includes('재단') || n.includes('건강보험') || n.includes('복지') || n.includes('문화재단') || n.includes('시청') || n.includes('국세청') || n.includes('보건')) return 'public';
  return 'corp';
};

const manifest = Object.keys(groups).sort().map((entity, index) => {
  const images = [];
  const meta = groups[entity];
  meta.forEach(m => {
    const folderPath = path.join(baseDir, m.folder);
    // Extended extensions list
    const files = fs.readdirSync(folderPath).filter(f => fs.statSync(path.join(folderPath, f)).isFile() && /\.(jpg|jpeg|png|gif|JPG|PNG|WEBP|webp|HEIC|heic)$/i.test(f));
    files.forEach(file => {
      images.push(`/images/popup/popup_image/${m.folder}/${file}`);
    });
  });

  return {
    id: index + 1,
    entity: entity,
    title: entity,
    images: images, // This is the full list!
    thumbnail: images[0] || '',
    category: categorize(entity, meta[0].originalName)
  };
});

fs.writeFileSync(outputFilePath, JSON.stringify(manifest, null, 2));
console.log(`Updated manifest with full folder sync for ${manifest.length} entities.`);
