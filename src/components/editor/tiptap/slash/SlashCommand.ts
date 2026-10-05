import { Extension } from '@tiptap/core';
import { ReactRenderer } from '@tiptap/react';
import Suggestion from '@tiptap/suggestion';

import { SlashMenu, type SlashMenuRef } from './SlashMenu';
import { slashCommandItems, type SlashCommandItem } from './slashCommandItems';

export const SlashCommand = Extension.create({
  name: 'slashCommand',

  addProseMirrorPlugins() {
    return [
      Suggestion<SlashCommandItem>({
        editor: this.editor,
        char: '/',

        items: ({ query }) => {
          const search = query.toLowerCase();

          return slashCommandItems.filter((item) => {
            return (
              item.title.toLowerCase().includes(search) ||
              item.keywords.some((keyword) => keyword.includes(search))
            );
          });
        },

        command: ({ editor, range, props }) => {
          props.command(editor, range);
        },

        render: () => {
          let component: ReactRenderer<SlashMenuRef> | null = null;
          let unmount: (() => void) | null = null;

          return {
            onStart: (props) => {
              component = new ReactRenderer(SlashMenu, {
                props,
                editor: props.editor,
              });

              unmount = props.mount(component.element);
            },

            onUpdate: (props) => {
              component?.updateProps(props);
            },

            onKeyDown: ({ event }) => {
              if (event.key === 'Escape') {
                return false;
              }

              return component?.ref?.onKeyDown(event) ?? false;
            },

            onExit: () => {
              unmount?.();
              component?.destroy();

              component = null;
              unmount = null;
            },
          };
        },
      }),
    ];
  },
});
