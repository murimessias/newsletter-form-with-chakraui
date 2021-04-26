import { Flex } from '@chakra-ui/react';
import { Form } from '../components/Form/Index';
import { NewsletterForm } from '../components/NewsletterForm';

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
        {/* <Form /> */}
        <NewsletterForm custom="1" />
      </Flex>
    </Flex>
  );
}
