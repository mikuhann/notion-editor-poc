export type EditorType = 'tiptap' | 'lexical';

export type EditorContent = Record<string, unknown> | null;

export interface Page {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  content: Record<EditorType, EditorContent>;
}
