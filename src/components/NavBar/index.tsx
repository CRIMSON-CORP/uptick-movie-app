import { AnimatePresence } from 'framer-motion';
import { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'src/lib/axios';
import { MovieAPIData } from 'src/models';
import Container from '../Container';
import CloseIcon from '../icons/CloseIcon';
import SearchIcon from '../icons/SearchIcon';
import FilterPage from './FilterPage';
import SearchPage from './SearchPage';

function Logo(): JSX.Element {
  return (
    <span className="uppercase font-medium text-white whitespace-nowrap">
      crim-scape
    </span>
  );
}

function SearchBar(): JSX.Element {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchPageOpen, setSearchPageOpen] = useState<boolean>(false);
  const [filterPageOpen, setFilterPageOpen] = useState(false);
  const [searchResult, setSearchResult] = useState<MovieAPIData[]>([]);
  const [searchLoading, setSearchLoading] = useState<boolean>(false);

  const { pathname } = useLocation();

  const onSearchTextChange = useCallback(
    async (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchQuery(e.target.value);
      try {
        setSearchLoading(true);
        const { data } = await axios.get(
          `/search/movie?api_key=${import.meta.env.VITE_API_KEY}&query=${
            e.target.value
          }`
        );
        setSearchResult(data.results);
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setSearchLoading(false);
      }
    },
    []
  );

  const openSearchPage = useCallback(() => setSearchPageOpen(true), []);
  const closeSearchPage = useCallback(
    () => setSearchPageOpen(!!searchQuery),
    [searchQuery]
  );
  const closeSearch = useCallback(() => {
    setSearchQuery('');
    setSearchPageOpen(false);
  }, []);

  useEffect(() => {
    setFilterPageOpen(false);
    setSearchPageOpen(false);
  }, [pathname]);

  return (
    <>
      <div className="flex justify-between items-center gap-4 relative w-full max-w-xs">
        <input
          type="text"
          value={searchQuery}
          onFocus={openSearchPage}
          onBlur={closeSearchPage}
          onChange={onSearchTextChange}
          placeholder="SEARCH CRIM-SCAPE"
          className="bg-transparent border-none outline-none uppercase text-white text-sm w-full font-sans placeholder:text-white"
        />
        {searchQuery ? (
          <button
            type="button"
            onClick={closeSearch}
            className="bg-transparent border-none outline-none cursor-pointer"
          >
            <CloseIcon size={20} color="white" />
          </button>
        ) : (
          <SearchIcon color="white" size={20} />
        )}
        <span className="absolute bg-white w-full h-0.5 -bottom-3" />
      </div>
      <AnimatePresence>
        {(searchQuery || searchPageOpen) && (
          <SearchPage
            key="search"
            data={searchResult}
            loading={searchLoading}
            searchQuery={searchQuery}
            searchResult={searchResult}
            setFilterPageOpen={setFilterPageOpen}
          />
        )}
        {searchQuery && filterPageOpen && (
          <FilterPage
            key="filter"
            searchQuery={searchQuery}
            setSearchResult={setSearchResult}
            setSearchLoading={setSearchLoading}
            setFilterPageOpen={setFilterPageOpen}
          />
        )}
      </AnimatePresence>
    </>
  );
}

function NavBar(): JSX.Element {
  return (
    <header className="fixed top-0 left-0 w-full z-20 pt-5 pb-2 border-b border-gray-100/30 isolate">
      <Container>
        <div className="flex justify-between items-center gap-5">
          <Logo />
          <SearchBar />
        </div>
      </Container>
    </header>
  );
}

export default NavBar;
