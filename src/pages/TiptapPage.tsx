import { Navigate, useParams } from 'react-router-dom';

import { pageRepository } from '@/entities/page';

export const TiptapPage = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/tiptap/pages" replace />;
  }

  const page = pageRepository.getPage(id);

  if (!page) {
    return <Navigate to="/tiptap/pages" replace />;
  }

  return (
    <div>
      <h1 className="text-3xl font-semibold">{page.title}</h1>

      <div className="mt-6 text-sm text-neutral-500">Tiptap editor will be here</div>
    </div>
  );
};
