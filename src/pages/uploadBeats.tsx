import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
import { storage } from "../components/googleSignin/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";


export default function UploadBeat() {
  const [audioUpload, setAudioUpload] = useState<File | null>(null);
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

    // Check for user auth state and if email matches the admin email
    auth.onAuthStateChanged((user) => {
      checkAdmin(user);
    });
  }, [auth]);

  const uploadAudio = () => {
  if (audioUpload == null || !isAdmin) return;

  const audioRef = ref(storage, `audio/${audioUpload.name + v4()}`);
  
  uploadBytes(audioRef, audioUpload)
    .then(() => {
      alert("Audio Uploaded");
    })
    .catch((error) => {
      console.error("Error uploading file:", error);  // This will give more insights into the error
      setMessage("Error uploading file. Please try again.");
    });
};

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAudioUpload(event.target.files ? event.target.files[0] : null);
  };

  useEffect(() => {
    listAll(audioListRef).then((response) => {
      console.log("Audio files in storage:", response.items); // Log items to check for valid references
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
    }).catch((error) => {
      console.error("Error listing all files:", error);  // Catch listing errors here
    });
    
  }, []);

  if (!isAdmin) {
    return <p>Access denied: You do not have permission to upload files.</p>;
  }

  return (
    <div>
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
