import { useMemo } from 'react';
import { defineExtension, configExtension } from 'lexical';
import { HistoryExtension } from '@lexical/history';
import { RichTextExtension } from '@lexical/rich-text';
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

import type { EditorContent as StoredEditorContent } from '@/entities/page';
import { LexicalPersistenceExtension } from './extensions/LexicalPersistenceExtension';

type LexicalEditorProps = {
  pageId: string;
  content: StoredEditorContent<'lexical'>;
};

export const LexicalEditor = ({ pageId, content }: LexicalEditorProps) => {
  const lexicalExtension = useMemo(
    () =>
      defineExtension({
        name: 'NotionLexicalEditor',
        namespace: `NotionLexicalEditor:${pageId}`,

        dependencies: [
          RichTextExtension,
          HistoryExtension,
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
      <LexicalExtensionComposer
        extension={lexicalExtension}
        contentEditable={<ContentEditable className="min-h-64 p-4 outline-none" />}
      />
    </div>
  );
};
