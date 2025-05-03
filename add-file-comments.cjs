const fs = require('fs');
const path = require('path');

// Root directory of your project
const rootDir = path.resolve(__dirname);

// Extensions to process (case-insensitive)
const extensions = ['.ts', '.tsx', '.js', '.css'];

// Function to process each file
function processFile(filePath) {
  const relativePath = path.relative(rootDir, filePath);
  
  // Read the file content
  let content = fs.readFileSync(filePath, 'utf8');
  const ext = path.extname(filePath).toLowerCase();
  
  // Remove existing file path comment if present
  if (ext === '.ts' || ext === '.tsx' || ext === '.js') {
    // Check for existing single-line comment at the top
    const lines = content.split('\n');
    let linesToRemove = 0;
    
    // Skip empty lines at the start
    while (linesToRemove < lines.length && lines[linesToRemove].trim() === '') {
      linesToRemove++;
    }
    
    // Check if there's a file path comment
    if (linesToRemove < lines.length && lines[linesToRemove].trim().startsWith('//')) {
      // Remove the comment line and any following empty lines
      linesToRemove++;
      while (linesToRemove < lines.length && lines[linesToRemove].trim() === '') {
        linesToRemove++;
      }
      
      content = lines.slice(linesToRemove).join('\n');
    }
    
    // Add the new comment
    content = `// ${relativePath}\n\n${content}`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated comment in: ${relativePath}`);
  } else if (ext === '.css') {
    // For CSS files, check for block comment at the start
    const cssCommentRegex = /^\s*\/\*[\s\S]*?\*\/\s*\n*/;
    content = content.replace(cssCommentRegex, '');
    
    // Add the new comment
    content = `/* ${relativePath} */\n\n${content}`;
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Updated comment in: ${relativePath}`);
  }
}

// Function to recursively process directories
function processDirectory(directoryPath) {
  const items = fs.readdirSync(directoryPath);
  
  for (const item of items) {
    const itemPath = path.join(directoryPath, item);
    const stats = fs.statSync(itemPath);
    
    if (stats.isDirectory()) {
      // Skip node_modules and other build directories
      if (item !== 'node_modules' && item !== 'dist' && item !== 'build' && !item.startsWith('.')) {
        processDirectory(itemPath);
      }
    } else if (stats.isFile() && extensions.includes(path.extname(itemPath).toLowerCase())) {
      processFile(itemPath);
    }
  }
}

// Start the processing from the root directory
processDirectory(rootDir);
console.log('Completed updating file path comments!');