import Layout from '../components/Layout'
import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';

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
    <Layout>
      <Navigation chapters={chapters} />
      <div className="flex flex-col items-center text-center py-8">
        <div className="relative w-full max-w-lg aspect-[3/4] my-8">
          <Image
            src="/images/arris1.jpg"
            alt="Chirp Cover"
            layout="fill"
            objectFit="cover"
            className="rounded-lg shadow-2xl"
          />
        </div>
        
        <Link 
          href={`/${chapters[0]}`} 
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-lg mt-8"
        >
          Start Reading
        </Link>
      </div>
    </Layout>
  );
}