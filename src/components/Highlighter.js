import React, { useState, useEffect, useCallback } from 'react';
import { Highlighter as HighlighterIcon } from 'lucide-react';

const TextHighlighter = ({ chapterId }) => {
  const [isHighlightMode, setIsHighlightMode] = useState(false);
  const [debug, setDebug] = useState('');

  const handleHighlightMode = () => {
    setIsHighlightMode(!isHighlightMode);
    document.body.style.cursor = isHighlightMode ? 'default' : 'crosshair';
  };

  const getElementOffset = (element) => {
    const range = document.createRange();
    range.setStart(document.querySelector('.prose'), 0);
    range.setEnd(element, 0);
    return range.toString().length;
  };

  const saveHighlight = useCallback((highlightElement) => {
    if (highlightElement) {
      const highlightData = {
        text: highlightElement.textContent,
        offset: getElementOffset(highlightElement)
      };
      localStorage.setItem(`highlight_${chapterId}`, JSON.stringify(highlightData));
      setDebug(`Saved highlight: ${JSON.stringify(highlightData)}`);
    } else {
      setDebug('No highlight element found to save');
    }
  }, [chapterId]);

  const removeExistingHighlight = () => {
    const existingHighlight = document.querySelector('.highlight');
    if (existingHighlight) {
      const parent = existingHighlight.parentNode;
      while (existingHighlight.firstChild) {
        parent.insertBefore(existingHighlight.firstChild, existingHighlight);
      }
      parent.removeChild(existingHighlight);
    }
  };

  const handleSelection = useCallback(() => {
    if (!isHighlightMode) return;

    const selection = window.getSelection();
    if (!selection.rangeCount) return;

    const range = selection.getRangeAt(0);
    const selectedText = range.toString().trim();
    
    if (selectedText) {
      removeExistingHighlight();

      const span = document.createElement('span');
      span.className = 'highlight';
      
      range.surroundContents(span);
      
      saveHighlight(span);
      setIsHighlightMode(false);
      document.body.style.cursor = 'default';
    }
  }, [isHighlightMode, saveHighlight]);

  const restoreHighlight = useCallback(() => {
    removeExistingHighlight();
    
    const savedHighlight = localStorage.getItem(`highlight_${chapterId}`);
    if (savedHighlight) {
      try {
        const { text, offset } = JSON.parse(savedHighlight);
        setDebug(`Restoring highlight: ${JSON.stringify({ text, offset })}`);
        
        const findAndHighlight = () => {
          const contentElement = document.querySelector('.prose');
          if (contentElement) {
            const textNode = document.createTreeWalker(
              contentElement,
              NodeFilter.SHOW_TEXT
            );
            let currentOffset = 0;
            while (textNode.nextNode()) {
              const nodeText = textNode.currentNode.textContent;
              if (currentOffset + nodeText.length > offset) {
                const range = document.createRange();
                range.setStart(textNode.currentNode, offset - currentOffset);
                range.setEnd(textNode.currentNode, offset - currentOffset + text.length);
                const span = document.createElement('span');
                span.className = 'highlight';
                range.surroundContents(span);
                setDebug(`Highlight restored at offset ${offset}`);
                return;
              }
              currentOffset += nodeText.length;
            }
          } else {
            setDebug('Content element not found, retrying...');
            setTimeout(findAndHighlight, 100);
          }
        };

        findAndHighlight();
      } catch (error) {
        console.error('Error restoring highlight:', error);
        setDebug(`Error restoring highlight: ${error.message}`);
        localStorage.removeItem(`highlight_${chapterId}`);
      }
    } else {
      setDebug('No saved highlight found');
    }
  }, [chapterId]);

  useEffect(() => {
    restoreHighlight();
  }, [restoreHighlight]);

  useEffect(() => {
    const handleTouchEnd = (e) => {
      // Prevent default behavior only if in highlight mode
      if (isHighlightMode) {
        e.preventDefault();
      }
      handleSelection();
    };

    // Add event listeners
    document.addEventListener('mouseup', handleSelection);
    document.addEventListener('touchend', handleTouchEnd);

    // Remove event listeners on cleanup
    return () => {
      document.removeEventListener('mouseup', handleSelection);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isHighlightMode, handleSelection]);

  return (
    <>
      <button
        onClick={handleHighlightMode}
        className={`fixed bottom-4 right-4 p-2 rounded-full shadow-lg z-10 ${
          isHighlightMode ? 'bg-red-500' : 'bg-blue-500'
        } text-white`}
        aria-label={isHighlightMode ? "Exit highlight mode" : "Enter highlight mode"}
      >
        <HighlighterIcon size={24} />
      </button>
      {isHighlightMode && (
        <div className="fixed top-0 left-0 w-full bg-blue-500 text-white p-2 text-center">
          Select text to highlight
        </div>
      )}
    </>
  );
};

export default TextHighlighter;