import { AnimatePresence } from 'framer-motion';
import { useCallback, useState } from 'react';
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

  const {
    searchQuery,
    setSearchQuery,
    clearSearchPage,
    openSearchPage,
    closeSearchPage,
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
      if (!value) {
        closeSearchPage();
      } else {
        setSearchText(e.target.value);
        debouncedSearch(e.target.value);
      }
    },
    [closeSearchPage, debouncedSearch]
  );

  return (
    <>
      <div className="flex justify-between items-center gap-4 relative w-full max-w-xs">
        <input
          type="text"
          value={searchText}
          onChange={onChangeText}
          onFocus={openSearchPage}
          onBlur={closeSearchPage}
          placeholder="SEARCH CRIM-SCAPE"
          className="bg-transparent border-none outline-none uppercase text-white text-sm w-full font-sans placeholder:text-white"
        />
        {searchQuery ? (
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
        {(searchQuery || searchPageOpen) && <SearchPage key="search" />}
        {searchQuery && filterPageOpen && <FilterPage key="filter" />}
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
          <SearchProvider>
            <SearchBar />
          </SearchProvider>
        </div>
      </Container>
    </header>
  );
}

export default NavBar;
