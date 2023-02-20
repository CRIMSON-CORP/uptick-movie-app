import useFetch from '@hooks/useFetch';
import { MovieAPIResponse } from 'src/models';
import MovieCard from '../MovieCard';
import MovieLoading from '../MovieLoading';

function MovieList({ url, urlParams }: { url: string; urlParams?: any }) {
  const [data, loading] = useFetch<MovieAPIResponse>(url, urlParams);
  return (
    <section className="grid md:grid-cols-2 grid-cols-1 gap-8">
      {loading ? (
        <MovieLoading />
      ) : (
        data?.results
          ?.slice(0, 6)
          .map((movie) => (
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
  );
}

MovieList.defaultProps = {
  urlParams: {},
};

export default MovieList;
