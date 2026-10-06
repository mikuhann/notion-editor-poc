import { useMemo } from 'react';
import { defineExtension, configExtension } from 'lexical';
import { HistoryExtension } from '@lexical/history';
import { RichTextExtension } from '@lexical/rich-text';
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';
import { LinkExtension } from '@lexical/link';
import { ListExtension } from '@lexical/list';

import type { EditorContent as StoredEditorContent } from '@/entities/page';
import { LexicalPersistenceExtension } from './extensions/LexicalPersistenceExtension';
import { LexicalToolbar } from './LexicalToolbar';
import { LexicalSlashMenu } from './slash/LexicalSlashMenu';
import { ButtonBlockNode } from './nodes/ButtonBlockNode';
import { ImageBlockNode } from './nodes/ImageBlockNode';

type LexicalEditorProps = {
  pageId: string;
  content: StoredEditorContent<'lexical'>;
};

const lexicalTheme = {
  heading: {
    h1: 'text-3xl font-bold leading-tight',
    h2: 'text-2xl font-semibold leading-snug',
    h3: 'text-xl font-semibold',
  },

  link: 'cursor-pointer text-blue-600 underline',

  list: {
    ul: 'list-disc pl-6',
    ol: 'list-decimal pl-6',
    listitem: 'my-1',
  },

  quote: 'border-l-4 border-neutral-300 pl-4 italic text-neutral-600',

  text: {
    bold: 'font-bold',
    italic: 'italic',
    underline: 'underline',
    strikethrough: 'line-through',
    underlineStrikethrough: '[text-decoration-line:underline_line-through]',
  },
};

export const LexicalEditor = ({ pageId, content }: LexicalEditorProps) => {
  const lexicalExtension = useMemo(
    () =>
      defineExtension({
        name: 'NotionLexicalEditor',
        namespace: 'NotionLexicalEditor',
        theme: lexicalTheme,
        nodes: () => [ButtonBlockNode, ImageBlockNode],

        dependencies: [
          RichTextExtension,
          HistoryExtension,
          LinkExtension,
          ListExtension,
          configExtension(LexicalPersistenceExtension, {
            pageId,
          }),
        ],

        $initialEditorState: content ? JSON.stringify(content) : undefined,
      }),
    [pageId, content],
  );

  return (
    <div className="relative mt-6 rounded-lg border border-neutral-200">
      <LexicalExtensionComposer extension={lexicalExtension} contentEditable={null}>
        <LexicalToolbar />
        <LexicalSlashMenu />

        <ContentEditable className="min-h-64 p-4 outline-none" />
      </LexicalExtensionComposer>
    </div>
  );
};
