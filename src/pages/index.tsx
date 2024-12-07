import React from 'react';
import Navbar from '../components/navBar';
import Homepage from '../components/homePage'
import Calender from './calendar';

import { ChakraProvider } from '@chakra-ui/react'


const Home: React.FC = () => {
    return (
        <ChakraProvider>
            <Homepage/>
            {/* <Calender/> */}
        </ChakraProvider>
    )
}

export default Home;