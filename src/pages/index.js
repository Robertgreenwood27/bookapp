// pages/index.js
import Layout from '../components/Layout'
import TOC from '../components/toc';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir);
  const chapters = files.map((filename) => filename.replace('.md', ''));

  return {
    props: {
      chapters,
    },
  };
}

export default function Home({ chapters }) {
  return (
    <Layout backgroundImage="/images/home-bg.jpg">
      <div>
        <h1>Chirp</h1> 
        <TOC chapters={chapters} />
      </div>
    </Layout>
  );
}