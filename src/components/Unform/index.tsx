import { useRef } from 'react';

import { Form } from '@unform/web';
import { SubmitHandler, FormHandles } from '@unform/core';
import * as Yup from 'yup';
import fetch from 'isomorphic-unfetch';

import { Input } from './Input';
import { Button } from '@chakra-ui/button';

interface FormData {
  email: string;
  fullname: string;
}

interface ActiveCampaingProps {
  id: number;
}

export function ActiveCampaing({ id }: ActiveCampaingProps) {
  const formRef = useRef<FormHandles>(null);

  const handleSubmit: SubmitHandler<FormData> = async (data) => {
    const { email, fullname } = data;
    const url = `https://murilomessias.activehosted.com/proc.php?u=${id}&f=${id}&s=&c=0&m=0&act=sub&v=2&fullname=${fullname}&email=${email}&jsonp=true`;
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
      });

      await schema.validate(data, { abortEarly: false });

      // Validation passed
      console.log(data);
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

  return (
    <>
      <Form onSubmit={handleSubmit} ref={formRef}>
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

        <Button type="submit" colorScheme="pink">
          Quero Receber
        </Button>
      </Form>
    </>
  );
}
