import { createBrowserRouter, Navigate } from 'react-router-dom';

import { AppLayout } from '@/layouts/AppLayout';
import { LexicalPage } from '@/pages/LexicalPage';
import { TiptapPage } from '@/pages/TiptapPage';

export const router = createBrowserRouter([
  {
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: <Navigate to="/tiptap/pages" replace />,
      },
      {
        path: 'tiptap/pages',
        element: <TiptapPage />,
      },
      {
        path: 'lexical/pages',
        element: <LexicalPage />,
      },
    ],
  },
]);
