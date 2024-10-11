import { processChapter } from '../utils/chapterProcessor';
import dynamic from 'next/dynamic';
import fs from 'fs';
import path from 'path';
import Highlighter from '../components/Highlighter';

const ChapterLayout = dynamic(() => import('../components/ChapterLayout'), { ssr: false });

export async function getStaticPaths() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir);
  const paths = files.map((filename) => ({
    params: { chapter: filename.replace('.md', '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { title, content } = await processChapter(`${params.chapter}.md`);

  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir);
  const chapters = files.map((filename) => filename.replace('.md', ''));
  const currentIndex = chapters.indexOf(params.chapter);
  const prevChapter = chapters[currentIndex - 1] || null;
  const nextChapter = chapters[currentIndex + 1] || null;

  return {
    props: {
      title,
      content,
      prevChapter,
      nextChapter,
      chapterId: params.chapter.replace('chapter', ''),
    },
  };
}

export default function Chapter({ title, content, prevChapter, nextChapter, chapterId }) {
  return (
    <>
    <ChapterLayout
      content={content}
      title={title}
      prevChapter={prevChapter}
      nextChapter={nextChapter}
      chapterId={chapterId}
    />
    <Highlighter chapterId={chapterId} />
    </>
  );
}