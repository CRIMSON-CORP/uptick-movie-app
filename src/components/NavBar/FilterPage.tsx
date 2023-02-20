import { useCallback } from 'react';
import { motion } from 'framer-motion';
import useFetch from 'src/hooks/useFetch';
import { GenreAPIData } from 'src/models';
import { useSearchContext } from 'src/contexts/searchContext';
import Container from '../Container';

const fadeVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

function GenreFilterList() {
  const [data, , error] = useFetch<GenreAPIData>('genre/movie/list');

  const { selectedGenreId, setSelectedGenreId } = useSearchContext();

  const onSelectGenre = useCallback(
    (id: number) => () => {
      setSelectedGenreId(id);
    },
    [setSelectedGenreId]
  );

  return (
    <section className="flex-grow">
      <h3 className="mb-2">GENRE</h3>
      <div className="max-w-md">
        {error && <p>Error loading Genres</p>}
        <div className="grid md:grid-cols-4 grid-cols-3 gap-3">
          {data?.genres?.map(({ id, name }) => (
            <button
              key={id}
              type="button"
              onClick={onSelectGenre(id)}
              className={`${
                selectedGenreId === id
                  ? 'bg-white text-black'
                  : 'text-white bg-transparent '
              } w-full border-2 whitespace-nowrap overflow-hidden text-ellipsis border-white shadow-md rounded-full py-1.5 px-2 grid place-items-center text-xs font-medium capitalize tracking-wide`}
            >
              {name}
            </button>
          ))}
        </div>
        {data?.genres?.length === 0 && <p>No genres found</p>}
      </div>
    </section>
  );
}

function ReleaseYear() {
  const { releaseYear, setReleaseYear } = useSearchContext();
  return (
    <section className="flex-grow">
      <h3 className="mb-2">Release Year</h3>
      <input
        type="text"
        value={releaseYear}
        onChange={(e) => setReleaseYear(e.target.value)}
        className="bg-white/30 border border-white/40 w-full max-w-sm text-white px-4 py-2 outline-none"
      />
    </section>
  );
}

function FilterPage() {
  const { applyFilter, clearFilter } = useSearchContext();

  return (
    <motion.div
      exit="hidden"
      animate="show"
      initial="hidden"
      variants={fadeVariant}
      className="search-page bg-[#24224e]/60 backdrop-blur-sm fixed min-h-screen inset-0 w-full pt-[10vh] pb-[10vh] -z-10 text-white overflow-y-auto"
    >
      <Container className="h-full">
        <div className="flex flex-col md:gap-12 gap-4 h-full">
          <h2 className="text-2xl">Filter results</h2>
          <section className="flex md:flex-row flex-col gap-7">
            <GenreFilterList />
            <ReleaseYear />
          </section>
          <section className="flex flex-col items-center gap-4">
            <button
              type="button"
              onClick={applyFilter}
              className="text-black bg-white shadow-md rounded-full py-3 px-8 font-medium capitalize tracking-wide"
            >
              apply filter
            </button>
            <button
              type="button"
              onClick={clearFilter}
              className="underline py-3 px-8 font-medium capitalize tracking-wide"
            >
              clear filter
            </button>
          </section>
        </div>
      </Container>
    </motion.div>
  );
}

export default FilterPage;
