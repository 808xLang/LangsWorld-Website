import { useEffect, useState, useRef } from "react";
import { storage } from "../components/googleSignin/config";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import "../styles/ViewBeats.css";

export default function ViewBeats() {
  const [audioList, setAudioList] = useState<string[]>([]);
  const audioListRef = ref(storage, "audio/");
  const currentAudioRef = useRef<HTMLAudioElement | null>(null); // Tracks the currently playing audio

  useEffect(() => {
    listAll(audioListRef).then((response) => {
      const urls = response.items.map((item) => getDownloadURL(item));
      Promise.all(urls).then((urlList) => setAudioList(urlList));
    });
  }, []);

  const handlePlay = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    // Pause the currently playing audio (if any)
    if (currentAudioRef.current && currentAudioRef.current !== event.target) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0; // Reset to start
    }

    // Update the reference to the new playing audio
    currentAudioRef.current = event.target as HTMLAudioElement;
  };

  return (
    <div className="container">
      <h2 className="header">Available Beats:</h2>
      <ul className="playlist">
        {audioList.map((url, index) => (
          <li className="playlistItem" key={index}>
            <div className="audioInfo">
              <span>Beat {index + 1}</span>
              <audio controls onPlay={handlePlay}>
                <source src={url} type="audio/mp3" />
              </audio>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
