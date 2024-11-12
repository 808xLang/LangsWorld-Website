import { useEffect, useState } from "react";
import { storage } from "../components/googleSignin/config";
import { ref, listAll, getDownloadURL } from 'firebase/storage';

export default function ViewBeats() {
  const [audioList, setAudioList] = useState<string[]>([]);
  const audioListRef = ref(storage, "audio/");

  // Fetch audio URLs from Firebase Storage
  useEffect(() => {
    listAll(audioListRef).then((response) => {
      const urls = response.items.map((item) => getDownloadURL(item));
      Promise.all(urls).then((urlList) => setAudioList(urlList));
    });
  }, []);

  return (
    <div>
      <h2>Available Beats:</h2>
      {audioList.map((url, index) => (
        <audio key={index} controls>
          <source src={url} type="audio/mp3" />
        </audio>
      ))}
    </div>
  );
}
