import { useEffect, useState } from "react";
import { getAuth, User } from "firebase/auth";
import { storage, db } from "../components/googleSignin/config";
import { ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";
import { doc, setDoc, collection } from "firebase/firestore";
import { v4 } from "uuid";

import { Box, Button, MenuButton, Text } from "@chakra-ui/react";

export default function UploadBeat() {
  const [audioUpload, setAudioUpload] = useState<File | null>(null);
  const [beatName, setBeatName] = useState(""); // state for beat name
  const [tapeName, setTapeName] = useState(""); // state for Tape name
  const [message, setMessage] = useState("");
  const [audioList, setAudioList] = useState<string[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const [existingPackages, setExistingPackages] = useState<string[]>([]);
  const [isNewPackage, setIsNewPackage] = useState(false);

  const auth = getAuth();
  const audioListRef = ref(storage, "audio/");

  useEffect(() => {
    const checkAdmin = async (user: User | null) => {
      //fix!!!
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

  const uploadAudio = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      setMessage("You must be logged in to upload a beat.");
      return;
    }

    if (!audioUpload || !beatName.trim() || !tapeName.trim()) {
      setMessage("Please enter a tape name, beat name, and select a file.");
      return;
    }

    try {
      const audioRef = ref(
        storage,
        `audio/${tapeName}/${beatName}-${v4()}.mp3`
      );
      await uploadBytes(audioRef, audioUpload);

      setMessage(`Beat "${beatName}" uploaded to package "${tapeName}"!`);
      setBeatName("");
      setTapeName("");
      setAudioUpload(null);

      fetchPackages(); // refresh dropdown
    } catch (error) {
      console.error("Error uploading beat:", error);
      setMessage("Error uploading file. Please try again.");
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAudioUpload(event.target.files ? event.target.files[0] : null);
  };

  const fetchPackages = async () => {
    try {
      const rootRef = ref(storage, "audio/");
      const response = await listAll(rootRef);
      const folderNames = response.prefixes.map((folder) => folder.name);
      setExistingPackages(folderNames);
    } catch (error) {
      console.error("Error fetching packages:", error);
    }
  };

  useEffect(() => {
    fetchPackages();
  }, []);

  useEffect(() => {
    listAll(audioListRef)
      .then((response) => {
        response.items.forEach((item) => {
          getDownloadURL(item).then((url) => {
            setAudioList((prev) => [...prev, url]);
          });
        });
      })
      .catch((error) => {
        console.error("Error listing files:", error);
        setMessage("Could not load files. Please check permissions.");
      });
  }, []); // This empty dependency array makes it so it runs the code then hits the array
  
  if (!isAdmin) {
    return <p>Access denied: You do not have permission to upload files.</p>;
  }

  return (
    <Box p={6}>
      <Text fontWeight="bold" mb={2}>
        Select Package
      </Text>
      <select
        value={isNewPackage ? "new" : tapeName}
        onChange={(e) => {
          if (e.target.value === "new") {
            setIsNewPackage(true);
            setTapeName("");
          } else {
            setIsNewPackage(false);
            setTapeName(e.target.value);
          }
        }}
      >
        <option value="">-- Select a package --</option>
        {existingPackages.map((pkg, index) => (
          <option key={index} value={pkg}>
            {pkg}
          </option>
        ))}
        <option value="new">+ Create New Package</option>
      </select>

      {isNewPackage && (
        <input
          type="text"
          placeholder="Enter new package name"
          value={tapeName}
          onChange={(e) => setTapeName(e.target.value)}
        />
      )}

      <input
        type="text"
        placeholder="Enter Beat Name"
        value={beatName}
        onChange={(e) => setBeatName(e.target.value)}
      />
      <input type="file" accept="audio/mpeg" onChange={handleFileChange} />

      <Button onClick={uploadAudio} mt={4}>
        Upload MP3
      </Button>

      {message && <p>{message}</p>}
    </Box>
  );
}
