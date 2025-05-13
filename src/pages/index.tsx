import React from 'react';
import Navbar from '../components/navBar';
import Homepage from './videos'
import Calender from './calendar';
import Tapes from '../Tapes/tapes'

import { ChakraProvider } from '@chakra-ui/react'


const Home: React.FC = () => {
    return (
        <ChakraProvider>
            
            <Tapes/>
            {/* <Homepage/> */}
            {/* <Calender/> */}
        </ChakraProvider>
    )
}

export default Home;