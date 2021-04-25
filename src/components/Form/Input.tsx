import { ElementType, ForwardRefRenderFunction, forwardRef } from 'react';
import {
  FormControl,
  FormLabel,
  Icon,
  Input as ChakraInput,
  InputProps as ChakraInputProps,
  InputGroup,
  InputLeftElement,
  FormErrorMessage,
} from '@chakra-ui/react';
import { FieldError } from 'react-hook-form';

interface InputProps extends ChakraInputProps {
  id: string;
  label?: string;
  placeholder?: string;
  icon?: ElementType;
  error?: FieldError;
}

const InputBase: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  { name, id, icon, placeholder, label, error = null, ...rest },
  ref
) => {
  return (
    <FormControl isInvalid={!!error}>
      {!!label && <FormLabel htmlFor={id}>{label}</FormLabel>}

      <InputGroup>
        {!!icon && (
          <InputLeftElement
            pointerEvents="none"
            children={<Icon as={icon} />}
            fontSize="lg"
            h="100%"
          />
        )}
        <ChakraInput
          id={id}
          name={id}
          placeholder={placeholder}
          size="lg"
          focusBorderColor="yellow.500"
          variant="filled"
          bg="gray.900"
          _hover={{ bg: 'gray.700' }}
          ref={ref}
          {...rest}
        />
      </InputGroup>
      {!!error && <FormErrorMessage>{error.message}</FormErrorMessage>}
    </FormControl>
  );
};

export const Input = forwardRef(InputBase);
