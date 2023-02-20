import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'src/lib/axios';
import { MovieAPIData } from 'src/models';

type SearchContextValues = {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  searchPageOpen: boolean;
  setSearchPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  filterPageOpen: boolean;
  setFilterPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
  searchResult: MovieAPIData[];
  setSearchResult: React.Dispatch<React.SetStateAction<MovieAPIData[]>>;
  searchLoading: boolean;
  setSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
  filtredSearchResult: MovieAPIData[];
  setFiltredSearchResult: React.Dispatch<React.SetStateAction<MovieAPIData[]>>;
  openSearchPage: () => void;
  clearSearchPage: () => void;
  selectedGenreId: number;
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
  releaseYear: string;
  setReleaseYear: React.Dispatch<React.SetStateAction<string>>;
  clearFilter: () => void;
  applyFilter: () => Promise<void>;
};

const SearchContext = createContext<SearchContextValues>({
  searchQuery: '',
  setSearchQuery: () => undefined,
  searchPageOpen: false,
  setSearchPageOpen: () => undefined,
  filterPageOpen: false,
  setFilterPageOpen: () => undefined,
  searchResult: [],
  setSearchResult: () => undefined,
  searchLoading: false,
  setSearchLoading: () => undefined,
  filtredSearchResult: [],
  setFiltredSearchResult: () => undefined,
  openSearchPage: () => undefined,
  clearSearchPage: () => undefined,
  selectedGenreId: 0,
  setSelectedGenreId: () => undefined,
  releaseYear: '',
  setReleaseYear: () => undefined,
  clearFilter: () => undefined,
  applyFilter: async () => undefined,
});

type SearchProviderProps = {
  children: React.ReactNode;
};

export function useSearchContext() {
  return useContext(SearchContext);
}

function SearchProvider({ children }: SearchProviderProps) {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchPageOpen, setSearchPageOpen] = useState<boolean>(false);
  const [filterPageOpen, setFilterPageOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<MovieAPIData[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);
  const [filtredSearchResult, setFiltredSearchResult] = useState<
    MovieAPIData[]
  >([]);
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);
  const [releaseYear, setReleaseYear] = useState<string>('');

  const { state } = useLocation();

  const openSearchPage = useCallback(() => setSearchPageOpen(true), []);

  const clearSearchPage = useCallback(() => {
    setSearchQuery('');
    setSearchPageOpen(false);
    setFilterPageOpen(false);
    setSearchResult([]);
    setFiltredSearchResult([]);
    setSelectedGenreId(0);
    setReleaseYear('');
  }, []);

  const clearFilter = useCallback(() => {
    setFilterPageOpen(false);
    setSelectedGenreId(0);
    setFiltredSearchResult(searchResult);
    setReleaseYear('');
  }, [searchResult, setFilterPageOpen, setSelectedGenreId]);

  const applyFilter = useCallback(async () => {
    if (selectedGenreId && !releaseYear) {
      setFiltredSearchResult(() => {
        return searchResult.filter((movie) =>
          movie.genre_ids.includes(selectedGenreId)
        );
      });
    } else {
      try {
        const url = `/search/movie?api_key=${
          import.meta.env.VITE_API_KEY
        }&query=${searchQuery}&primary_release_year=${releaseYear}`;

        setSearchLoading(true);
        const { data } = await axios.get(url);
        setFiltredSearchResult(
          selectedGenreId
            ? data?.results?.filter((movie: MovieAPIData) =>
                movie.genre_ids.includes(selectedGenreId)
              )
            : data?.results
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    }
    setSearchLoading(false);
    setFilterPageOpen(false);
  }, [
    releaseYear,
    searchQuery,
    searchResult,
    selectedGenreId,
    setFilterPageOpen,
    setFiltredSearchResult,
    setSearchLoading,
  ]);

  useEffect(() => {
    (async () => {
      if (!searchQuery) return;
      const url = `/search/movie?api_key=${
        import.meta.env.VITE_API_KEY
      }&query=${searchQuery}`;
      try {
        setSearchLoading(true);
        const { data } = await axios.get(url);
        setSearchResult(data.results);
        setFiltredSearchResult(data.results);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setSearchLoading(false);
      }
    })();
  }, [searchQuery]);

  useEffect(() => {
    clearSearchPage();
  }, [clearSearchPage, state]);

  const contextValues: SearchContextValues = useMemo(
    () => ({
      searchQuery,
      setSearchQuery,
      searchPageOpen,
      setSearchPageOpen,
      filterPageOpen,
      setFilterPageOpen,
      searchResult,
      setSearchResult,
      searchLoading,
      openSearchPage,
      setSearchLoading,
      filtredSearchResult,
      setFiltredSearchResult,
      clearSearchPage,
      selectedGenreId,
      setSelectedGenreId,
      releaseYear,
      setReleaseYear,
      clearFilter,
      applyFilter,
    }),
    [
      searchQuery,
      searchPageOpen,
      filterPageOpen,
      searchResult,
      searchLoading,
      openSearchPage,
      filtredSearchResult,
      clearSearchPage,
      selectedGenreId,
      releaseYear,
      clearFilter,
      applyFilter,
    ]
  );
  return (
    <SearchContext.Provider value={contextValues}>
      {children}
    </SearchContext.Provider>
  );
}

export default SearchProvider;
