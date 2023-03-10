import { AnimatePresence } from 'framer-motion';
import { useCallback, useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import SearchProvider, { useSearchContext } from 'src/contexts/searchContext';
import { useDebouncedCallback } from 'use-debounce';
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
  const [searchText, setSearchText] = useState<string>('');

  const { state } = useLocation();

  const {
    setSearchQuery,
    clearSearchPage,
    openSearchPage,
    searchPageOpen,
    filterPageOpen,
  } = useSearchContext();

  const debouncedSearch = useDebouncedCallback(
    (text) => setSearchQuery(text),
    1500
  );

  const clearSearchTextAndQuery = useCallback(() => {
    setSearchText('');
    clearSearchPage();
  }, [clearSearchPage]);

  const onChangeText = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setSearchText(value);
      if (!value) {
        clearSearchPage();
      } else {
        debouncedSearch(value);
      }
    },
    [clearSearchPage, debouncedSearch]
  );

  const onBlur = useCallback(
    () => !searchText && clearSearchPage(),
    [searchText, clearSearchPage]
  );

  // remove searchText when location state changes(user clicked a movie in search page)
  // so search page goes away
  useEffect(() => setSearchText(''), [state]);

  return (
    <>
      <div className="flex justify-between items-center gap-4 relative w-full max-w-xs">
        <input
          type="text"
          onBlur={onBlur}
          value={searchText}
          onChange={onChangeText}
          onFocus={openSearchPage}
          placeholder="SEARCH CRIM-SCAPE"
          className="bg-transparent border-none outline-none uppercase text-white text-sm w-full font-sans placeholder:text-white"
        />
        {searchText ? (
          <button
            type="button"
            onClick={clearSearchTextAndQuery}
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
        {(searchText || searchPageOpen) && <SearchPage key="search" />}
        {searchText && filterPageOpen && <FilterPage key="filter" />}
      </AnimatePresence>
    </>
  );
}

function NavBar(): JSX.Element {
  const [navBarScrolled, setNavBarScrolled] = useState(window.scrollY > 50);

  useEffect(() => {
    function toggleScrolled() {
      setNavBarScrolled(window.scrollY > 50);
    }

    window.addEventListener('scroll', toggleScrolled);

    return () => {
      setNavBarScrolled(false);
      window.removeEventListener('scroll', toggleScrolled);
    };
  }, []);

  const headerClassNames = `${
    navBarScrolled
      ? 'bg-white/20 backdrop-blur-sm'
      : 'bg-transparent backdrop-blur-none'
  } fixed top-0 left-0 w-full z-20 pt-5 pb-2 border-b border-gray-100/30 isolate`;

  return (
    <header className={headerClassNames}>
      <Container>
        <div className="flex justify-between items-center gap-10">
          <Logo />
          <SearchProvider>
            <SearchBar />
          </SearchProvider>
        </div>
      </Container>
    </header>
  );
}

export default NavBar;
