import {
  FormControl,
  FormLabel,
  Select as ChakraSelect,
  SelectProps as ChakraSelectProps,
  Text,
} from '@chakra-ui/react';

import { ReactNode, SelectHTMLAttributes, useEffect, useRef } from 'react';
import { useField } from '@unform/core';

interface Props extends ChakraSelectProps {
  name: string;
  label?: string;
  placeholder?: string;
  children: ReactNode;
}

type SelectProps = SelectHTMLAttributes<HTMLSelectElement> & Props;

export function Select({
  name,
  label,
  children,
  placeholder,
  ...rest
}: SelectProps) {
  const selectRef = useRef<HTMLSelectElement>(null);

  const { fieldName, defaultValue, registerField, error } = useField(name);

  useEffect(() => {
    registerField({
      ref: selectRef,
      name: fieldName,

      getValue: (ref) => {
        return ref.current?.value;
      },

      setValue: (ref, newValue) => {
        ref.current.value = newValue;
      },

      clearValue: (ref) => {
        ref.current.value = '';
      },
    });
  }, [fieldName, registerField]);

  return (
    <FormControl id={fieldName}>
      {label && <FormLabel htmlFor={fieldName}>{label}</FormLabel>}

      <ChakraSelect
        ref={selectRef}
        placeholder={placeholder}
        defaultValue={defaultValue}
        size="lg"
        color="gray.400"
      >
        {children}
      </ChakraSelect>

      {error && (
        <Text fontSize="sm" color="red.500" mt="2">
          {error}
        </Text>
      )}
    </FormControl>
  );
}
