"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { auth } from "../components/googleSignin/config"; // Ensure you have the correct path

import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Stack,
  Text,
  useColorModeValue,
  AspectRatio,
  Wrap,
  WrapItem,
  HStack,
} from "@chakra-ui/react";
import { ReactElement } from "react";
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
  FcCompactCamera,
  FcMusic,
} from "react-icons/fc";

interface CardProps {
  heading: string;
  description: string;
  icon: ReactElement;
  href: string;
}

const Card = ({ heading, description, icon, href }: CardProps) => {
  return (
    <Box
      maxW={{ base: "full", md: "275px" }}
      w={"full"}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}
    >
      <Stack align={"start"} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={"center"}
          justify={"center"}
          color={"white"}
          rounded={"full"}
          bg={useColorModeValue("gray.100", "gray.700")}
        >
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={"sm"}>
            {description}
          </Text>
        </Box>
        <Button variant={"link"} colorScheme={"blue"} size={"sm"}>
          Learn more
        </Button>
      </Stack>
    </Box>
  );
};

export default function gridListWith() {
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      {
        setIsLoading(false);
      }
    });

    return () => unsubscribe();
  }, [router]);

  if (isLoading) return <p>Loading...</p>;

  return (
    <Box p={4}>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
          WELCOME TO LANGSWORLD
        </Heading>
        <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
          Random Text
        </Text>
      </Stack>

      <Container maxW={"9xl"} mt={12}>
        <HStack spacing={4} justify="center">
          {" "}
          {/* Horizontal layout with centered alignment */}
          <AspectRatio width="25%" ratio={4 / 3}>
            <iframe
              title="Is it Tru 1"
              src="https://www.youtube.com/embed/iMqN9bmoNjI"
              allowFullScreen
            />
          </AspectRatio>
          <AspectRatio width="25%" ratio={4 / 3}>
            <iframe
              title="Is it Tru 2"
              src="https://www.youtube.com/embed/pWozhSr3YBI"
              allowFullScreen
            />
          </AspectRatio>
          <AspectRatio width="25%" ratio={4 / 3}>
            <iframe
              title="Is it Tru 1"
              src="https://www.youtube.com/embed/xVsE2PEMZOg"
              allowFullScreen
            />
          </AspectRatio>
          <AspectRatio width="25%" ratio={4 / 3}>
            <iframe
              title="Is it Tru 1"
              src="https://www.youtube.com/embed/Ub35MBQXKGI"
              allowFullScreen
            />
          </AspectRatio>
        </HStack>
      </Container>
      <Container maxW={"9x"} mt={12}>
        <HStack spacing={4} justify="center">
          {" "}
          {/* Horizontal layout with centered alignment */}
          <AspectRatio width="25%" ratio={4 / 3}>
            <iframe
              title="Is it Tru 1"
              src="https://www.youtube.com/embed/ahNtp1dvrpg"
              allowFullScreen
            />
          </AspectRatio>
          <AspectRatio width="25%" ratio={4 / 3}>
            <iframe
              title="Is it Tru 2"
              src="https://www.youtube.com/embed/TIZ3SUhAXNk"
              allowFullScreen
            />
          </AspectRatio>
        </HStack>
      </Container>
    </Box>
  );
}
