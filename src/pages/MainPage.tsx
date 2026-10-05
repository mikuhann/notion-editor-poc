import { Link } from 'react-router-dom';
import { Trash2 } from 'lucide-react';

import { pageRepository, usePages, type EditorType } from '@/entities/page';
import { Button } from '@/components/ui';

type MainPageProps = {
  editorType: EditorType;
};

export const MainPage = ({ editorType }: MainPageProps) => {
  const pages = usePages();

  const handleCreatePage = () => {
    pageRepository.createPage();
  };

  const handleDeletePage = (id: string) => {
    pageRepository.deletePage(id);
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
            <div
              key={page.id}
              className="flex items-center rounded-lg border border-neutral-200 transition-colors hover:bg-neutral-50"
            >
              <Link to={`/${editorType}/pages/${page.id}`} className="min-w-0 flex-1 px-4 py-3">
                <div className="font-medium">{page.title}</div>

                <div className="mt-1 text-xs text-neutral-500">
                  Updated {new Date(page.updatedAt).toLocaleString()}
                </div>
              </Link>

              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleDeletePage(page.id)}
                aria-label={`Delete ${page.title}`}
                className="mr-2"
              >
                <Trash2 size={16} />
              </Button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
