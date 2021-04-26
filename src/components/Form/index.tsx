import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/router';

import fetch from 'isomorphic-unfetch';
import { Form as Unform } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';

import * as Yup from 'yup';
import 'yup-phone';

import { Input } from './Input';
import { Button } from '@chakra-ui/button';
import { Stack } from '@chakra-ui/layout';
import { Select } from './Select';

interface FormData {
  email: string;
  fullname: string;
  phone: string;
  country: string;
}

interface FormProps {
  id: number;
}

export function Form({ id }: FormProps) {
  const formRef = useRef<FormHandles>(null);
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, fullname, phone, country } = data;

    const url = `https://murilomessias.activehosted.com/proc.php?u=${id}&f=${id}&s=&c=0&m=0&act=sub&v=2&fullname=${fullname}&email=${email}&phone=${phone}&country=${country}&jsonp=true`;
    fetch(url, {
      method: 'POST',
      mode: 'no-cors',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    try {
      formRef.current.setErrors({});

      const schema = Yup.object().shape({
        fullname: Yup.string().min(4).required('O nome é obrigatório'),
        email: Yup.string()
          .email('Informe um e-mail válido')
          .required('O e-mail é obrigatório'),
        phone: Yup.string()
          .phone('BR', true, 'O número de telefone é inválido')
          .required('O telefone é obrigatório'),
        country: Yup.string().required('O campo é obrigatório'),
      });

      await schema.validate(data, { abortEarly: false });

      console.log(data);

      setIsSubmitting(true);

      setTimeout(() => {
        router.push('/obrigado'); // and define where to redirect
      }, 3000);
    } catch (err) {
      const validationErrors = {};
      if (err instanceof Yup.ValidationError) {
        err.inner.forEach((error) => {
          validationErrors[error.path] = error.message;
        });
        formRef.current.setErrors(validationErrors);
      }
    }
  };

  useEffect(() => {
    router.prefetch('/obrigado');
  }, []);

  const selectOptions = [
    { value: 'brazil', label: 'Brazil' },
    { value: 'usa', label: 'USA' },
    { value: 'argentina', label: 'Argentina' },
  ];

  return (
    <>
      <Unform onSubmit={handleSubmit} ref={formRef}>
        <Stack spacing={4}>
          <Input
            type="text"
            name="fullname"
            label="Nome"
            placeholder="Digite seu nome"
          />

          <Input
            type="text"
            name="email"
            label="Email"
            placeholder="Digite seu e-mail"
          />

          <Input
            type="tel"
            name="phone"
            label="Seu telefone"
            placeholder="+55 (99) 99999 9999"
            helper="Coloque o código do seu país"
          />

          <Select
            name="country"
            label="Escolha seu país"
            placeholder="Veja os países"
          >
            {selectOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Select>

          <Button
            type="submit"
            colorScheme="pink"
            size="lg"
            isLoading={isSubmitting}
          >
            Quero Receber
          </Button>
        </Stack>
      </Unform>
    </>
  );
}
