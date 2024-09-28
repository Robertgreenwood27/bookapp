import Layout from '../components/Layout';
import Navigation from '../components/Navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Home({ chapters }) {
  return (
    <Layout>
      <Navigation chapters={chapters} />
      <div className="flex flex-col items-center text-center py-8">
        <h1 className="text-5xl font-bold mb-8 text-white">Chirp</h1>
        <div className="relative w-full max-w-lg aspect-[3/4] mb-8">
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
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full transition duration-300 text-lg mt-4"
        >
          Start Reading
        </Link>
      </div>
    </Layout>
  );
}

export async function getStaticProps() {
  // Fetch chapters logic here
  const chapters = ['chapter-1', 'chapter-2', 'chapter-3']; // Replace with actual chapter fetching logic
  return {
    props: {
      chapters,
    },
  };
}