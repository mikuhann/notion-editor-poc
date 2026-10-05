import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { ButtonBlockView } from './ButtonBlockView';

export const ButtonBlock = Node.create({
  name: 'buttonBlock',

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      label: {
        default: 'Button',
      },

      href: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'div[data-type="button-block"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'button-block',
      }),
      [
        'a',
        {
          href: node.attrs.href,
        },
        node.attrs.label,
      ],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ButtonBlockView);
  },
});
