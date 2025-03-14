import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
import { storage } from "../components/googleSignin/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";

export default function UploadBeat() {
  const [audioUpload, setAudioUpload] = useState<File | null>(null);
  const [beatName, setBeatName] = useState(""); // ✅ New state for beat name
  const [message, setMessage] = useState("");
  const [audioList, setAudioList] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const auth = getAuth();
  const audioListRef = ref(storage, "audio/");

  useEffect(() => {
    const checkAdmin = async (user: User | null) => {
      if (user && user.email === "808xlang@gmail.com") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    };

    auth.onAuthStateChanged((user) => {
      checkAdmin(user);
    });
  }, [auth]);

  const uploadAudio = () => {
    if (!audioUpload || !beatName.trim() || !isAdmin) {
      setMessage("Please select a file and enter a name before uploading.");
      return;
    }

    // ✅ Use beatName instead of file name + UUID for uniqueness
    const audioRef = ref(storage, `audio/${beatName}-${v4()}.mp3`);

    uploadBytes(audioRef, audioUpload)
      .then(() => {
        setMessage("Audio Uploaded Successfully!");
        setBeatName(""); // Clear input
        setAudioUpload(null);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
        setMessage("Error uploading file. Please try again.");
      });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAudioUpload(event.target.files ? event.target.files[0] : null);
  };

  useEffect(() => {
    listAll(audioListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item)
            .then((url) => {
              setAudioList((prev) => [...prev, url]);
            })
            .catch((error) => {
              console.error(`Error fetching URL for ${item.fullPath}:`, error.message);
              setMessage(`Could not load some files. Please check permissions.`);
            });
        });
      })
      .catch((error) => {
        console.error("Error listing all files:", error);
      });
  }, []);

  if (!isAdmin) {
    return <p>Access denied: You do not have permission to upload files.</p>;
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="Enter Beat Name" 
        value={beatName} 
        onChange={(e) => setBeatName(e.target.value)} 
      />
      <input type="file" accept="audio/mpeg" onChange={handleFileChange} />
      <button onClick={uploadAudio}>Upload MP3</button>
      {message && <p>{message}</p>}

      {audioList.map((url, index) => (
        <audio key={index} controls>
          <source src={url} type="audio/mp3" />
        </audio>
      ))}
    </div>
  );
}
