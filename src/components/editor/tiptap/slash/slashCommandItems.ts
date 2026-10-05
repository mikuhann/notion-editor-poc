import type { Editor } from '@tiptap/react';

type CommandRange = {
  from: number;
  to: number;
};

export type SlashCommandItem = {
  title: string;
  keywords: string[];
  command: (editor: Editor, range: CommandRange) => void;
};

export const slashCommandItems: SlashCommandItem[] = [
  {
    title: 'Text',
    keywords: ['paragraph', 'text'],
    command: (editor, range) => {
      editor.chain().focus().deleteRange(range).setParagraph().run();
    },
  },
  {
    title: 'Heading 1',
    keywords: ['h1', 'heading'],
    command: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 1 }).run();
    },
  },
  {
    title: 'Heading 2',
    keywords: ['h2', 'heading'],
    command: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 2 }).run();
    },
  },
  {
    title: 'Heading 3',
    keywords: ['h3', 'heading'],
    command: (editor, range) => {
      editor.chain().focus().deleteRange(range).setHeading({ level: 3 }).run();
    },
  },
  {
    title: 'Bullet list',
    keywords: ['bullet', 'ul', 'list'],
    command: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleBulletList().run();
    },
  },
  {
    title: 'Ordered list',
    keywords: ['ordered', 'ol', 'numbered', 'list'],
    command: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleOrderedList().run();
    },
  },
  {
    title: 'Quote',
    keywords: ['quote', 'blockquote'],
    command: (editor, range) => {
      editor.chain().focus().deleteRange(range).toggleBlockquote().run();
    },
  },
  {
    title: 'Button',
    keywords: ['button', 'cta', 'link'],
    command: (editor, range) => {
      editor
        .chain()
        .focus()
        .deleteRange(range)
        .insertContent({
          type: 'buttonBlock',
          attrs: {
            label: 'Button',
            href: '',
          },
        })
        .run();
    },
  },
];
