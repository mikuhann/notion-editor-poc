import type { ReactNode } from 'react';

import { Button, type ButtonProps } from './Button';

type IconButtonProps = Omit<ButtonProps, 'children' | 'size'> & {
  icon: ReactNode;
  label: string;
};

export const IconButton = ({ icon, label, variant = 'ghost', ...props }: IconButtonProps) => {
  return (
    <Button aria-label={label} title={label} variant={variant} size="icon" {...props}>
      {icon}
    </Button>
  );
};
