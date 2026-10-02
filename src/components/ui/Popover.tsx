import type { ReactNode } from 'react';
import { Popover as RadixPopover } from 'radix-ui';

type PopoverProps = {
  trigger: ReactNode;
  children: ReactNode;
  align?: 'start' | 'center' | 'end';
};

export const Popover = ({ trigger, children, align = 'start' }: PopoverProps) => {
  return (
    <RadixPopover.Root>
      <RadixPopover.Trigger asChild>{trigger}</RadixPopover.Trigger>

      <RadixPopover.Portal>
        <RadixPopover.Content
          align={align}
          sideOffset={6}
          className="z-50 min-w-48 rounded-md border border-neutral-200 bg-white p-1 shadow-md"
        >
          {children}
        </RadixPopover.Content>
      </RadixPopover.Portal>
    </RadixPopover.Root>
  );
};
