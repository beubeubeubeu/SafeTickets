'use client'

import { useAccount } from 'wagmi';
import { React, useEffect, useState } from 'react';
import { ExternalLinkIcon } from '@chakra-ui/icons';
import TicketCard from '../components/ui/TicketCard';
import EmptyTicketCard from '../components/ui/EmptyTicketCard';
import {
  Box,
  Text,
  Flex,
  Link,
  Badge,
  Center,
  Heading,
  Divider,
  GridItem,
  SimpleGrid
} from '@chakra-ui/react';

const Marketplace = () => {

  const address = useAccount().address

  const [fetchingTicketsData, setFetchingTicketsData] = useState(true);
  const [tickets, setTickets] = useState([]);

  // Fetch selling ticket data (on sale)
  useEffect(() => {
    const getAllTickets = async () => {
      if (address !== undefined) {
        await fetchTicketsData();
      }
    }
    getAllTickets();
  }, [address])

  const fetchTicketsData = async () => {
    try {
      setFetchingTicketsData(true);
      const response = await fetch(`/api/tickets/selling`);
      const onSaleTickets = await response.json();
      setTickets(onSaleTickets.data);
      setFetchingTicketsData(false);
    } catch (error) {
      console.error("Failed to fetch data:", error);
      setFetchingTicketsData(false);
    }
  };

  const onBoughtItem = async () => {
    await fetchTicketsData();
  }

  return (
    <>
      <Heading mt={"32px"}textAlign={'center'}>Shop</Heading>
      <Center>
        <Box mx={5} maxWidth={'500px'}>
          <Divider my={5} border={'none'}></Divider>
          <Text textAlign={'center'} fontSize='sm'>After buying a ticket it will appear in your <Link href="/buyings"><Badge colorScheme='teal'>Buyings<ExternalLinkIcon mb='3px' mx='2px' /></Badge></Link> page</Text>
        </Box>
      </Center>

      <Divider my={5} border={'none'}></Divider>

      <Flex
        direction="column"
        align="center"
        justify="center" // This centers the content vertically in the Flex container
      >
        <SimpleGrid
          columns={{ base: 1, md: 3 }}
          spacing="32px"
        >

          {/* Empty state */}
          { fetchingTicketsData && [...Array(3)].map((_, index) => (
            <GridItem key={index}>
              <EmptyTicketCard/>
            </GridItem>
          ))}

          {/* Loop over tickets to generate Ticket Cards, wrapped with GridItem */}
          { !fetchingTicketsData && tickets.length > 0 && tickets.map((ticket, index) => (
            <GridItem key={index}>
              <TicketCard
                index={index}
                cidJSON={ticket.cidJSON}
                cidImage={ticket.cidImage}
                draft={false}
                tokenId={ticket.tokenId}
                collection={null}
                shop={true}
                buyings={false}
                onBoughtItem={onBoughtItem}
                onDeleteItem={() => null}
                onMintedItem={() => null}
              />
            </GridItem>
          ))}
        </SimpleGrid>
      </Flex>
    </>
  )
}

export default Marketplace