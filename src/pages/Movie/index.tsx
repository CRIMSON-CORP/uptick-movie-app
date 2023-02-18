import NavBar from '@components/NavBar';
import { Navigate, useLocation } from 'react-router-dom';
import Hero from './Hero';
import VideoPlayer from './VideoPlayer';

function Movie() {
  const { state } = useLocation();

  if (!state) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <NavBar />
      <Hero />
      <VideoPlayer />
    </>
  );
}

export default Movie;
