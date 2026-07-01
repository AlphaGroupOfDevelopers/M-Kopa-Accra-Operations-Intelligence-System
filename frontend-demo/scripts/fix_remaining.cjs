const fs = require('fs');
const path = require('path');

const pagesDir = path.join(__dirname, '../src/pages');
const files = fs.readdirSync(pagesDir).filter(f => f.endsWith('.tsx'));

files.forEach(fileName => {
  const file = path.join(pagesDir, fileName);
  let content = fs.readFileSync(file, 'utf8');
  
  // If useAppContext is imported but NOT used anywhere else in the file, remove the import
  if (content.includes("import { useAppContext } from '../context/AppContext';")) {
    // count occurrences of useAppContext
    const count = (content.match(/useAppContext/g) || []).length;
    // 1 occurrence means it's only in the import
    if (count === 1) {
      content = content.replace(/import \{ useAppContext \} from '\.\.\/context\/AppContext';\r?\n?/g, '');
      fs.writeFileSync(file, content);
      console.log('Fixed unused import in', fileName);
    }
  }
});
