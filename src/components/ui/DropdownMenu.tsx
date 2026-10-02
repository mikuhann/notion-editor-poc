import type { ReactNode } from 'react';
import { DropdownMenu as RadixDropdownMenu } from 'radix-ui';

type DropdownMenuProps = {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
};

type DropdownMenuItemProps = {
  children: ReactNode;
  onSelect?: () => void;
};

export const DropdownMenu = ({ trigger, children, align = 'start' }: DropdownMenuProps) => {
  return (
    <RadixDropdownMenu.Root>
      <RadixDropdownMenu.Trigger asChild>{trigger}</RadixDropdownMenu.Trigger>

      <RadixDropdownMenu.Portal>
        <RadixDropdownMenu.Content
          align={align}
          sideOffset={6}
          className="z-50 min-w-48 rounded-md border border-neutral-200 bg-white p-1 shadow-md"
        >
          {children}
        </RadixDropdownMenu.Content>
      </RadixDropdownMenu.Portal>
    </RadixDropdownMenu.Root>
  );
};

export const DropdownMenuItem = ({ children, onSelect }: DropdownMenuItemProps) => {
  return (
    <RadixDropdownMenu.Item
      onSelect={onSelect}
      className="flex cursor-pointer select-none items-center rounded px-2 py-1.5 text-sm text-neutral-700 outline-none hover:bg-neutral-100 focus:bg-neutral-100"
    >
      {children}
    </RadixDropdownMenu.Item>
  );
};
