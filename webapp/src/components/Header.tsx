import React from 'react';
import { Heading, Flex, Icon } from '@chakra-ui/react';
import { DiGithubBadge } from 'react-icons/di';

const Header: React.FC = () => (
  <Flex as='nav' align='center' bg='teal.400' color='white' padding='1.25rem' boxShadow='base'>
    <Flex align='center'width={{ sm: 'full' }}>
      <Heading as='h1' size='lg'>
        Name Application - Solita Dev Academy 2021
      </Heading>
    </Flex>
    <Flex align='center'>
      <a href='https://github.com/tominkki/dev-academy-2021'>
        <Icon as={DiGithubBadge} boxSize={8} borderRadius='full'
          _hover={{ boxSize: 9, boxShadow: 'dark-lg' }}
        />
      </a>
    </Flex>
  </Flex>
);

export default Header;
