import { Navigate, useParams } from 'react-router-dom';

import { pageRepository } from '@/entities/page';
import { PageTitle } from '@/components/page/PageTitle';

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
      <PageTitle key={page.id} page={page} />

      <div className="mt-6 text-sm text-neutral-500">Lexical editor will be here</div>
    </div>
  );
};
