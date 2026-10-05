import { useState } from 'react';
import { Link } from 'react-router-dom';

import { pageRepository, type EditorType, type Page } from '@/entities/page';
import { Button } from '@/components/ui';

type MainPageProps = {
  editorType: EditorType;
};

export const MainPage = ({ editorType }: MainPageProps) => {
  const [pages, setPages] = useState<Page[]>(() => pageRepository.getPages());

  const handleCreatePage = () => {
    pageRepository.createPage();
    setPages(pageRepository.getPages());
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Pages</h1>
          <p className="text-sm text-neutral-500">
            {editorType === 'tiptap' ? 'Tiptap' : 'Lexical'}
          </p>
        </div>

        <Button onClick={handleCreatePage}>New page</Button>
      </div>

      {pages.length === 0 ? (
        <div className="rounded-lg border border-dashed border-neutral-300 p-8 text-center">
          <p className="text-sm text-neutral-500">No pages yet</p>
        </div>
      ) : (
        <div className="space-y-2">
          {pages.map((page) => (
            <Link
              key={page.id}
              to={`/${editorType}/pages/${page.id}`}
              className="block rounded-lg border border-neutral-200 px-4 py-3 transition-colors hover:bg-neutral-50"
            >
              <div className="font-medium">{page.title}</div>

              <div className="mt-1 text-xs text-neutral-500">
                Updated {new Date(page.updatedAt).toLocaleString()}
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};
