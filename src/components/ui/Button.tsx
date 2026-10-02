import type { ButtonHTMLAttributes } from 'react';

export type ButtonVariant = 'default' | 'ghost';
export type ButtonSize = 'sm' | 'md' | 'icon';

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variantClasses: Record<ButtonVariant, string> = {
  default: 'bg-neutral-900 text-white hover:bg-neutral-800',
  ghost: 'bg-transparent text-neutral-700 hover:bg-neutral-100',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm',
  md: 'h-9 px-4 text-sm',
  icon: 'size-9',
};

export const Button = ({
  variant = 'default',
  size = 'md',
  className = '',
  type = 'button',
  ...props
}: ButtonProps) => {
  return (
    <button
      type={type}
      className={[
        'inline-flex items-center justify-center rounded-md font-medium transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400',
        'disabled:pointer-events-none disabled:opacity-50',
        variantClasses[variant],
        sizeClasses[size],
        className,
      ].join(' ')}
      {...props}
    />
  );
};
