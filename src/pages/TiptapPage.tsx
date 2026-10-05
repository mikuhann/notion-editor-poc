import { Link, Navigate, useParams } from 'react-router-dom';

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
      <div className="mb-4 flex justify-end">
        <Link
          to={`/tiptap/pages/${page.id}`}
          className="rounded-md border border-neutral-200 px-4 py-2 text-sm hover:bg-neutral-50"
        >
          View
        </Link>
      </div>

      <PageTitle key={`title-${page.id}`} page={page} />

      <TiptapEditor key={`editor-${page.id}`} pageId={page.id} content={page.content.tiptap} />
    </div>
  );
};
