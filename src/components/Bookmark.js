import React, { useState, useEffect } from 'react';
import { Save } from 'lucide-react';

const Bookmark = ({ chapterId }) => {
  const [bookmark, setBookmark] = useState(null);

  useEffect(() => {
    // Load bookmark position from localStorage on component mount
    const savedBookmark = localStorage.getItem(`bookmark-${chapterId}`);
    if (savedBookmark) {
      setBookmark(JSON.parse(savedBookmark));
    }
  }, [chapterId]);

  const handleDoubleClick = (event) => {
    const target = event.target;
    if (target.tagName === 'P') {
      const rect = target.getBoundingClientRect();
      const newBookmark = {
        top: rect.top + window.scrollY,
        left: rect.left,
        width: rect.width,
      };
      setBookmark(newBookmark);
      localStorage.setItem(`bookmark-${chapterId}`, JSON.stringify(newBookmark));
    }
  };

  useEffect(() => {
    document.addEventListener('dblclick', handleDoubleClick);
    return () => {
      document.removeEventListener('dblclick', handleDoubleClick);
    };
  }, [chapterId]);

  return (
    <>
      {bookmark && (
        <div
          className="fixed z-10 bg-red-500 bg-opacity-30 pointer-events-none"
          style={{
            top: `${bookmark.top}px`,
            left: `${bookmark.left}px`,
            width: `${bookmark.width}px`,
            height: '2px',
          }}
        >
          <Save className="text-red-500 absolute -top-4 -left-4" size={16} />
        </div>
      )}
    </>
  );
};

export default Bookmark;