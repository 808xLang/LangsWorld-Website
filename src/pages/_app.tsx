import { ChakraProvider } from '@chakra-ui/react';
import Navbar from '../components/navBar'; // Adjust the path if Navbar is in a different directory
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <Navbar /> {/* Navbar will appear on every page */}
      <Component {...pageProps} /> {/* Each page will be rendered here */}
    </ChakraProvider>
  );
}

export default MyApp;