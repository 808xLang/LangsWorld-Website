import { Container, HStack } from "@chakra-ui/react";
import VideoEmbed from "./VideoEmbed";

interface VideoGalleryProps {
  videos: { title: string; src: string }[];
}

export default function VideoGallery({ videos }: VideoGalleryProps) {
  return (
    <Container maxW="9xl" mt={12} p={6} borderRadius="lg" boxShadow="base">
      <HStack spacing={4} justify="center">
        {videos.map((video, idx) => (
          <VideoEmbed key={idx} title={video.title} src={video.src} />
        ))}
      </HStack>
    </Container>
  );
}
