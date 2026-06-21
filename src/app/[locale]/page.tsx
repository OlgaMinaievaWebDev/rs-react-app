import { Suspense } from 'react';
import { Home } from '../../views/Home';
import { fetchCharacters } from '../../api/characters';

type PageProps = {
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};
export default async function Page({ searchParams }: PageProps) {
  const params = await searchParams;
  const parsedPage = Number(params.page);
  const currentPage = parsedPage > 0 ? parsedPage : 1;
  const searchTerm = params.search?.trim() ?? '';
  const initialData = await fetchCharacters(searchTerm, currentPage);

  return (
    <Suspense>
      <Home
        initialData={initialData}
        currentPage={currentPage}
        searchTerm={searchTerm}
      />
    </Suspense>
  );
}
