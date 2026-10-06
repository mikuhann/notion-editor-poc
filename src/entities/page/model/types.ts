import type { JSONContent } from '@tiptap/core';
import type { SerializedEditorState } from 'lexical';

export type EditorType = 'tiptap' | 'lexical';

export type EditorContentMap = {
  tiptap: JSONContent | null;
  lexical: SerializedEditorState | null;
};

export type EditorContent<T extends EditorType = EditorType> = EditorContentMap[T];

export interface Page {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: EditorContentMap;
}
