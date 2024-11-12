'use client'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { auth } from '../components/googleSignin/config'; // Ensure you have the correct path



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
} from '@chakra-ui/react'
import { ReactElement } from 'react'
import {
  FcAbout,
  FcAssistant,
  FcCollaboration,
  FcDonate,
  FcManager,
  FcCompactCamera,
  FcMusic,
} from 'react-icons/fc'

interface CardProps {
  heading: string
  description: string
  icon: ReactElement
  href: string
}



const Card = ({ heading, description, icon, href }: CardProps) => {
  
  return (
    <Box
      maxW={{ base: 'full', md: '275px' }}
      w={'full'}
      borderWidth="1px"
      borderRadius="lg"
      overflow="hidden"
      p={5}>
      <Stack align={'start'} spacing={2}>
        <Flex
          w={16}
          h={16}
          align={'center'}
          justify={'center'}
          color={'white'}
          rounded={'full'}
          bg={useColorModeValue('gray.100', 'gray.700')}>
          {icon}
        </Flex>
        <Box mt={2}>
          <Heading size="md">{heading}</Heading>
          <Text mt={1} fontSize={'sm'}>
            {description}
          </Text>
        </Box>
        <Button variant={'link'} colorScheme={'blue'} size={'sm'}>
          Learn more
        </Button>
      </Stack>
    </Box>
  )
}

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
      <Stack spacing={4} as={Container} maxW={'3xl'} textAlign={'center'}>
        <Heading fontSize={{ base: '2xl', sm: '4xl' }} fontWeight={'bold'}>
          WELCOME TO LANGSWORLD 
        </Heading>
        <Text color={'gray.600'} fontSize={{ base: 'sm', sm: 'lg' }}>
          LangsWorld is not done yet but aye this is what I have now
        </Text>
      </Stack>

      <Container maxW={'5xl'} mt={12}>
        <Flex flexWrap="wrap" gridGap={6} justify="center">
          <Card
            heading={'BEATS'}
            icon={<Icon as={FcMusic} w={10} h={10} />}
            description={'Listen to and purchase beats.'}
            href={'#'}
          />
          <Card
            heading={'BOOK A SESSION'}
            icon={<Icon as={FcCollaboration} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          <Card
            heading={'VIDEOS'}
            icon={<Icon as={FcCompactCamera} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          <Card
            heading={'LANGSWORLD RADIO'}
            icon={<Icon as={FcManager} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
          <Card
            heading={'Heading'}
            icon={<Icon as={FcAbout} w={10} h={10} />}
            description={'Lorem ipsum dolor sit amet catetur, adipisicing elit.'}
            href={'#'}
          />
        </Flex>
      </Container>
    </Box>
  )
}