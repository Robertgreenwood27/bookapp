// pages/index.js
import TOC from '../components/toc';
import fs from 'fs';
import path from 'path';

export async function getStaticProps() {
  const contentDir = path.join(process.cwd(), 'content'); // Updated path
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
      <h1>Throne of Shadows</h1> 
      <TOC chapters={chapters} />
      

    </div>
    </Layout>
  );
}
