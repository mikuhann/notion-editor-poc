import { type FormEvent, useState } from 'react';
import { Link, Unlink } from 'lucide-react';

import { Button, IconButton } from '@/components/ui';

type LinkPopoverProps = {
  open: boolean;
  active: boolean;
  initialUrl?: string;
  onOpenChange: (open: boolean) => void;
  onApply: (url: string) => void;
  onRemove: () => void;
};

export const LinkPopover = ({
  open,
  active,
  initialUrl = '',
  onOpenChange,
  onApply,
  onRemove,
}: LinkPopoverProps) => {
  const [url, setUrl] = useState('');

  const handleOpen = () => {
    setUrl(initialUrl || 'https://');
    onOpenChange(true);
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();

    const nextUrl = url.trim();

    if (!nextUrl) {
      return;
    }

    onApply(nextUrl);
    onOpenChange(false);
  };

  const handleRemove = () => {
    onRemove();
    onOpenChange(false);
  };

  return (
    <div className="relative">
      <IconButton
        icon={<Link size={16} />}
        label="Link"
        aria-pressed={active}
        className="aria-pressed:bg-neutral-200 aria-pressed:text-neutral-950"
        onMouseDown={(event) => event.preventDefault()}
        onClick={handleOpen}
      />

      {open && (
        <form
          onSubmit={handleSubmit}
          className="absolute left-0 top-full z-50 mt-2 flex w-80 gap-2 rounded-md border border-neutral-200 bg-white p-2 shadow-md"
          onKeyDown={(event) => {
            if (event.key === 'Escape') {
              onOpenChange(false);
            }
          }}
        >
          <input
            autoFocus
            value={url}
            onChange={(event) => setUrl(event.target.value)}
            placeholder="https://example.com"
            className="min-w-0 flex-1 rounded-md border border-neutral-200 px-2 text-sm outline-none focus:border-neutral-400"
          />

          {active && (
            <IconButton
              icon={<Unlink size={16} />}
              label="Remove link"
              variant="ghost"
              onClick={handleRemove}
            />
          )}

          <Button type="submit" size="sm">
            Apply
          </Button>
        </form>
      )}
    </div>
  );
};
