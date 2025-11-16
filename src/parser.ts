import * as path from 'path';
import MarkdownIt from 'markdown-it';
import mathjax3 from 'markdown-it-mathjax3';
import { imgSize } from "@mdit/plugin-img-size";

const md = new MarkdownIt({
  html: true,
  linkify: true,
  typographer: true,
  breaks: true,
  xhtmlOut: true
})
  .use(mathjax3)
  .use(imgSize);

export function resolveLinks(markdown: string, baseDir: string): string {
  // Regex to match markdown links: [text](url)
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  return markdown.replace(linkRegex, (match, text, url) => {
    // Skip if already absolute (starts with http, https, file://, or /)
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('file://') || url.startsWith('/')) {
      return match;
    }
    // Resolve relative path
    const resolvedPath = path.resolve(baseDir, url);
    // Convert to file:// URL
    const fileUrl = 'file://' + resolvedPath.replace(/\\/g, '/');
    return `[${text}](${fileUrl})`;
  });
}

export function convertMarkdownToHtml(markdown: string): string {
  // Convert new image size format {height: X, width: Y} to old format =YxX
  const imageSizeRegex = /!\[([^\]]+)\]\(([^)]+)\)\{([^}]+)\}/g;
  markdown = markdown.replace(imageSizeRegex, (match, alt, url, sizeSpec) => {
    // Parse the size specification like "height: 600, width: 300"
    const sizeMatch = sizeSpec.match(/height:\s*(\d+),\s*width:\s*(\d+)/);
    if (sizeMatch) {
      const height = sizeMatch[1];
      const width = sizeMatch[2];

      // The same is important
      return `![${alt} =${width}x${height}](${url})`;
    }
    return match; // Return unchanged if format doesn't match
  });

  // Replace \pagebreak with HTML page break div
  markdown = markdown.replace(/\\pagebreak/g, '<div style="page-break-after: always;"></div>');

  return md.render(markdown);
}
