import { Link, Navigate, useParams } from 'react-router-dom';

import { LexicalRenderer } from '@/components/editor/lexical/LexicalRenderer';
import { pageRepository } from '@/entities/page';

export const LexicalViewPage = () => {
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
      <div className="mb-8 flex items-start justify-between gap-4">
        <h1 className="text-4xl font-bold">{page.title}</h1>

        <Link
          to={`/lexical/pages/${page.id}/edit`}
          className="rounded-md bg-neutral-900 px-4 py-2 text-sm text-white"
        >
          Edit
        </Link>
      </div>

      <LexicalRenderer key={`renderer-${page.id}`} content={page.content.lexical} />
    </div>
  );
};
