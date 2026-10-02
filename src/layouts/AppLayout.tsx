import { Outlet } from 'react-router-dom';

export const AppLayout = () => {
  return (
    <div>
      <header>Notion Editor PoC</header>

      <main>
        <Outlet />
      </main>
    </div>
  );
};
