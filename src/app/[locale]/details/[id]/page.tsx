import {
  fetchCharacterById,
  fetchCharacters,
} from '../../../../api/characters';
import { Details } from '../../../../views/Details';
import { Home } from '../../../../views/Home';

type PageProps = {
  params: Promise<{ locale: string; id: string }>;
  searchParams: Promise<{
    page?: string;
    search?: string;
  }>;
};

export default async function Page({ params, searchParams }: PageProps) {
  const [{ id }, query] = await Promise.all([params, searchParams]);
  const parsedPage = Number(query.page);
  const currentPage = parsedPage > 0 ? parsedPage : 1;
  const searchTerm = query.search?.trim() ?? '';
  const [initialData, character] = await Promise.all([
    fetchCharacters(searchTerm, currentPage),
    fetchCharacterById(id),
  ]);
  const resultParams = new URLSearchParams({ page: String(currentPage) });

  if (searchTerm) {
    resultParams.set('search', searchTerm);
  }

  const queryString = resultParams.toString();

  return (
    <Home
      initialData={initialData}
      currentPage={currentPage}
      searchTerm={searchTerm}
      detailsPanel={
        <Details character={character} queryString={queryString} />
      }
    />
  );
}
