import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Rewind, FastForward, Minus, Plus } from 'lucide-react';

const AudioPlayer = ({ audioSrc, chapterId }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [message, setMessage] = useState("Why read when you can listen? Hit play!");
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.playbackRate = playbackRate;

    const savedTime = localStorage.getItem(`audioTime-${chapterId}`);
    if (savedTime) {
      audio.currentTime = parseFloat(savedTime);
      setCurrentTime(parseFloat(savedTime));
    }

    const updateTime = () => {
      setCurrentTime(audio.currentTime);
      localStorage.setItem(`audioTime-${chapterId}`, audio.currentTime);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
    };
  }, [audioSrc, chapterId, playbackRate]);

  const togglePlayPause = () => {
    const audio = audioRef.current;
    if (audio.paused) {
      audio.play();
      setMessage("Audiobooks: Because multitasking is the new reading!");
    } else {
      audio.pause();
      setMessage("Paused. Remember, books don't have buffering issues!");
    }
    setIsPlaying(!audio.paused);
  };

  const changeSpeed = (direction) => {
    const newRate = direction === 'up' ? playbackRate + 0.25 : playbackRate - 0.25;
    if (newRate >= 0.5 && newRate <= 2) {
      setPlaybackRate(newRate);
      if (direction === 'up') {
        setMessage("Speeding up! Now you're listening at 'skimming' pace.");
      } else {
        setMessage("Slowing down! Savoring every word like a fine audiobook sommelier.");
      }
    }
  };

  const seekAudio = (seconds) => {
    const audio = audioRef.current;
    if (audio) {
      audio.currentTime += seconds;
      setMessage(seconds > 0 ? "Fast-forwarding: Like skimming, but lazier!" : "Rewinding: For when you zone out... again.");
    }
  };

  const onProgressChange = (e) => {
    const audio = audioRef.current;
    const newTime = (e.target.value / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="bg-gray-800 p-4 rounded-lg">
      <p className="text-white text-center mb-4 italic">{message}</p>
      <div className="flex flex-col items-center space-y-4">
        <audio 
          ref={audioRef}
          src={audioSrc}
          onEnded={() => {
            setIsPlaying(false);
            setMessage("Finished! Time for the sequel?");
          }}
        />
        <div className="w-full flex items-center space-x-2 text-white text-sm">
          <span>{formatTime(currentTime)}</span>
          <input
            type="range"
            ref={progressRef}
            className="w-full"
            value={(currentTime / duration) * 100 || 0}
            onChange={onProgressChange}
          />
          <span>{formatTime(duration)}</span>
        </div>
        <div className="flex items-center justify-center space-x-4">
          <button onClick={togglePlayPause} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
            {isPlaying ? <Pause size={24} /> : <Play size={24} />}
          </button>
          <button onClick={() => seekAudio(-10)} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
            <Rewind size={20} />
          </button>
          <button onClick={() => seekAudio(10)} className="p-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
            <FastForward size={20} />
          </button>
          <div className="flex items-center space-x-2">
            <button onClick={() => changeSpeed('down')} className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
              <Minus size={16} />
            </button>
            <span className="text-sm font-medium text-white">{playbackRate.toFixed(2)}x</span>
            <button onClick={() => changeSpeed('up')} className="p-1 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition-colors">
              <Plus size={16} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;