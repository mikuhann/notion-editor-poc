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
import { lexicalTheme } from './lexicalTheme';

type LexicalEditorProps = {
  pageId: string;
  content: StoredEditorContent<'lexical'>;
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
