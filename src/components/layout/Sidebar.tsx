import { NavLink } from 'react-router-dom';

export const Sidebar = () => {
  return (
    <aside className="w-60 shrink-0 border-r border-neutral-200 bg-neutral-50">
      <div className="px-4 py-3">
        <span className="text-sm font-semibold">Notion Editor PoC</span>
      </div>

      <nav className="px-2">
        <NavLink
          to="/tiptap/pages"
          className={({ isActive }) =>
            [
              'block rounded-md px-3 py-2 text-sm',
              isActive
                ? 'bg-neutral-200 text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-100',
            ].join(' ')
          }
        >
          Tiptap
        </NavLink>

        <NavLink
          to="/lexical/pages"
          className={({ isActive }) =>
            [
              'block rounded-md px-3 py-2 text-sm',
              isActive
                ? 'bg-neutral-200 text-neutral-900'
                : 'text-neutral-600 hover:bg-neutral-100',
            ].join(' ')
          }
        >
          Lexical
        </NavLink>
      </nav>
    </aside>
  );
};
