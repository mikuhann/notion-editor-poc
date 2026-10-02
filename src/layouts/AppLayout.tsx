import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <header className="border-b border-neutral-200 px-6 py-4">
        <span className="font-semibold">Notion Editor PoC</span>
      </header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
