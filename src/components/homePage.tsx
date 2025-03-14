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

export default function GridListWith() {
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
    <Box minH="100vh" py={8}>
      <Box
        p={4}
        // background={"grey"}
      >
        <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
          <Heading fontSize={{ base: "2xl", sm: "4xl" }} fontWeight={"bold"}>
            WELCOME TO LANGSWORLD
          </Heading>
          <Text color={"gray.600"} fontSize={{ base: "sm", sm: "lg" }}>
            Producer and engineer Langston Wooten has over 1 Million play across
            Youtube
          </Text>
        </Stack>

        <Container
          maxW="9xl"
          mt={12}
          p={6}
          // bg="purple.300"
          bg="grey.800"
          borderRadius="lg"
          boxShadow="base"
          // bg="grey.800"
        >
          <HStack spacing={4} justify="center">
            {" "}
            {/* Horizontal layout with centered alignment */}
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
              <iframe
                title="Is it Tru 1"
                src="https://www.youtube.com/embed/ahNtp1dvrpg"
                allowFullScreen
              />
            </AspectRatio>
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
              <iframe
                title="Is it Tru 2"
                src="https://www.youtube.com/embed/pWozhSr3YBI"
                allowFullScreen
              />
            </AspectRatio>
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
              <iframe
                title="Is it Tru 1"
                src="https://www.youtube.com/embed/iMqN9bmoNjI"
                allowFullScreen
              />
            </AspectRatio>
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
              <iframe
                title="Is it Tru 1"
                src="https://www.youtube.com/embed/Ui_4G1v1xeA"
                // Ui_4G1v1xeA
                allowFullScreen
              />
            </AspectRatio>
          </HStack>
        </Container>
        <Container
          maxW="9xl"
          mt={12}
          p={6}
          // bg="purple.300"
          borderRadius="lg"
          boxShadow="base"
        >
          <HStack spacing={4} justify="center">
            {" "}
            {/* Horizontal layout with centered alignment */}
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
              <iframe
                title="Is it Tru 1"
                src="https://www.youtube.com/embed/Ui_4G1v1xeA"
                allowFullScreen
              />
            </AspectRatio>
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
              <iframe
                title="Is it Tru 2"
                src="https://www.youtube.com/embed/CeOeAbsfZAU"
                allowFullScreen
              />
            </AspectRatio>
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
              <iframe
                title="Is it Tru 2"
                src="https://www.youtube.com/embed/StmKKD3ZoXk"
                allowFullScreen
              />
            </AspectRatio>
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
              <iframe
                title="Is it Tru 2"
                src="https://www.youtube.com/embed/yfZ1HSJQJuM"
                allowFullScreen
              />
            </AspectRatio>
          </HStack>
        </Container>
        <Container
          maxW="9xl"
          mt={12}
          p={6}
          // bg="purple.300"
          borderRadius="lg"
          boxShadow="base"
        >
          <HStack spacing={4} justify="center">
            {" "}
            {/* Horizontal layout with centered alignment */}
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
              <iframe
                title="Is it Tru 1"
                src="https://www.youtube.com/embed/rA06WkDgIfM"
                allowFullScreen
              />
            </AspectRatio>
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
              <iframe
                title="Is it Tru 2"
                src="https://www.youtube.com/embed/TIZ3SUhAXNk"
                allowFullScreen
              />
            </AspectRatio>
          </HStack>
        </Container>
      </Box>
    </Box>
  );
}
// https://www.youtube.com/embed/xVsE2PEMZOg
