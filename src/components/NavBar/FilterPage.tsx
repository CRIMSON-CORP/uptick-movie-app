import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import useFetch from 'src/hooks/useFetch';
import { GenreAPIData, MovieAPIData } from 'src/models';
import axios from 'src/lib/axios';
import Container from '../Container';

const fadeVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

type FilterPageProps = {
  searchQuery: string;
  setSearchLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setSearchResult: React.Dispatch<React.SetStateAction<MovieAPIData[]>>;
  setFilterPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type GenreFilterListProps = {
  selectedGenreId: number;
  setSelectedGenreId: React.Dispatch<React.SetStateAction<number>>;
};

type ReleaseYearProps = {
  releaseYear: string;
  setReleaseYear: React.Dispatch<React.SetStateAction<string>>;
};

function GenreFilterList({
  selectedGenreId,
  setSelectedGenreId,
}: GenreFilterListProps) {
  const [data] = useFetch<GenreAPIData>('genre/movie/list');

  const onSelectGenre = useCallback(
    (id: number) => () => {
      setSelectedGenreId(id);
    },
    [setSelectedGenreId]
  );

  return (
    <section>
      <h3>GENRE</h3>
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
    </section>
  );
}

function ReleaseYear({ releaseYear, setReleaseYear }: ReleaseYearProps) {
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

function FilterPage({
  searchQuery,
  setFilterPageOpen,
  setSearchResult,
  setSearchLoading,
}: FilterPageProps) {
  const [selectedGenreId, setSelectedGenreId] = useState<number>(0);
  const [releaseYear, setReleaseYear] = useState<string>('');

  const applyFilter = useCallback(async () => {
    if (selectedGenreId && !releaseYear) {
      setSearchResult((prev) => {
        return prev.filter((movie) =>
          movie.genre_ids.includes(selectedGenreId)
        );
      });
    } else {
      try {
        setSearchLoading(true);
        const { data } = await axios.get(
          `/search/movie?api_key=${
            import.meta.env.VITE_API_KEY
          }&query=${searchQuery}&year=${releaseYear}`
        );
        setSearchResult(
          selectedGenreId
            ? data?.results?.filter((movie: MovieAPIData) =>
                movie.genre_ids.includes(selectedGenreId)
              )
            : data?.results
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      } finally {
        setSearchLoading(false);
        setFilterPageOpen(false);
      }
    }
  }, [
    releaseYear,
    searchQuery,
    selectedGenreId,
    setFilterPageOpen,
    setSearchLoading,
    setSearchResult,
  ]);

  const closeFilter = useCallback(() => {
    setFilterPageOpen(false);
    setSelectedGenreId(0);
  }, [setFilterPageOpen]);

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
            <GenreFilterList
              selectedGenreId={selectedGenreId}
              setSelectedGenreId={setSelectedGenreId}
            />
            <ReleaseYear
              releaseYear={releaseYear}
              setReleaseYear={setReleaseYear}
            />
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
              onClick={closeFilter}
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
