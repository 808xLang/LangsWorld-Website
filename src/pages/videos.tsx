"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../components/googleSignin/config";
import { Box, Container, Heading, Stack, Text } from "@chakra-ui/react";
import VideoGallery from "../components/VideoGallery";

const videos1 = [
  { title: "Is it Tru 1", src: "https://www.youtube.com/embed/ahNtp1dvrpg" },
  { title: "Is it Tru 2", src: "https://www.youtube.com/embed/pWozhSr3YBI" },
  { title: "Is it Tru 3", src: "https://www.youtube.com/embed/iMqN9bmoNjI" },
  { title: "Is it Tru 4", src: "https://www.youtube.com/embed/Ui_4G1v1xeA" },
];

const videos2 = [
  { title: "Is it Tru 5", src: "https://www.youtube.com/embed/Ui_4G1v1xeA" },
  { title: "Is it Tru 6", src: "https://www.youtube.com/embed/CeOeAbsfZAU" },
  { title: "Is it Tru 7", src: "https://www.youtube.com/embed/StmKKD3ZoXk" },
  { title: "Is it Tru 8", src: "https://www.youtube.com/embed/yfZ1HSJQJuM" },
];

const videos3 = [
  { title: "Is it Tru 9", src: "https://www.youtube.com/embed/rA06WkDgIfM" },
  { title: "Is it Tru 10", src: "https://www.youtube.com/embed/TIZ3SUhAXNk" },
];

export default function GridListWith() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(() => setIsLoading(false));
    return () => unsubscribe();
  }, [router]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box minH="100vh" py={8}>
      <Box p={4}>
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
          <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
            WELCOME TO LANGSWORLD
          </Heading>
          <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
            Producer and engineer Langston Wooten has over 1 Million plays across YouTube
          </Text>
        </Stack>

        <VideoGallery videos={videos1} />
        <VideoGallery videos={videos2} />
        <VideoGallery videos={videos3} />
      </Box>
    </Box>
  );
}

// https://www.youtube.com/embed/xVsE2PEMZOg
