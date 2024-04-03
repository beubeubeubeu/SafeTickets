import Link from 'next/link';
import { Heading, Box, Text, Button } from '@chakra-ui/react';

const Home = () => {
  return (
    <>
      <Box textAlign={'center'} mt={24}>
        <Heading as='h1' size='4xl'>Your tickets into NFT collections</Heading>
        <Link href='/collections'>
          <Button colorScheme='teal' size={'lg'} mt={'48px'}>Start Collecting Now</Button>
        </Link>
        <Text mt={'24px'}>🎟️ 🎫 🧾</Text>
      </Box>
    </>
  );
};

export default Home;
