import { forwardRef, useImperativeHandle, useState } from 'react';
import type { SuggestionProps } from '@tiptap/suggestion';

import type { SlashCommandItem } from './slashCommandItems';

export type SlashMenuRef = {
  onKeyDown: (event: KeyboardEvent) => boolean;
};

export const SlashMenu = forwardRef<SlashMenuRef, SuggestionProps<SlashCommandItem>>(
  ({ items, command }, ref) => {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectItem = (index: number) => {
      const item = items[index];

      if (!item) {
        return;
      }

      command(item);
    };

    useImperativeHandle(ref, () => ({
      onKeyDown: (event) => {
        if (!items.length) {
          return false;
        }

        if (event.key === 'ArrowUp') {
          setSelectedIndex((current) => (current <= 0 ? items.length - 1 : current - 1));

          return true;
        }

        if (event.key === 'ArrowDown') {
          setSelectedIndex((current) => (current >= items.length - 1 ? 0 : current + 1));

          return true;
        }

        if (event.key === 'Enter') {
          const safeIndex = Math.min(selectedIndex, items.length - 1);

          selectItem(safeIndex);

          return true;
        }

        return false;
      },
    }));

    const safeSelectedIndex = Math.min(selectedIndex, Math.max(items.length - 1, 0));

    if (!items.length) {
      return null;
    }

    return (
      <div className="w-56 rounded-md border border-neutral-200 bg-white p-1 shadow-md">
        {items.map((item, index) => (
          <button
            key={item.title}
            type="button"
            className={`flex w-full rounded px-2 py-1.5 text-left text-sm ${
              index === safeSelectedIndex ? 'bg-neutral-100' : 'hover:bg-neutral-100'
            }`}
            onMouseEnter={() => setSelectedIndex(index)}
            onClick={() => selectItem(index)}
          >
            {item.title}
          </button>
        ))}
      </div>
    );
  },
);

SlashMenu.displayName = 'SlashMenu';
