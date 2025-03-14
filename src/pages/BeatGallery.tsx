import { useEffect, useState, useRef } from "react";
import { auth, storage } from "../components/googleSignin/config";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import "../styles/ViewBeats.css";
import { Button, MenuButton } from "@chakra-ui/react";

export default function ViewBeats() {
  const [audioList, setAudioList] = useState<string[]>([]);
  const audioListRef = ref(storage, "audio/");
  const currentAudioRef = useRef<HTMLAudioElement | null>(null); // Tracks the currently playing audio

  useEffect(() => {
    const fetchAudioUrls = async () => {
      try {
        const response = await listAll(audioListRef); //Making a var for response and using the listall function from firebase list using the audiListRef
        const urlPromises = response.items.map((item) => getDownloadURL(item));

        const urlList = await Promise.all(urlPromises);
        console.log({urlList})
        setAudioList(urlList);
      } catch (error) {
        console.error("Error fetching audio URLs:", error);
      }
    };

    fetchAudioUrls();
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

    console.log("Response Data:", {beatUrl});
  
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
        {audioList.map((url, index) => (
          <li className="playlistItem" key={index}>
            <div className="audioInfo">
              <span>Monkey {index + 1}</span>
              <audio controls onPlay={handlePlay} controlsList="nodownload" onContextMenu={(e) => e.preventDefault()}>
                <source src={url} type="audio/mp3" />
              </audio>
              <Button onClick={() => handlePurchase(url, `Beat ${index + 1}`)} border='2px'
  borderColor='purple.500'>
                Buy Now
              </Button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
