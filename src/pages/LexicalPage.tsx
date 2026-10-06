import { Navigate, useParams } from 'react-router-dom';

import { pageRepository } from '@/entities/page';
import { PageTitle } from '@/components/page/PageTitle';
import { LexicalEditor } from '@/components/editor/lexical/LexicalEditor';

export const LexicalPage = () => {
  const { id } = useParams();

  if (!id) {
    return <Navigate to="/lexical/pages" replace />;
  }

  const page = pageRepository.getPage(id);

  if (!page) {
    return <Navigate to="/lexical/pages" replace />;
  }

  return (
    <div>
      <PageTitle key={`title-${page.id}`} page={page} />

      <LexicalEditor key={`editor-${page.id}`} pageId={page.id} content={page.content.lexical} />
    </div>
  );
};
