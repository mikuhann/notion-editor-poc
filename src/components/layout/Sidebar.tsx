import { FileText } from 'lucide-react';
import { NavLink, useLocation } from 'react-router-dom';

import { usePages, type EditorType } from '@/entities/page';

export const Sidebar = () => {
  const pages = usePages();
  const { pathname } = useLocation();

  const editorType: EditorType = pathname.startsWith('/lexical') ? 'lexical' : 'tiptap';

  return (
    <aside className="w-60 shrink-0 border-r border-neutral-200 bg-neutral-50">
      <div className="px-4 py-3">
        <span className="text-sm font-semibold">Notion Editor PoC</span>
      </div>

      <nav className="px-2">
        <NavLink
          to={`/${editorType}/pages`}
          className="block rounded-md px-3 py-2 text-sm text-neutral-600 hover:bg-neutral-100"
        >
          Pages
        </NavLink>

        <div className="mt-3 space-y-1">
          {pages.map((page) => (
            <NavLink
              key={page.id}
              to={`/${editorType}/pages/${page.id}`}
              className={({ isActive }) =>
                [
                  'flex items-center gap-2 rounded-md px-3 py-2 text-sm',
                  isActive
                    ? 'bg-neutral-200 text-neutral-900'
                    : 'text-neutral-600 hover:bg-neutral-100',
                ].join(' ')
              }
            >
              <FileText size={14} />

              <span className="truncate">{page.title}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </aside>
  );
};
