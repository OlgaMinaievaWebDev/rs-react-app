export const createPageUrl = (page: number, searchValue: string) => {
  const params = new URLSearchParams({
    page: String(page),
  });
  const trimmedSearch = searchValue.trim();

  if (trimmedSearch) {
    params.set('search', trimmedSearch);
  }

  return `/?${params.toString()}`;
};
