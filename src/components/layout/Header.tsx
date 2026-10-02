import { EditorSwitcher } from '@/components/editor/EditorSwitcher';

export const Header = () => {
  return (
    <header className="flex h-12 items-center justify-between border-b border-neutral-200 px-4">
      <span className="text-sm text-neutral-500">Editor</span>

      <EditorSwitcher />
    </header>
  );
};
