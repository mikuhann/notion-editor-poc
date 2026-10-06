import { useMemo } from 'react';
import { defineExtension } from 'lexical';
import { LinkExtension } from '@lexical/link';
import { ListExtension } from '@lexical/list';
import { RichTextExtension } from '@lexical/rich-text';
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

import type { EditorContent as StoredEditorContent } from '@/entities/page';

import { lexicalTheme } from './lexicalTheme';
import { ButtonBlockNode } from './nodes/ButtonBlockNode';
import { ImageBlockNode } from './nodes/ImageBlockNode';

type LexicalRendererProps = {
  content: StoredEditorContent<'lexical'>;
};

export const LexicalRenderer = ({ content }: LexicalRendererProps) => {
  const lexicalExtension = useMemo(
    () =>
      defineExtension({
        name: 'NotionLexicalRenderer',
        namespace: 'NotionLexicalRenderer',
        theme: lexicalTheme,
        editable: false,

        nodes: () => [ButtonBlockNode, ImageBlockNode],

        dependencies: [RichTextExtension, LinkExtension, ListExtension],

        $initialEditorState: content ? JSON.stringify(content) : undefined,
      }),
    [content],
  );

  return (
    <LexicalExtensionComposer extension={lexicalExtension} contentEditable={null}>
      <ContentEditable className="outline-none" />
    </LexicalExtensionComposer>
  );
};
