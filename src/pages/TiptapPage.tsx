import { Navigate, useParams } from 'react-router-dom';

import { pageRepository } from '@/entities/page';
import { PageTitle } from '@/components/page/PageTitle';
import { TiptapEditor } from '@/components/editor/tiptap/TiptapEditor';

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
      <PageTitle key={`title-${page.id}`} page={page} />

      <TiptapEditor key={`editor-${page.id}`} pageId={page.id} content={page.content.tiptap} />
    </div>
  );
};
