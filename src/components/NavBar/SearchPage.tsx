import { motion } from 'framer-motion';
import { MovieAPIData } from 'src/models';
import Container from '../Container';
import MovieCard from '../MovieCard';
import MovieLoading from '../MovieLoading';

const fadeVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

type SearchPageProps = {
  data: MovieAPIData[] | undefined;
  loading: boolean;
  searchQuery: string;
  searchResult: MovieAPIData[];
  setFilterPageOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function SearchPage({
  data,
  loading,
  searchQuery,
  searchResult,
  setFilterPageOpen,
}: SearchPageProps) {
  return (
    <motion.div
      exit="hidden"
      animate="show"
      initial="hidden"
      variants={fadeVariant}
      className="bg-[#24224e]/60 backdrop-blur-sm fixed inset-0 w-full h-full pt-[20vh] pb-[10vh] -z-10 text-white overflow-y-scroll"
    >
      <Container className="flex flex-col gap-12">
        <div className="flex justify-between items-center">
          <h2 className="text-5xl">Search Results</h2>
          {searchResult.length !== 0 && (
            <button
              type="button"
              onClick={() => setFilterPageOpen(true)}
              className="text-black bg-white shadow-md rounded-full py-3 px-8 font-medium capitalize tracking-wide"
            >
              filter
            </button>
          )}
        </div>
        <div>
          {searchQuery && (
            <section className="grid md:grid-cols-2 grid-cols-1 gap-5">
              {loading ? (
                <MovieLoading />
              ) : (
                data?.map((movie) => (
                  <MovieCard
                    id={movie.id}
                    key={movie.id}
                    title={movie.title || movie.name}
                    category={movie.media_type}
                    image={movie.poster_path}
                    rating={movie.popularity}
                    releaseYear={parseInt(
                      movie.release_date || movie.first_air_date,
                      10
                    )}
                  />
                ))
              )}
            </section>
          )}
        </div>
      </Container>
    </motion.div>
  );
}

export default SearchPage;
