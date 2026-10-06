import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import type { EditorContent as StoredEditorContent } from '@/entities/page';

import { ButtonBlock } from './extensions/ButtonBlock';
import { ImageBlock } from './extensions/ImageBlock';

type TiptapRendererProps = {
  content: StoredEditorContent<'tiptap'>;
};

export const TiptapRenderer = ({ content }: TiptapRendererProps) => {
  const editor = useEditor({
    extensions: [StarterKit, ButtonBlock, ImageBlock],

    content: content ?? {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    },

    editable: false,

    editorProps: {
      attributes: {
        class: 'tiptap outline-none',
      },
    },
  });

  return <EditorContent editor={editor} />;
};
