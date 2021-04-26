import { Flex } from '@chakra-ui/layout';
import { ActiveCampaing } from '../components/Unform';

export default function Obrigado() {
  return (
    <Flex
      flexDir="column"
      maxW="480px"
      py={10}
      px={8}
      bg="gray.800"
      borderRadius={8}
    >
      <ActiveCampaing id={1} />
    </Flex>
  );
}
