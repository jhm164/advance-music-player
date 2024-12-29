import React, { useEffect, useRef, useState } from "react";
import dashjs from "dashjs";
import { FaPlay, FaPause, FaRegHeart, FaRegStar } from "react-icons/fa";
import "./App.css"; // Your custom CSS or Tailwind CSS

const playlist = [
  {
    title: "Track One",
    src: "http://localhost:8000/output/output_64k.mpd", // Example MPD file
  },
  {
    title: "Track Two",
    src: "http://localhost:8000/song2/output_64k.mpd", // Example MPD file
  }
];

function App() {
  const [currentTrack, setCurrentTrack] = useState(playlist[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);
  const playerRef = useRef(null); // To reference the dash.js player instance
  const [darkMode, setDarkMode] = useState(true); // State for toggling dark mode

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

  const toggleDarkMode = () => {
    setDarkMode((prevMode) => {
      const newMode = !prevMode;
      if (newMode) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
      return newMode;
    });
  };

  return (
    <div className={`min-h-screen ${darkMode ? "bg-gray-900" : "bg-white"} text-white py-24 sm:py-32`}>
      <div className="mx-auto grid max-w-7xl gap-20 px-6 lg:px-8 xl:grid-cols-3">
        <div className="max-w-xl">
          <h2 className="text-4xl font-semibold tracking-tight text-white">
            Advanced Music Player
          </h2>
          <p className="mt-6 text-lg text-gray-400">
            Welcome to our Music Player! Select a track from the playlist, and enjoy a seamless listening experience.
          </p>
          <button
            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
            onClick={toggleDarkMode}
          >
            Toggle Dark Mode
          </button>
        </div>

        <div className="xl:col-span-2">
          <h3 className="text-xl font-semibold text-white mb-4">
            Now Playing: {currentTrack.title}
          </h3>
          <audio
            ref={audioRef}
            controls
            style={{ width: "100%", maxWidth: "600px" }}
          >
            Your browser does not support the audio tag.
          </audio>
          <div className="flex justify-center items-center space-x-6 mt-4">
            <button
              className="px-4 py-2 bg-indigo-600 text-white rounded hover:bg-indigo-700"
              onClick={togglePlayPause}
            >
              {isPlaying ? <FaPause /> : <FaPlay />}
            </button>
            <button className="text-indigo-500 hover:text-indigo-600">
              <FaRegHeart />
            </button>
            <button className="text-yellow-500 hover:text-yellow-600">
              <FaRegStar />
            </button>
          </div>

          <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {playlist.map((track, index) => (
              <li
                key={index}
                className={`bg-gray-800 rounded-lg shadow-lg overflow-hidden cursor-pointer transition duration-300 ease-in-out transform hover:scale-105 ${
                  track.src === currentTrack.src
                    ? "bg-indigo-600 text-white"
                    : "bg-gray-700 hover:bg-indigo-700 hover:text-white"
                }`}
                onClick={() => handleTrackChange(track)}
              >
                <div className="relative">
                  <img
                    src="https://via.placeholder.com/300x200" // Placeholder image
                    alt="Album Cover"
                    className="w-full h-48 object-cover"
                  />
                  {track.src === currentTrack.src && (
                    <div className="absolute top-2 right-2 bg-indigo-600 text-white p-2 rounded-full">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-4">
                  <h3 className="text-xl font-semibold">{track.title}</h3>
                  <p className="text-sm text-gray-400">Click to play</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
