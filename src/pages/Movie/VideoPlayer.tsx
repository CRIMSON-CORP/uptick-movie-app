import Container from '@components/Container';
// import ReactPlayer from 'react-player';

function VideoPlayer() {
  return (
    <div className="bg-[#24224e]">
      <Container className="-translate-y-[20vh] flex flex-col gap-5">
        <div className="aspect-video w-full movie-card" />
      </Container>
    </div>
  );
}

export default VideoPlayer;
