const fs = require('fs');
const path = require('path');

// 递归查找所有 Markdown 文件
function findMarkdownFiles(dir) {
  let results = [];
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      results = results.concat(findMarkdownFiles(filePath));
    } else if (path.extname(file) === '.md') {
      results.push(filePath);
    }
  });
  
  return results;
}

// 修复 Markdown 文件中的 SSR 问题
function fixMarkdownFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  
  // 检查是否包含 Cesium 相关代码
  if (content.includes('import * Cesium') || content.includes('import * as Cesium')) {
    // 包装 Demo 组件在 ClientOnly 中
    content = content.replace(/<Demo \/>/g, '<ClientOnly>\n  <Demo />\n</ClientOnly>');
    
    // 如果文件中还没有 ClientOnly 导入，在 script setup 中添加
    if (!content.includes('ClientOnly')) {
      content = content.replace(/(<script setup>)/, '$1\nimport { ClientOnly } from \'vitepress\'');
    }
    
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Fixed SSR issues in: ${filePath}`);
  }
}

// 主函数
function main() {
  const docsDir = path.join(__dirname, 'docs', 'src');
  const markdownFiles = findMarkdownFiles(docsDir);
  
  markdownFiles.forEach(file => {
    try {
      fixMarkdownFile(file);
    } catch (error) {
      console.error(`Error fixing ${file}:`, error);
    }
  });
  
  console.log('SSR fix completed!');
}

main();