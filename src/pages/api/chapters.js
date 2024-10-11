import fs from 'fs';
import path from 'path';

export default function handler(req, res) {
  const contentDir = path.join(process.cwd(), 'content');
  const files = fs.readdirSync(contentDir);
  const chapters = files.map((filename) => filename.replace('.md', ''));
  
  res.status(200).json(chapters);
}