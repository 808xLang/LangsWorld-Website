import { Box, Button, Text, VStack, Image, SimpleGrid } from "@chakra-ui/react";
import { useRef } from "react";

export default function ViewTapes() {
  const currentAudioRef = useRef<HTMLAudioElement | null>(null); // Tracks the currently playing audio
  const handlePlay = (event: React.SyntheticEvent<HTMLAudioElement>) => {
    // Pause the currently playing audio (if any)
    if (currentAudioRef.current && currentAudioRef.current !== event.target) {
      currentAudioRef.current.pause();
      currentAudioRef.current.currentTime = 0; // Reset to start
    }

    // Update the reference to the new playing audio
    currentAudioRef.current = event.target as HTMLAudioElement;
  };

  const appleMusicUrl = "https://music.apple.com/us/artist/808lang/1534681265"
  const spotifyUrl = "https://open.spotify.com/artist/1Pn5HQaSLxLDIk8tt7PCfR"
  const soundCloudUrl = "https://soundcloud.com/808lang"
  const youtubeUrl = "https://www.youtube.com/@808lang"

  const appleDownload = () => {
    window.open(appleMusicUrl, "_blank");
  }
  const spotifyDownload = () => {
    window.open(spotifyUrl, "_blank");
  }
  const soundCloudDownload = () => {
    window.open(soundCloudUrl, "_blank");
  }
  const youtubeDownload = () => {
    window.open(youtubeUrl, "_blank");
  }

  return (
    <Box 
      minH="100vh" 
      display="flex" 
      alignItems="center" 
      justifyContent="center" 
      bgGradient="linear(to-r, purple.900, purple.700)"
      p={6}
    >
      <VStack 
        spacing={4} 
        bg="whiteAlpha.900" 
        p={6} 
        borderRadius="lg" 
        boxShadow="lg"
        maxW="500px"
      >
        {/* Featured Image */}
        <Image 
          src="/images/album-cover.jpg" 
          alt="Album Cover" 
          borderRadius="md"
          boxSize="250px"
          objectFit="cover"
        />

        {/* Song Information */}
        <Text fontSize="2xl" fontWeight="bold" color="purple.700">
          Song Wars (Exclusive Premiere)
        </Text>
        <Text fontSize="md" color="gray.600">808Lang</Text>

        {/* Audio Player */}
        <audio
          controls
          onPlay={handlePlay}
          controlsList="nodownload"
          onContextMenu={(e) => e.preventDefault()}
          style={{ width: "100%" }} // Custom width
        >
          <source src="/tapes/SW.mp3" type="audio/mp3" />
        </audio>

        {/* Call-to-Action */}
        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={4} mt={4}>
      <Button colorScheme="red" size="lg" onClick={appleDownload}>
        Apple Music
      </Button>
      <Button colorScheme="green" size="lg" onClick={spotifyDownload}>
        Spotify
      </Button>
      <Button colorScheme="orange" size="lg" onClick={soundCloudDownload}>
        SoundCloud
      </Button>
      <Button colorScheme="red" size="lg" onClick={youtubeDownload}>
        YouTube
      </Button>
    </SimpleGrid>
      </VStack>
    </Box>
  );
}
