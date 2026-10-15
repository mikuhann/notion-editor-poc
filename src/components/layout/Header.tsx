import { ChevronRight, FileText } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

import { usePages } from '@/entities/page';

export const Header = () => {
  const { pathname } = useLocation();
  const pages = usePages();

  const editorType = pathname.startsWith('/lexical') ? 'lexical' : 'tiptap';

  const pageId = pathname.split('/')[3];
  const currentPage = pages.find((page) => page.id === pageId);

  return (
    <header className="flex h-12 items-center gap-2 border-b border-neutral-200 px-6 text-sm">
      <Link to={`/${editorType}/pages`} className="text-neutral-500 hover:text-neutral-900">
        Страницы
      </Link>

      {currentPage && (
        <>
          <ChevronRight size={14} className="text-neutral-400" />

          <FileText size={16} className="text-neutral-500" />

          <span className="max-w-64 truncate font-medium">{currentPage.title}</span>
        </>
      )}
    </header>
  );
};
