const fs = require('fs');
const path = require('path');

const fixFiles = [
  'DataEntry.tsx',
  'Login.tsx',
  'MoreMenu.tsx',
  'OperationsIntelligence.tsx',
  'Shops.tsx',
  'TeamMembers.tsx'
];

fixFiles.forEach(fileName => {
  const file = path.join(__dirname, '../src/pages', fileName);
  let content = fs.readFileSync(file, 'utf8');
  
  // replace import
  content = content.replace(/import \{ useApp \} from '\.\.\/context\/AppContext';/g, "import { useAppContext } from '../context/AppContext';");
  
  const replacePattern = /const\s+\{([^}]+)\}\s*=\s*useApp\(\);/g;
  let match = replacePattern.exec(content);
  if (match) {
    const vars = match[1].split(',').map(v => v.trim()).filter(Boolean);
    
    let imports = [];
    let hooksCode = [];
    
    if (vars.includes('salesRecords')) { imports.push('useSalesRecords'); hooksCode.push('const { data: salesRecords } = useSalesRecords();'); }
    if (vars.includes('agents')) { imports.push('useAgents'); hooksCode.push('const { data: agents } = useAgents();'); }
    if (vars.includes('shops')) { imports.push('useShops'); hooksCode.push('const { data: shops } = useShops();'); }
    if (vars.includes('assignments')) { imports.push('useAssignments'); hooksCode.push('const { data: assignments } = useAssignments();'); }
    
    const remainingVars = vars.filter(v => !['salesRecords', 'agents', 'shops', 'assignments'].includes(v));
    
    let newAppCall = '';
    if (remainingVars.length > 0) {
      newAppCall = `const { ${remainingVars.join(', ')} } = useAppContext();`;
    }
    
    const replacementCode = `${hooksCode.join('\n  ')}\n  ${newAppCall}`;
    content = content.replace(match[0], replacementCode);
    
    if (imports.length > 0) {
      content = `import { ${imports.join(', ')} } from '../hooks/useQueries';\n` + content;
    }
  }
  
  fs.writeFileSync(file, content);
  console.log(`Updated ${fileName}`);
});

// Fix Layout.tsx
const layoutFile = path.join(__dirname, '../src/components/Layout.tsx');
let layoutContent = fs.readFileSync(layoutFile, 'utf8');
layoutContent = layoutContent.replace(/useAppContextContext/g, 'useAppContext');
fs.writeFileSync(layoutFile, layoutContent);
console.log('Fixed Layout.tsx');

