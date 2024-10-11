// components/toc.js
import Link from 'next/link';

export default function TOC({ chapters }) {
  return (
    <nav>
      <ul>
        {chapters.map((chapter) => (
          <li key={chapter}>
            <Link href={`/${chapter}`}>{chapter}</Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
