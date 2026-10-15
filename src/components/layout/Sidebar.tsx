import { FileText, Plus } from 'lucide-react';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

import { pageRepository, usePages, type EditorType } from '@/entities/page';

export const Sidebar = () => {
  const pages = usePages();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  const handleCreatePage = () => {
    const page = pageRepository.createPage();

    navigate(`/${editorType}/pages/${page.id}/edit`);
  };

  const editorType: EditorType = pathname.startsWith('/lexical') ? 'lexical' : 'tiptap';

  return (
    <aside className="w-60 shrink-0 border-r border-neutral-200 bg-neutral-50">
      <div className="px-4 py-3">
        <span className="text-sm font-semibold">Notion Editor PoC</span>
      </div>

      <nav className="space-y-3 px-2">
        <div className="flex items-center justify-between px-3 py-2">
          <NavLink
            to={`/${editorType}/pages`}
            className="text-xs font-semibold uppercase tracking-wide text-neutral-500 hover:text-neutral-900"
          >
            Страницы
          </NavLink>

          <button
            type="button"
            onClick={handleCreatePage}
            title="Создать страницу"
            aria-label="Создать страницу"
            className="rounded p-1 text-neutral-500 hover:bg-neutral-200 hover:text-neutral-900"
          >
            <Plus size={16} />
          </button>
        </div>

        <div className="space-y-0.5">
          {pages.map((page) => (
            <NavLink
              key={page.id}
              to={`/${editorType}/pages/${page.id}/edit`}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 rounded-md px-3 py-1.5 text-sm transition-colors',
                  isActive
                    ? 'bg-neutral-200 font-medium text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-200/60',
                ].join(' ')
              }
            >
              <FileText size={16} className="shrink-0" />

              <span className="truncate">{page.title}</span>
            </NavLink>
          ))}
        </div>

        <button
          type="button"
          onClick={handleCreatePage}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-500 hover:bg-neutral-200/60 hover:text-neutral-900"
        >
          <Plus size={16} />
          Новая страница
        </button>
      </nav>
    </aside>
  );
};
