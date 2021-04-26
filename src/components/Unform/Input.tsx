import React, { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import {
  FormErrorMessage,
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  Text,
} from '@chakra-ui/react';

interface Props extends ChakraInputProps {
  name: string;
  label?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export function Input({ name, label, ...rest }: InputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: inputRef,
      getValue: (ref) => {
        return ref.current.value;
      },
      setValue: (ref, value) => {
        ref.current.value = value;
      },
      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <>
      <FormControl id={fieldName}>
        {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
        <ChakraInput
          id={fieldName}
          ref={inputRef}
          defaultValue={defaultValue}
          {...rest}
          size="lg"
        />
        {error && (
          <Text fontSize="sm" color="red.500" mt="2">
            {error}
          </Text>
        )}
      </FormControl>
    </>
  );
}
