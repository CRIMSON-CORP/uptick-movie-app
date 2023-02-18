import MovieCardSkeleton from '../MovieCard/Skeleton';

function MovieLoading() {
  return (
    <>
      {Array.from(Array(6).keys()).map((index) => (
        <MovieCardSkeleton key={index} />
      ))}
    </>
  );
}

export default MovieLoading;
