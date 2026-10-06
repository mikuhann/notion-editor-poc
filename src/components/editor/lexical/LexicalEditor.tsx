import { $createParagraphNode, $getRoot } from 'lexical';
import { defineExtension } from '@lexical/extension';
import { HistoryExtension } from '@lexical/history';
import { RichTextExtension } from '@lexical/rich-text';
import { LexicalExtensionComposer } from '@lexical/react/LexicalExtensionComposer';
import { ContentEditable } from '@lexical/react/LexicalContentEditable';

const lexicalExtension = defineExtension({
  name: 'NotionLexicalEditor',
  namespace: 'NotionLexicalEditor',

  dependencies: [RichTextExtension, HistoryExtension],

  $initialEditorState() {
    const root = $getRoot();

    if (root.isEmpty()) {
      root.append($createParagraphNode());
    }
  },
});

export const LexicalEditor = () => {
  return (
    <div className="mt-6 rounded-lg border border-neutral-200">
      <LexicalExtensionComposer
        extension={lexicalExtension}
        contentEditable={<ContentEditable className="min-h-64 p-4 outline-none" />}
      />
    </div>
  );
};
