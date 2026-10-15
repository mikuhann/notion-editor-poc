import { useState } from 'react';
import { FileText } from 'lucide-react';

import { pageRepository, type Page } from '@/entities/page';

type PageTitleProps = {
  page: Page;
};

export const PageTitle = ({ page }: PageTitleProps) => {
  const [title, setTitle] = useState(page.title);

  const saveTitle = () => {
    const nextTitle = title.trim() || 'Untitled';

    setTitle(nextTitle);

    if (nextTitle === page.title) {
      return;
    }

    pageRepository.updatePage(page.id, {
      title: nextTitle,
    });
  };

  return (
    <div className="space-y-3">
      <FileText size={40} strokeWidth={1.5} className="text-neutral-400" />

      <input
        value={title}
        onChange={(event) => setTitle(event.target.value)}
        onBlur={saveTitle}
        onKeyDown={(event) => {
          if (event.key === 'Enter') {
            event.currentTarget.blur();
          }

          if (event.key === 'Escape') {
            setTitle(page.title);
            event.currentTarget.blur();
          }
        }}
        className="w-full bg-transparent text-4xl font-bold leading-tight outline-none placeholder:text-neutral-300"
        placeholder="Untitled"
      />
    </div>
  );
};
