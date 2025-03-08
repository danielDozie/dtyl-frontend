import React from 'react';
import { VariantProps, cva } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const textVariants = cva('text-base', {
  variants: {
    variant: {
      default: 'text-gray-900',
      muted: 'text-gray-500',
      accent: 'text-blue-600',
    },
    size: {
      sm: 'text-sm',
      md: 'text-base',
      lg: 'text-lg',
      xl: 'text-xl',
      heading: 'text-2xl md:text-[40px] !font-medium',
      body: 'text-base font-light'
    },
    weight: {
      normal: 'font-normal',
      medium: 'font-medium',
      bold: 'font-bold',
    },
  },
  defaultVariants: {
    variant: 'default',
    size: 'md',
    weight: 'normal',
  },
});

interface TextProps
  extends React.HTMLAttributes<HTMLParagraphElement>,
    VariantProps<typeof textVariants> {}

const Text = React.forwardRef<HTMLParagraphElement, TextProps>(
  ({ className, variant, size, weight, ...props }, ref) => {
    return (
      <p
            className={cn(textVariants({ variant, size, weight }), className, `text-foreground`)}
        ref={ref}
        {...props}
      />
    );
  }
);

Text.displayName = 'Text';

export { Text, textVariants };
