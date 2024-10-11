import { useEffect, useState } from "react";
import { storage } from "../components/googleSignin/config";
import { ref, uploadBytes, listAll, getDownloadURL } from 'firebase/storage';
import {v4} from 'uuid'

export default function UploadBeat() {
  const [audioUpload, setAudioUpload] = useState(null);
  const [message, setMessage] = useState("");
  const [audioList, setAudioList] = useState<string[]>([]);
  const audioListRef = ref(storage, "audio/")

  const uploadAudio = () => {
    if (audioUpload == null) return;
    const audioRef = ref(storage, `audio/${audioUpload.name + v4()}`);
    uploadBytes(audioRef, audioUpload ).then(() => {
      alert("Audio Uploaded")
    })
  }

  const handleFileChange = (event) => {
    setAudioUpload(event.target.files[0]); // Get the selected file
  };

  useEffect(() => {
    listAll(audioListRef).then((response) => {
      debugger
      response.items.forEach((item) => {
       debugger
        getDownloadURL(item).then((url) => {
          debugger 
          setAudioList((prev) => [...prev, url])
        })
      })
      console.log(response)
    })
  }, []);

  return (
    <div>
        <input type="file" accept="audio/mpeg" onChange={handleFileChange} />
        <button onClick={uploadAudio}>Upload MP3</button>
      {message && <p>{message}</p>}
      {audioList.map((url) => 
      {
        return <audio controls>
          <source src={url} type="audio/mp3"/>
        </audio>
      })}
    </div>
  );
}
