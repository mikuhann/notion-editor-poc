import { useEffect, useState } from 'react';

import { pageRepository } from './pageRepository';
import type { Page } from '../model/types';

export const usePages = () => {
  const [pages, setPages] = useState<Page[]>(() => pageRepository.getPages());

  useEffect(() => {
    return pageRepository.subscribe(() => {
      setPages(pageRepository.getPages());
    });
  }, []);

  return pages;
};
