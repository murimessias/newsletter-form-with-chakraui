import { Box, Button, Heading, Stack, Text } from '@chakra-ui/react';
import { Input } from '../Form/Input';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'yup-phone';

import { RiMailFill } from 'react-icons/ri';
import { useState } from 'react';

const formSchema = yup.object().shape({
  email: yup.string().required('Email is required').email('Email is invalid'),
});

export function NewsletterForm() {
  const [formSubmitted, setFormSubmitted] = useState(false);

  const { register, formState } = useForm({
    resolver: yupResolver(formSchema),
  });

  const { errors } = formState;

  function onSubmit(e) {
    e.preventDefault(e);
    const data = new FormData(e.target);
    console.log(data);

    fetch('https://murilomessias.activehosted.com/proc.php', {
      method: 'POST',
      body: data,
      mode: 'no-cors',
    })
      .then((response) => {
        setFormSubmitted(true);
        setTimeout(() => {
          setFormSubmitted(false);
        }, 5000);
      })
      .catch((error) => console.log('Request failed', error));
  }

  return (
    <>
      <Box mb={4}>
        <Heading textAlign="center">Join our community!</Heading>
        <Text textAlign="center" fontSize="sm">
          Fill the form above and be a part of our community.
        </Text>
      </Box>

      {formSubmitted && (
        <Text textAlign="center">
          <strong>THANK YOU</strong> for joining our mailing list!
          <br />
          Check your inbox for a confirmation.
        </Text>
      )}

      {!formSubmitted && (
        <Box as="form" onSubmit={onSubmit} id="_Box_1_">
          <Stack spacing={4}>
            <input type="hidden" name="u" value="1" />
            <input type="hidden" name="f" value="1" />
            <input type="hidden" name="s" />
            <input type="hidden" name="c" value="0" />
            <input type="hidden" name="m" value="0" />
            <input type="hidden" name="act" value="sub" />
            <input type="hidden" name="v" value="2" />

            <Input
              type="text"
              name="name"
              id="name"
              placeholder="Fill with your name"
              {...register('name')}
              error={errors.email}
              isRequired
            />

            <Input
              type="email"
              name="email"
              id="email"
              placeholder="ex: hello@youareawesome.com"
              {...register('email')}
              error={errors.email}
              icon={RiMailFill}
              isRequired
            />

            <Button type="submit" value="Submit" colorScheme="pink" size="lg">
              Submit
            </Button>
          </Stack>
        </Box>
      )}
    </>
  );
}
