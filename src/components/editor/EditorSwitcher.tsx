import { NavLink, useLocation } from 'react-router-dom';

const getLinkClassName = ({ isActive }: { isActive: boolean }) =>
  [
    'rounded-md px-3 py-1.5 text-sm transition-colors',
    isActive
      ? 'bg-neutral-900 text-white'
      : 'text-neutral-500 hover:bg-neutral-100 hover:text-neutral-900',
  ].join(' ');

export const EditorSwitcher = () => {
  const { pathname } = useLocation();

  const currentPath = pathname.replace(/^\/(tiptap|lexical)/, '');

  const getEditorPath = (editor: 'tiptap' | 'lexical') => `/${editor}${currentPath || '/pages'}`;

  return (
    <nav className="flex items-center gap-1 rounded-lg bg-neutral-100 p-1">
      <NavLink to={getEditorPath('tiptap')} className={getLinkClassName}>
        Tiptap
      </NavLink>

      <NavLink to={getEditorPath('lexical')} className={getLinkClassName}>
        Lexical
      </NavLink>
    </nav>
  );
};
