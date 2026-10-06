import { defineExtension, safeCast } from 'lexical';

import { pageRepository, type EditorContent } from '@/entities/page';

type LexicalPersistenceConfig = {
  pageId: string;
};

export const LexicalPersistenceExtension = defineExtension({
  name: 'NotionLexicalPersistence',

  config: safeCast<LexicalPersistenceConfig>({
    pageId: '',
  }),

  register(editor, { pageId }) {
    let saveTimeout: ReturnType<typeof setTimeout> | null = null;
    let pendingContent: EditorContent<'lexical'> = null;
    let isInitialUpdate = true;

    const unregister = editor.registerUpdateListener(
      ({ editorState, dirtyElements, dirtyLeaves }) => {
        // Первый update — инициализация editor state.
        // Его обратно в storage писать не надо.
        if (isInitialUpdate) {
          isInitialUpdate = false;
          return;
        }

        // Не сохраняем обычное движение selection/cursor.
        if (dirtyElements.size === 0 && dirtyLeaves.size === 0) {
          return;
        }

        const nextContent = editorState.toJSON();

        pendingContent = nextContent;

        if (saveTimeout) {
          clearTimeout(saveTimeout);
        }

        saveTimeout = setTimeout(() => {
          pageRepository.updateEditorContent(pageId, 'lexical', nextContent);

          pendingContent = null;
          saveTimeout = null;
        }, 400);
      },
    );

    return () => {
      unregister();

      if (saveTimeout) {
        clearTimeout(saveTimeout);
      }

      if (pendingContent) {
        pageRepository.updateEditorContent(pageId, 'lexical', pendingContent);
      }
    };
  },
});
