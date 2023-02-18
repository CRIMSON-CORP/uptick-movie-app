import Container from '@components/Container';
import MovieList from '@components/MovieList';

function Movies() {
  return (
    <div className="bg-[#24224e]">
      <Container className="-translate-y-[30vh] flex flex-col gap-5">
        <MovieList url="trending/movie/day" />
        <MovieList url="trending/tv/day" />
      </Container>
    </div>
  );
}

export default Movies;
