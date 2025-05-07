import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, Container, Heading, Stack, Text, Button } from "@chakra-ui/react";

export default function AboutPage() {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState<string>("");
  const [userData, setUserData] = useState<string>("");


  const messages = [
    "Good job!",
    "Keep going!",
    "You're doing great!",
    "Nice work!",
    "You're awesome!",
    "Way to go!",
    "That's impressive!",
    "Keep it up!",
    "You crushed it!",
    "Fantastic effort!"
  ];

  const fetchRandomData = async () => {
    try {
      const res = await axios.get('https://randomuser.me/api');
      // handle success
      console.log(res);
      return res;
    } catch (err) {
      // handle error
      console.log(err);
    }
  
  }
  useEffect(() => {
    
    
    //The code that we want to run
    const randomIndex = Math.floor(Math.random() * messages.length);
    setMessage(messages[randomIndex]);
    
    console.log(message);
    //optional return function
  }, [count]);// Dependency array

  return (
    <Box>
      <Stack spacing={4} as={Container} maxW={"3xl"} textAlign={"center"}>
        <Text
          fontSize="5xl"
          fontWeight="bold"
          bgGradient="linear(to-r, orange.400, red.400)"
          bgClip="text"
          textAlign="center"
          transition="transform 0.3s"
          _hover={{ transform: "scale(1.05)" }}
        >
          Hi! I'm Lang
        </Text>
        <Text fontSize="3xl" fontWeight="bold">
          Producer, Software Engineer, and Creative
        </Text>
        <Text fontSize="xl" >
          I made this counter right here and I also Made this website.
        </Text>
        <h1>{message}</h1>
        <h1>Count: {count}</h1>
        <Button onClick={() => setCount(count + 1)}>Up</Button>
        <Button onClick={() => setCount(count - 1)}>Down</Button>
        <Button onClick={() => {fetchRandomData();}}>Down</Button>
      </Stack>
    </Box>
  );
}

