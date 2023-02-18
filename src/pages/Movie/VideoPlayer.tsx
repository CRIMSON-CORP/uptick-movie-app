import Container from '@components/Container';
import PlayIcon from 'src/components/icons/PlayIcon';
import { useLocation } from 'react-router-dom';

function VideoPlayer() {
  const { state } = useLocation();
  const imageUrl = `https://image.tmdb.org/t/p/original${state.backdrop_path}`;
  return (
    <div className="bg-[#24224e]">
      <Container className="md:-translate-y-[10vh]md:pt-0 pt-10 flex flex-col gap-5">
        <div className="relative aspect-video w-full movie-card grid place-items-center isolate">
          <img
            src={imageUrl}
            alt={state.title}
            className="w-full h-full object-cover object-center absolute -z-10"
          />
          <div className="relative z-10">
            <PlayIcon color="white" size={80} />
          </div>
        </div>
      </Container>
    </div>
  );
}

export default VideoPlayer;
