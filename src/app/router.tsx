import { createBrowserRouter, Navigate } from 'react-router-dom';
import { MainPage } from '@/pages/MainPage';
import { TiptapPage } from '@/pages/TiptapPage';
import { LexicalPage } from '@/pages/LexicalPage';
import { TiptapViewPage } from '@/pages/TiptapViewPage';

import { AppLayout } from '@/layouts/AppLayout';

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
        element: <MainPage editorType="tiptap" />,
      },
      {
        path: 'tiptap/pages/:id',
        element: <TiptapViewPage />,
      },
      {
        path: 'tiptap/pages/:id/edit',
        element: <TiptapPage />,
      },
      {
        path: 'lexical/pages',
        element: <MainPage editorType="lexical" />,
      },
      {
        path: 'lexical/pages/:id',
        element: <LexicalPage />,
      },
      {
        path: 'lexical/pages/:id/edit',
        element: <LexicalPage />,
      },
    ],
  },
]);
