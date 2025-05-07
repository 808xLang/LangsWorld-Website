import { AspectRatio } from "@chakra-ui/react";

export default function VideoEmbed({ title, src }: { title: string; src: string }) {
  return (
    <AspectRatio
      width="25%"
      ratio={4 / 3}
      borderRadius="lg"
      overflow="hidden"
      boxShadow="2xl"
      _hover={{
        transform: "scale(1.05)",
        transition: "transform 0.2s ease-in-out",
      }}
    >
      <iframe title={title} src={src} allowFullScreen />
    </AspectRatio>
  );
}
