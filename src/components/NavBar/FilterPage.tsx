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
    <section>
      <h3>GENRE</h3>
      {error && <p>Error loading Genres</p>}
      <div className="flex flex-wrap gap-4">
        {data?.genres?.map(({ id, name }) => (
          <button
            key={id}
            type="button"
            onClick={onSelectGenre(id)}
            className={`${
              selectedGenreId === id
                ? 'bg-white text-black'
                : 'text-white bg-transparent '
            } border-2 border-white shadow-md rounded-full py-1.5 px-6 text-xs font-medium capitalize tracking-wide`}
          >
            {name}
          </button>
        ))}
      </div>
      {data?.genres?.length === 0 && <p>No genres found</p>}
    </section>
  );
}

function ReleaseYear() {
  const { releaseYear, setReleaseYear } = useSearchContext();
  return (
    <section>
      <h3>Release Year</h3>
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
      className="bg-[#24224e]/60 backdrop-blur-sm fixed inset-0 w-full h-full pt-[20vh] pb-[10vh] -z-10 text-white overflow-y-scroll"
    >
      <Container className="h-full">
        <div className="flex flex-col gap-12 justify-between items-center h-full">
          <h2 className="text-5xl">Filter Results</h2>
          <section className="flex flex-col gap-12">
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
              className="text-white bg-transparent border-2 border-white shadow-md rounded-full py-3 px-8 font-medium capitalize tracking-wide"
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
