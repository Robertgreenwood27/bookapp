// pages/[chapter].js

import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import Layout from '../components/Layout';
import Link from 'next/link';

export async function getStaticPaths() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir);
  const paths = files.map((filename) => ({
    params: { chapter: filename.replace('.md', '') },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const contentDir = path.join(process.cwd(), 'content');
  const filePath = path.join(contentDir, `${params.chapter}.md`);
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContents);
  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  const files = fs.readdirSync(contentDir);
  const chapters = files.map((filename) => filename.replace('.md', ''));
  const currentIndex = chapters.indexOf(params.chapter);
  const prevChapter = chapters[currentIndex - 1] || null;
  const nextChapter = chapters[currentIndex + 1] || null;

  return {
    props: {
      data: {
        ...data,
        prevChapter,
        nextChapter,
      },
      contentHtml,
    },
  };
}

export default function Chapter({ data, contentHtml }) {
  return (
    <Layout backgroundImage={data.backgroundImage}>
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-black opacity-60"></div>
      </div>

      <header className="relative z-10 p-4 text-white text-center">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">{data.title}</h1>
      </header>

      <main className="relative z-10 flex-1 p-4 md:p-8 lg:p-12">
        <div className="max-w-3xl mx-auto bg-white bg-opacity-90 p-6 rounded-lg shadow-lg">
          <article
            className="prose lg:prose-xl"
            dangerouslySetInnerHTML={{ __html: contentHtml }}
          />
        </div>
      </main>

      <footer className="relative z-10 p-4 text-white flex justify-between">
        {data.prevChapter ? (
          <Link href={`/${data.prevChapter}`} legacyBehavior>
            <a className="hover:underline">← Previous Chapter</a>
          </Link>
        ) : <div></div>}
        {data.nextChapter && (
          <Link href={`/${data.nextChapter}`} legacyBehavior>
            <a className="hover:underline">Next Chapter →</a>
          </Link>
        )}
      </footer>
    </Layout>
  );
}
