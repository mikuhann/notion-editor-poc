import { Outlet } from 'react-router-dom';

import { Header } from '@/components/layout/Header';
import { Sidebar } from '@/components/layout/Sidebar';

export const AppLayout = () => {
  return (
    <div className="flex min-h-screen bg-white text-neutral-900">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Header />

        <main className="flex-1">
          <div className="mx-auto w-full max-w-5xl px-8 py-8">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};
