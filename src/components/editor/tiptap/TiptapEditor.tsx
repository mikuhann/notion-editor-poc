import { useEffect, useRef } from 'react';
import { EditorContent, useEditor } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';

import { pageRepository, type EditorContent as StoredEditorContent } from '@/entities/page';
import { TiptapToolbar } from './TiptapToolbar';
import { SlashCommand } from './slash/SlashCommand';
import { ButtonBlock } from './extensions/ButtonBlock';
import { ImageBlock } from './extensions/ImageBlock';

type TiptapEditorProps = {
  pageId: string;
  content: StoredEditorContent;
};

export const TiptapEditor = ({ pageId, content }: TiptapEditorProps) => {
  const saveTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pendingContentRef = useRef<StoredEditorContent>(null);
  const editor = useEditor({
    extensions: [StarterKit, SlashCommand, ButtonBlock, ImageBlock],

    content: content ?? {
      type: 'doc',
      content: [
        {
          type: 'paragraph',
        },
      ],
    },

    editorProps: {
      attributes: {
        class: 'tiptap min-h-64 p-4 outline-none',
      },
    },

    onUpdate: ({ editor }) => {
      const nextContent = editor.getJSON();

      pendingContentRef.current = nextContent;

      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      saveTimeoutRef.current = setTimeout(() => {
        pageRepository.updateEditorContent(pageId, 'tiptap', nextContent);

        pendingContentRef.current = null;
        saveTimeoutRef.current = null;
      }, 400);
    },
  });

  useEffect(() => {
    return () => {
      if (saveTimeoutRef.current) {
        clearTimeout(saveTimeoutRef.current);
      }

      if (pendingContentRef.current) {
        pageRepository.updateEditorContent(pageId, 'tiptap', pendingContentRef.current);
      }
    };
  }, [pageId]);

  return (
    <div className="mt-6 rounded-lg border border-neutral-200">
      {editor && <TiptapToolbar editor={editor} />}

      <EditorContent editor={editor} />
    </div>
  );
};
