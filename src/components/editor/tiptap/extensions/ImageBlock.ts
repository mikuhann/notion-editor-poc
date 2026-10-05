import { mergeAttributes, Node } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';

import { ImageBlockView } from './ImageBlockView';

export const ImageBlock = Node.create({
  name: 'imageBlock',

  group: 'block',

  atom: true,

  draggable: true,

  addAttributes() {
    return {
      src: {
        default: '',
      },
      alt: {
        default: '',
      },
      caption: {
        default: '',
      },
    };
  },

  parseHTML() {
    return [
      {
        tag: 'figure[data-type="image-block"]',
      },
    ];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'figure',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'image-block',
      }),
      [
        'img',
        {
          src: node.attrs.src,
          alt: node.attrs.alt,
        },
      ],
      ['figcaption', {}, node.attrs.caption],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageBlockView);
  },
});
