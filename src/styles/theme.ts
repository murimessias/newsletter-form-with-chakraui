import { extendTheme } from '@chakra-ui/react';

export const theme = extendTheme({
  colors: {},

  fonts: {
    heading: 'DM Sans',
    body: 'DM Sans',
  },

  styles: {
    global: {
      body: {
        bg: 'gray.900',
        color: 'gray.50',
      },
    },
  },
});
