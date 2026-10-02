import type { EditorContent, EditorType, Page } from '@/entities/page/model/types';

const STORAGE_KEY = 'notion-editor-pages';

type PageUpdate = Partial<Pick<Page, 'title'>>;

const readPages = (): Page[] => {
  const value = localStorage.getItem(STORAGE_KEY);

  if (!value) {
    return [];
  }

  try {
    return JSON.parse(value) as Page[];
  } catch {
    return [];
  }
};

const writePages = (pages: Page[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(pages));
};

export const pageRepository = {
  getPages(): Page[] {
    return readPages();
  },

  getPage(id: string): Page | null {
    return readPages().find((page) => page.id === id) ?? null;
  },

  createPage(title = 'Untitled'): Page {
    const now = new Date().toISOString();

    const page: Page = {
      id: crypto.randomUUID(),
      title,
      createdAt: now,
      updatedAt: now,
      content: {
        tiptap: null,
        lexical: null,
      },
    };

    const pages = readPages();

    writePages([page, ...pages]);

    return page;
  },

  updatePage(id: string, patch: PageUpdate): Page | null {
    const pages = readPages();
    const index = pages.findIndex((page) => page.id === id);

    if (index === -1) {
      return null;
    }

    const updatedPage: Page = {
      ...pages[index],
      ...patch,
      updatedAt: new Date().toISOString(),
    };

    pages[index] = updatedPage;

    writePages(pages);

    return updatedPage;
  },

  updateEditorContent(id: string, editorType: EditorType, content: EditorContent): Page | null {
    const pages = readPages();
    const index = pages.findIndex((page) => page.id === id);

    if (index === -1) {
      return null;
    }

    const page = pages[index];

    const updatedPage: Page = {
      ...page,
      content: {
        ...page.content,
        [editorType]: content,
      },
      updatedAt: new Date().toISOString(),
    };

    pages[index] = updatedPage;

    writePages(pages);

    return updatedPage;
  },

  deletePage(id: string): boolean {
    const pages = readPages();
    const nextPages = pages.filter((page) => page.id !== id);

    if (nextPages.length === pages.length) {
      return false;
    }

    writePages(nextPages);

    return true;
  },
};
