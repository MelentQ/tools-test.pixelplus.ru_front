import { definePreset } from '@primevue/themes';
import Aura from '@primevue/themes/aura';
import { ru } from 'primelocale/ru.json';

export default {
  theme: {
    preset: definePreset(Aura, {
      primitive: {
        borderRadius: {
          none: '0',
          xs: 'var(--border-radius)',
          sm: 'var(--border-radius)',
          md: 'var(--border-radius)',
          lg: 'var(--border-radius)',
          xl: 'var(--border-radius)',
        },
      },
      semantic: {
        primary: {
          50: '{neutral.50}',
          100: '{neutral.100}',
          200: '{neutral.200}',
          300: '{neutral.300}',
          400: '{neutral.400}',
          500: '{neutral.500}',
          600: '{neutral.600}',
          700: '{neutral.700}',
          800: '{neutral.800}',
          900: '{neutral.900}',
          950: '{neutral.950}',
        },
      },
    }),
  },
  locale: ru,
  pt: {
    select: {
      listContainer: {
        'data-lenis-prevent': '',
      },
    },
  },
};
