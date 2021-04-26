import { Flex } from '@chakra-ui/react';
import { Form } from '../components/Form';

export default function Home() {
  return (
    <Flex align="center" justify="center" h="100vh" w="100%">
      <Flex
        flexDir="column"
        minW="480px"
        py={10}
        px={8}
        bg="gray.800"
        borderRadius={8}
      >
        <Form id={1} />
      </Flex>
    </Flex>
  );
}
