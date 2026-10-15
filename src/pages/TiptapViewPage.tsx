import { Link, Navigate, useParams } from 'react-router-dom';
import { Pencil, FileText } from 'lucide-react';

import { TiptapRenderer } from '@/components/editor/tiptap/TiptapRenderer';
import { pageRepository } from '@/entities/page';

export const TiptapViewPage = () => {
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
      <div className="mb-8 flex items-start justify-between gap-4">
        <div className="min-w-0 space-y-3">
          <FileText size={40} strokeWidth={1.5} className="text-neutral-400" />

          <h1 className="wrap-break-word text-4xl font-bold leading-tight">{page.title}</h1>
        </div>

        <Link
          to={`/tiptap/pages/${page.id}/edit`}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-neutral-900 px-3 py-2 text-sm text-white hover:bg-neutral-800"
        >
          <Pencil size={16} />
          Редактировать
        </Link>
      </div>

      <TiptapRenderer key={`renderer-${page.id}`} content={page.content.tiptap} />
    </div>
  );
};
