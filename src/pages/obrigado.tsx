import { Flex, Heading } from '@chakra-ui/layout';
import { useRouter } from 'next/router';

export default function Obrigado() {
  const router = useRouter();
  const { fullname } = router.query;

  return (
    <Flex align="center" justify="center" h="100vh" w="100%">
      <Heading>Obrigado {fullname}!</Heading>
    </Flex>
  );
}
