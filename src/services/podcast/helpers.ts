import { isDateOlderThanDays } from '@/utils/date';

import { LOCAL_STORAGE_CLEANUP_DAYS, LOCAL_STORAGE_CREATED_AT_KEY } from './constants';

// handle local storage cleanup if it was created more than a day ago
function handleLocalStorageCleanup() {
  const createdAt = localStorage.getItem(LOCAL_STORAGE_CREATED_AT_KEY);

  if (!createdAt) {
    localStorage.setItem(LOCAL_STORAGE_CREATED_AT_KEY, String(new Date()));
  } else {
    const parsedCreatedAt = new Date(createdAt);

    if (isDateOlderThanDays(parsedCreatedAt, LOCAL_STORAGE_CLEANUP_DAYS)) {
      localStorage.clear();
      localStorage.setItem(LOCAL_STORAGE_CREATED_AT_KEY, String(new Date()));
      window.location.href = '/';
    }
  }
}

// get parsed local storage data and handle cleanup
export function getLocalStorageData<T>(key: string): T | undefined {
  handleLocalStorageCleanup();
  const rawLocalStorageData = localStorage.getItem(key);

  return rawLocalStorageData && JSON.parse(rawLocalStorageData);
}
