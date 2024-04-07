'use client';

import { Flex } from '@chakra-ui/react'
import Navbar from './Navbar'
import Footer from './Footer'

const Layout = ({ children }) => {
  return (
    <Flex
      px={{ base: 0, md: '12px', lg: '64px', xl: '128px' }}
      backgroundColor="gray.100"
      direction="column"
      minH="100vh"
      py="2rem"
      grow="1"
    >
      <Navbar />
      {children}
      <Footer />
    </Flex>
  )
}

export default Layout