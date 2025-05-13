import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import { auth, storage } from "../components/googleSignin/config";
import { ref, listAll, getDownloadURL } from "firebase/storage";

import "../Tapes/styles/ViewBeats.css";
import {
  Box,
  Button,
  Grid,
  Text,
  VStack,
  HStack,
  Flex,
} from "@chakra-ui/react";
import { User } from "firebase/auth";

export default function ViewBeats() {
  const [beats, setBeats] = useState<{ name: string; url: string }[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();
  const audioListRef = ref(storage, "audio/");
  const currentAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // ✅ Check auth state properly
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user);
      if (!user) {
        router.push("/signin"); //  Redirect if not logged in
      }
    });

    return () => unsubscribe();
  }, [router]); //  Depend on router

  useEffect(() => {
    //This runs as soon as the page loads because its useEffect :)
    if (!user) return; // Don't fetch files if not logged in

    const fetchAudioFiles = async () => {
      try {
        const response = await listAll(audioListRef);
        const files = await Promise.all(
          response.items.map(async (item) => {
            const url = await getDownloadURL(item);
            return { name: item.name, url };
          })
        );
        setBeats(files);
      } catch (error) {
        console.error("Error fetching audio files:", error);
      }
    };

    fetchAudioFiles();
  }); //  Fetch only when user is available

  const handlePlay = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    if (currentAudioRef.current && currentAudioRef.current !== event.target) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0;
    }
    currentAudioRef.current = event.target as HTMLAudioElement;
  };

  const handlePurchase = async (beatUrl: string, beatName: string) => {
    if (!user) {
      alert("Please log in to buy beats!");
      return;
    }

    const response = await fetch("/api/checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ beatUrl, beatName, userEmail: user.email }),
    });

    const data = await response.json();
    if (data.url) {
      localStorage.setItem(
        "purchasedBeat",
        JSON.stringify({ beatUrl, beatName })
      );
      window.location.href = data.url;
    } else {
      console.error("Failed to get Stripe URL:", data);
      alert("Error processing your purchase. Please try again.");
    }
  };

  if (user === null) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      minH="100vh"
      bg="gray.900"
      color="white"
      p={6}
    >
      <Text
        fontSize="5xl"
        fontWeight="bold"
        bgGradient="linear(to-r, purple.400, pink.400)"
        bgClip="text"
        textAlign="center"
        transition="transform 0.3s"
        _hover={{ transform: "scale(1.05)" }}
      >
        Beat Gallery
      </Text>

      <Grid
        templateColumns={{
          base: "1fr",
          md: "repeat(2, 1fr)",
          lg: "repeat(3, 1fr)",
        }}
        gap={6}
        w="100%"
        maxW="1200px"
      >
        {beats.map((beat, index) => (
          <Box
            key={index}
            bg="rgba(255, 255, 255, 0.1)"
            backdropFilter="blur(10px)"
            borderRadius="15px"
            boxShadow="0 4px 30px rgba(0, 0, 0, 0.1)"
            p={6}
            transition="all 0.3s"
            _hover={{
              transform: "scale(1.05)",
              boxShadow: "0px 4px 20px rgba(255, 255, 255, 0.2)",
            }}
          >
            <VStack spacing={3} align="center">
              <Text fontSize="xl" fontWeight="semibold">
                {beat.name}
              </Text>

              <audio
                controls
                onPlay={handlePlay}
                controlsList="nodownload"
                onContextMenu={(e) => e.preventDefault()}
                style={{
                  width: "100%",
                  filter: "drop-shadow(2px 4px 6px black)",
                  borderRadius: "10px",
                }}
              >
                <source src={beat.url} type="audio/mp3" />
              </audio>

              <Button
                onClick={() => handlePurchase(beat.url, beat.name)}
                bgGradient="linear(to-r, purple.500, pink.500)"
                _hover={{
                  bgGradient: "linear(to-r, pink.500, purple.500)",
                  transform: "scale(1.1)",
                }}
                _active={{ transform: "scale(0.95)" }}
                size="lg"
                width="full"
              >
                Buy Now
              </Button>
            </VStack>
          </Box>
        ))}
      </Grid>
    </Flex>
  );
}
