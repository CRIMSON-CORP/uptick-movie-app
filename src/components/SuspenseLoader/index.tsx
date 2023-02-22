import { useEffect } from 'react';

function SuspenseLoader() {
  useEffect(() => {
    document.body.style.backgroundColor = '#455643';

    return () => {
      document.body.style.backgroundColor = 'transparent';
    };
  }, []);

  return (
    <div className="movie-card-loader flex justify-center items-center gap-2 absolute inset-0 bg-black/80 z-[15] overflow-hidden">
      <span />
      <span />
      <span />
      <span />
      <span />
    </div>
  );
}

export default SuspenseLoader;
