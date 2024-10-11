import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export async function processChapter(chapterFileName) {
  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, chapterFileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Process the entire content
  const processedContent = await remark().use(html).process(content);
  let htmlContent = processedContent.toString();

  // Load image associations
  const imageAssociations = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config', 'imageAssociations.json'), 'utf8'));

  // Insert images after specified sentences
  Object.entries(imageAssociations).forEach(([sentence, imagePath]) => {
    const imageHtml = `<img src="${imagePath}" alt="Chapter image" class="w-full h-auto my-4" />`;
    htmlContent = htmlContent.replace(sentence, `${sentence}${imageHtml}`);
  });

  return {
    title: data.title,
    content: htmlContent,
  };
}