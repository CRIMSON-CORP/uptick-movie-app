import useFetch from '@hooks/useFetch';
import Container from '@components/Container';
import MovieCardSkeleton from '@components/MovieCard/Skeleton';
import { MovieAPIResponse } from 'src/models';
import MovieCard from '@components/MovieCard';

function MovieLoading() {
  return (
    <>
      {Array.from(Array(6).keys()).map((index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </>
  );
}

function MovieList({ type }: { type: string }) {
  const [data, loading] = useFetch<MovieAPIResponse>(`trending/${type}/day`);
  return (
    <section className="grid grid-cols-2 gap-5">
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

function Movies() {
  return (
    <div className="bg-[#24224e]">
      <Container className="-translate-y-[30vh] flex flex-col gap-5">
        <MovieList type="movie" />
        <MovieList type="tv" />
      </Container>
    </div>
  );
}

export default Movies;
