import { useEffect, useState, useRef } from "react";
import { auth, storage } from "../components/googleSignin/config";
import { ref, listAll, getDownloadURL, getStorage } from "firebase/storage";


import "../styles/ViewBeats.css";
import { Button, MenuButton } from "@chakra-ui/react";

export default function ViewBeats() {
  const [beats, setBeats] = useState<{ name: string; url: string }[]>([]);
  const audioListRef = ref(storage, "audio/");
  const currentAudioRef = useRef<HTMLAudioElement | null>(null); // Tracks the currently playing audio

  useEffect(() => {
    const fetchAudioFiles = async () => {
      try {
        const response = await listAll(audioListRef); // Get all files in "audio/" folder
        
        const files = await Promise.all(
          response.items.map(async (item) => {
            const url = await getDownloadURL(item); // Get the download URL
            return { name: item.name, url }; // Store both the file name and URL
          })
        );

        setBeats(files); // Update state with file names and URLs
      } catch (error) {
        console.error("Error fetching audio files:", error);
      }
    };

    fetchAudioFiles();
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

  


  const handlePurchase = async (beatUrl: string, beatName: string) => {
    const user = auth.currentUser;
    if (!user) {
      alert("Please log in to buy beats!");
      return;
    }
  
    const response = await fetch("/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ beatUrl, beatName, userEmail: user.email }),
    });

    console.log("Response Data:", {beatName});
  
    const data = await response.json();
  
    if (data.url) {
      // Save the beat details locally or pass via router for later access
      localStorage.setItem("purchasedBeat", JSON.stringify({ beatUrl, beatName }));
  
      // Redirect to Stripe checkout page
      window.location.href = data.url;
    } else {
      console.error("Failed to get Stripe URL:", data);
      alert("Error processing your purchase. Please try again.");
    }
  };

  return (
    <div>
      <ul className="playlist">
        {beats.map((beat, index) => (
          <li className="playlistItem" key={index}>
            <div className="audioInfo">
              <span>{beat.name}</span> {/* Displays the file name from Firebase */}
              <audio controls onPlay={handlePlay} controlsList="nodownload" onContextMenu={(e) => e.preventDefault()}>
                <source src={beat.url} type="audio/mp3" />
              </audio>
              <Button onClick={() => handlePurchase(beat.url, beat.name)} border="2px" borderColor="purple.500">
                Buy Now
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}