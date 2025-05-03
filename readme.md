# File Path Commenter

A simple Node.js utility that automatically adds relative file path comments to the top of your code files.

## 🚀 Features

- Adds standardized file path comments to JavaScript, TypeScript, and CSS files
- Intelligently replaces existing file path comments
- Preserves the rest of your file content
- Skips `node_modules`, `dist`, `build`, and dot directories
- Logs processed files for easy tracking

## 📋 Why Use This?

Adding file paths as comments at the top of your files provides several benefits:

- **Improved navigation**: Instantly know which file you're looking at when browsing code
- **Better context in code reviews**: File paths are visible in PR diff views
- **Easier debugging**: Quickly identify file locations in error messages or logs
- **Simplified onboarding**: Help new team members understand the project structure

## 📥 Installation

1. Clone this repository or download the script
2. Place the script in your project root directory
3. Make sure you have Node.js installed

## 🔧 Usage

Run the script from your project root:

```bash
node add-file-comments.js
```

### Before:

```typescript
import React from 'react';

const Button = ({ text }) => {
  return <button>{text}</button>;
};

export default Button;
```

### After:

```typescript
// src/components/Button.tsx

import React from 'react';

const Button = ({ text }) => {
  return <button>{text}</button>;
};

export default Button;
```

## ⚙️ Configuration

Edit these variables at the top of the script to customize behavior:

```javascript
// Extensions to process (case-insensitive)
const extensions = ['.ts', '.tsx', '.js', '.css'];

// Directories to skip
const skipDirs = ['node_modules', 'dist', 'build'];
```

## 🛠️ Customizing Comment Style

The script adds comments in these formats:

- **JavaScript/TypeScript**: `// filepath/to/file.js`
- **CSS**: `/* filepath/to/file.css */`

To customize the comment style, modify the `processFile` function in the script.

## 📝 Notes

- The script will overwrite files, so it's recommended to:
  - Commit your changes before running it
  - Run it on a branch first to review changes
- Large projects may take some time to process

## 📃 License

MIT License - Feel free to use, modify, and distribute as needed!

## 🤝 Contributing

Contributions are welcome! Feel free to submit a pull request or open an issue.

### Ideas for Improvement

- Add support for more file types
- Make comment style configurable via CLI args
- Add a dry-run mode
- Create an option to remove comments instead of adding them