import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const WORDS_PER_PAGE = 250; // Adjust as needed

function splitIntoSentences(text) {
  return text.match(/[^\.!\?]+[\.!\?]+/g) || [];
}

function startsWithHeader(sentence) {
  return sentence.trim().startsWith('##');
}

function isIncompleteSentence(sentence) {
  return sentence.trim().startsWith('.') || sentence.trim().startsWith('"');
}

export async function processChapter(chapterFileName) {
  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, chapterFileName);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);

  // Process the entire content
  const processedContent = await remark().use(html).process(content);
  const htmlContent = processedContent.toString();

  // Load image associations
  const imageAssociations = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'config', 'imageAssociations.json'), 'utf8'));

  // Split content into sentences
  const sentences = splitIntoSentences(htmlContent);

  // Initialize pages and images arrays
  let pages = [];
  let pageImages = [];
  let currentPage = '';
  const defaultImage = data.backgroundImage || '/images/default-bg.jpg';
  let wordCount = 0;
  let currentImage = defaultImage;

  for (let i = 0; i < sentences.length; i++) {
    const sentence = sentences[i];
    const sentenceWordCount = sentence.split(/\s+/).length;

    // Check if adding this sentence exceeds the word limit for the current page
    if (wordCount + sentenceWordCount > WORDS_PER_PAGE) {
      // Push the current page and its image, then start a new one
      pages.push(currentPage.trim());
      pageImages.push(currentImage);
      currentPage = '';
      wordCount = 0;
      currentImage = defaultImage; // Reset to default image for the new page
    }

    // Add the sentence to the current page
    currentPage += sentence + ' ';
    wordCount += sentenceWordCount;

    // Check if this sentence matches any in our image associations
    for (const [key, value] of Object.entries(imageAssociations)) {
      if (sentence.trim().toLowerCase().includes(key.toLowerCase())) {
        currentImage = value; // Update the current image
        break;
      }
    }
  }

  // Push the last page if there's any content left
  if (currentPage) {
    pages.push(currentPage.trim());
    pageImages.push(currentImage);
  }

  return {
    title: data.title,
    pages,
    images: pageImages,
  };
}