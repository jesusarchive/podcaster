import { useEffect } from 'react';

/**
 * Use document title custom hook
 *
 * Sets document title on page load.
 */
export function useDocumentTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, [title]);
}
