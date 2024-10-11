import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Rewind, FastForward, Minus, Plus } from 'lucide-react';

const AudioPlayer = ({ audioSrc }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [message, setMessage] = useState("Why read when you can listen? Hit play!");
  const audioRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;
    audio.playbackRate = playbackRate;
  }, [playbackRate]);

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setMessage("Audiobooks: Because multitasking is the new reading!");
    } else {
      audioRef.current.pause();
      setMessage("Paused. Remember, books don't have buffering issues!");
    }
    setIsPlaying(!isPlaying);
  };

  const changeSpeed = (direction) => {
    const newRate = direction === 'up' ? playbackRate + 0.25 : playbackRate - 0.25;
    if (newRate >= 0.5 && newRate <= 2) {
      setPlaybackRate(newRate);
      setMessage(`Speed ${direction === 'up' ? 'up' : 'down'}! Reading is so last century.`);
    }
  };

  const seekAudio = (seconds) => {
    if (audioRef.current) {
      audioRef.current.currentTime += seconds;
      setMessage(seconds > 0 ? "Fast-forwarding: Like skimming, but lazier!" : "Rewinding: For when you zone out... again.");
    }
  };

  return (
    <div className="bg-zinc-800 p-4 rounded-lg">
      <p className="text-white text-center mb-4 italic">{message}</p>
      <div className="flex items-center justify-center space-x-4">
        <audio ref={audioRef} src={audioSrc} onEnded={() => {
          setIsPlaying(false);
          setMessage("Finished! Time for the sequel?");
        }} />
        <button onClick={togglePlayPause} className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 transition-colors">
          {isPlaying ? <Pause size={24} /> : <Play size={24} />}
        </button>
        <button onClick={() => seekAudio(-10)} className="p-2 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition-colors">
          <Rewind size={20} />
        </button>
        <button onClick={() => seekAudio(10)} className="p-2 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition-colors">
          <FastForward size={20} />
        </button>
        <div className="flex items-center space-x-2">
          <button onClick={() => changeSpeed('down')} className="p-1 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition-colors">
            <Minus size={16} />
          </button>
          <span className="text-sm font-medium text-white">{playbackRate.toFixed(2)}x</span>
          <button onClick={() => changeSpeed('up')} className="p-1 bg-zinc-700 text-white rounded-full hover:bg-zinc-600 transition-colors">
            <Plus size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;