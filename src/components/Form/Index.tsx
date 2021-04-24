import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { useForm, SubmitHandler } from 'react-hook-form';

import * as yup from 'yup';
import 'yup-phone';
import { yupResolver } from '@hookform/resolvers/yup';

import { Input } from './Input';
import { RiPhoneFill, RiMailFill } from 'react-icons/ri';

import { useState } from 'react';

type FormData = {
  name: string;
  email: string;
  phone: string;
};

const formSchema = yup.object().shape({
  name: yup.string().required('Fill with your name'),
  email: yup.string().required('Email is required').email('Email is invalid'),
  phone: yup
    .string()
    .phone('', true, 'Please, fill with a correct phone number')
    .required(),
});

export function Form() {
  const { register, handleSubmit, formState } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { errors } = formState;

  const handleSubmitForm: SubmitHandler<FormData> = async (values) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    console.log(values);
  };
  const [value, setValue] = useState();

  return (
    <>
      <Box>
        <Heading textAlign="center">Join our community!</Heading>
        <Text textAlign="center" fontSize="sm">
          Fill the form above and be a part of our community.
        </Text>
      </Box>

      <Box as="form" mt={6} onSubmit={handleSubmit(handleSubmitForm)}>
        <Stack spacing={4} color="gray.500">
          <Input
            label="Your name"
            type="name"
            id="name"
            {...register('name')}
            error={errors.name}
          />
          <Input
            label="Your email"
            type="email"
            id="email"
            {...register('email')}
            error={errors.email}
            icon={RiMailFill}
          />

          <Input
            label="Your phone number"
            type="tel"
            id="phone"
            {...register('phone')}
            error={errors.phone}
            placeholder="(+55) 99999-9999"
            icon={RiPhoneFill}
          />
        </Stack>
        <Button
          w="100%"
          size="lg"
          colorScheme="pink"
          type="submit"
          mt={8}
          isLoading={formState.isSubmitting}
        >
          Submit!
        </Button>
      </Box>
    </>
  );
}
