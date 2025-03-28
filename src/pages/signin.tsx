// components/GoogleSignIn.tsx
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'; // Import Next.js router
import { auth, provider, signInWithPopup } from '../components/googleSignin/config';
import { User } from 'firebase/auth';
import { Box, Button, Image, Text, VStack, HStack, Flex } from "@chakra-ui/react";

export default function GoogleSignIn() {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter(); // Initialize Next.js router

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push('/'); // Redirect to the homepage
    } catch (error) {
      console.error("Error during sign-in:", error);
    }
  };

  const handleSignOut = async () => {
    await auth.signOut();
    setUser(null);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setUser(user ? user : null);
    });

    return () => unsubscribe();
  }, []);


return (
  <Flex 
    direction="column" 
    align="center" 
    justify="center" 
    minH="100vh" 
    bgGradient="linear(to-b, gray.900, gray.800)"
    color="white"
    p={6}
  >
    {user ? (
      <VStack 
        spacing={6} 
        p={6} 
        bg="gray.700" 
        borderRadius="lg" 
        boxShadow="lg"
        w="100%" 
        maxW="400px" 
        textAlign="center"
      >
        <Image 
          src={user.photoURL || ''} 
          alt={user.displayName || 'User Avatar'} 
          boxSize="80px" 
          borderRadius="full" 
          boxShadow="md"
        />
        <Text fontSize="xl" fontWeight="bold">Welcome, {user.displayName}</Text>
        <Text fontSize="md" color="gray.300">Email: {user.email}</Text>
        <Button 
          onClick={handleSignOut} 
          colorScheme="red" 
          size="lg" 
          _hover={{ transform: "scale(1.05)" }}
        >
          Sign Out
        </Button>
      </VStack>
    ) : (
      <VStack spacing={6}>
        <Text fontSize="3xl" fontWeight="bold">Sign in to Access Beats</Text>
        <Button 
          onClick={handleGoogleSignIn} 
          colorScheme="blue" 
          size="lg"
          boxShadow="lg"
          _hover={{ transform: "scale(1.05)" }}
        >
          Sign in with Google
        </Button>
      </VStack>
    )}
  </Flex>
);

}
