import { Navigate, useParams } from 'react-router-dom';

import { pageRepository } from '@/entities/page';
import { PageTitle } from '@/components/page/PageTitle';

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
      <PageTitle page={page} />

      <div className="mt-6 text-sm text-neutral-500">Tiptap editor will be here</div>
    </div>
  );
};
