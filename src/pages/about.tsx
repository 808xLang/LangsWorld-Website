import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Text,
  Stack,
  SimpleGrid,
  Image,
  Heading,
  Button,
} from "@chakra-ui/react";
import { projects } from "../data/projects";

export default function AboutPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [userData, setUserData] = useState<string>("");

  



  return (
    <Box bgGradient="linear(to-br, rgba(15, 23, 42, 1), #050505ff, rgba(15, 23, 42, 1))">
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Text
          fontSize="5xl"
          fontWeight="bold"
          bgGradient="linear(to-r, purple.400, pink.400)"
          bgClip="text"
          textAlign="center"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
        >
          Hi! my name is Langston!
        </Text>
        <Text
          bgGradient="linear(to-r, purple.600, pink.600)"
          bgClip="text"
          fontSize="3xl"
          fontWeight="bold"
        >
          Software Engineer, Producer, and Creative
        </Text>
        <Text color="grey" fontSize="xl">
  I&apos;m a software engineer specializing in building and designing digital
  experiences I&apos;m focused on builing accessible human-centered products.
</Text>
        <SimpleGrid columns={{ base: 1, md: 3 }} spacing={8} mt={10}>
          {projects.map((project) => (
            <Box
              key={project.title}
              bg="gray.800"
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              transition="0.3s"
              _hover={{
                transform: "translateY(-5px)",
                boxShadow: "2xl",
              }}
            >
              <Image
                src={project.image}
                alt={project.title}
                h="200px"
                w="100%"
                objectFit="cover"
              />

              <Stack p={5}>
                <Heading size="md" color="white">
                  {project.title}
                </Heading>

                <Text color="gray.300">{project.description}</Text>

                <Button colorScheme="purple">View Project</Button>
              </Stack>
            </Box>
          ))}
        </SimpleGrid>
      </Stack>
    </Box>
  );
}
