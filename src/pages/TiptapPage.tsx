import { Link, Navigate, useParams } from 'react-router-dom';
import { Eye } from 'lucide-react';

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
    <div className="mx-auto max-w-3xl pt-10">
      <div className="mb-4 flex justify-end">
        <Link
          to={`/tiptap/pages/${page.id}`}
          className="inline-flex items-center gap-2 rounded-md px-3 py-2 text-sm text-neutral-500 transition-colors hover:bg-neutral-100 hover:text-neutral-900"
        >
          <Eye size={16} />
          Предпросмотр
        </Link>
      </div>

      <PageTitle key={`title-${page.id}`} page={page} />

      <TiptapEditor key={`editor-${page.id}`} pageId={page.id} content={page.content.tiptap} />
    </div>
  );
};
