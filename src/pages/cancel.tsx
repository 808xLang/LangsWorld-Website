import { useRouter } from "next/router";
import { Box, Button, Text, VStack, Flex } from "@chakra-ui/react";

export default function Cancel() {
  const router = useRouter();

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
      <VStack spacing={6} textAlign="center">
        <Text fontSize="4xl" fontWeight="bold" color="pink.400">
          Payment Cancelled
        </Text>
        <Text fontSize="lg" color="gray.300">
          No worries — your card was not charged. You can head back and grab
          your beat whenever you're ready.
        </Text>
        <Button
          bgGradient="linear(to-r, purple.500, pink.500)"
          color="white"
          size="lg"
          borderRadius="2xl"
          onClick={() => router.push("/beats")}
        >
          Back to Beat Gallery
        </Button>
      </VStack>
    </Flex>
  );
}