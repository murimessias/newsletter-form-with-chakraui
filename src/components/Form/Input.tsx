import { useEffect, useRef } from 'react';
import { useField } from '@unform/core';

import {
  FormLabel,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  FormControl,
  Text,
  FormHelperText,
} from '@chakra-ui/react';

interface Props extends ChakraInputProps {
  name: string;
  label?: string;
  helper?: string;
}

type InputProps = JSX.IntrinsicElements['input'] & Props;

export function Input({ name, label, helper, ...rest }: InputProps) {
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
    <FormControl id={fieldName}>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}
      <ChakraInput
        id={fieldName}
        ref={inputRef}
        defaultValue={defaultValue}
        {...rest}
        size="lg"
      />

      {helper && <FormHelperText>{helper}</FormHelperText>}

      {error && (
        <Text fontSize="sm" color="red.500" mt="2">
          {error}
        </Text>
      )}
    </FormControl>
  );
}
