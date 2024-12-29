import React, { useEffect, useRef, useState } from "react";
import dashjs from "dashjs";
import "./App.css"; // Your custom CSS or Tailwind CSS

const playlist = [
  {
    title: "Track One",
    src: "http://localhost:8000/output/output_64k.mpd", // Example MPD file
  },
  {
    title: "Track Two",
    src: "http://localhost:8000/song2/output_128k.mpd", // Example MPD file
  }
];

function App() {
  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const playerRef = useRef(null); // To reference the dash.js player instance

  useEffect(() => {
    const player = dashjs.MediaPlayer().create();
    player.initialize(audioRef.current, currentTrack.src, isPlaying);
    playerRef.current = player;

    return () => {
      player.destroy(); // Clean up the player on unmount
      playerRef.current = null;
    };
  }, [currentTrack]);

  const handleTrackChange = (track) => {
   
    setCurrentTrack(track);
    setIsPlaying(true);
    console.log(track)
  };

  const togglePlayPause = () => {
    if (audioRef.current.paused) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-pretty text-3xl font-semibold tracking-tight text-gray-900 sm:text-4xl">
            Advanced Music Player
          </h2>
          <p className="mt-6 text-lg text-gray-600">
            Welcome to our Music Player! Select a track from the playlist, and enjoy a seamless listening experience.
          </p>
        </div>

        <div className="xl:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Now Playing: {currentTrack.title}
          </h3>
          <audio
            ref={audioRef}
            controls
            style={{ width: "100%", maxWidth: "600px" }}
          >
            Your browser does not support the audio tag.
          </audio>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={togglePlayPause}
          >
            {isPlaying ? "Pause" : "Play"}
          </button>

          <ul className="mt-8 space-y-4">
            {playlist.map((track, index) => (
              <li
                key={index}
                className={`p-4 rounded cursor-pointer ${
                  track.src === currentTrack.src
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-100 hover:bg-gray-200"
                }`}
                onClick={() => handleTrackChange(track)}
              >
                {track.title}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
