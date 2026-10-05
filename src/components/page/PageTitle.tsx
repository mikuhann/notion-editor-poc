import { useState } from 'react';

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
      className="w-full bg-transparent text-3xl font-semibold outline-none"
      placeholder="Untitled"
    />
  );
};
