import Container from '@components/Container';
import HeroBackground from '@components/HeroBackground';
import StarIcon from '@components/icons/StarIcon';
import { useLocation, Link } from 'react-router-dom';
import { DetailMovieAPIData } from 'src/models';

type InfoSectionProps = {
  title: string;
  detail: string | number;
};

function InfoSection({ title, detail }: InfoSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h4 className="uppercase text-[10px]">{title}</h4>
      <p className="uppercase font-light text-lg">{detail}</p>
    </section>
  );
}

function HeroContent({ data }: { data: DetailMovieAPIData }) {
  const {
    title,
    tagline,
    overview,
    category,
    popularity,
    poster_path,
    release_date,
    vote_average,
  } = data;
  const imageUrl = `https://image.tmdb.org/t/p/w500${poster_path}`;

  return (
    <section className="flex md:flex-row flex-col justify-between items-start gap-10 text-white">
      <div className="flex flex-col items-start gap-10">
        <div className="flex text-xs font-light gap-1">
          <Link to="/" className="uppercase white no-underline">
            home
          </Link>
          /<p className="uppercase">{title}</p>
        </div>
        <div className="flex flex-col items-start gap-5">
          <h1 className="md:text-6xl text-5xl">{title}</h1>
          <div className="flex gap-2">
            {data.genres.map(({ id: _id, name }, index, array) => (
              <p key={_id} className="capitalize font-light">
                {name}
                {!(index > array.length - 2) && ','}
              </p>
            ))}
          </div>
        </div>
        <div className="flex items-center md:gap-20 gap-8">
          <img
            alt={title}
            src={imageUrl}
            className="h-48 aspect-[1/1.5] object-cover object-center shadow-[0px_10px_30px_rgba(0,0,0,0.4)]"
          />
          <div className="grid grid-cols-2 md:gap-16 gap-10 max-w-xs">
            <InfoSection title="released" detail={parseInt(release_date, 10)} />
            <InfoSection title="category" detail={category} />
            <InfoSection title="rating" detail={vote_average} />
            <InfoSection title="popularity" detail={popularity} />
          </div>
        </div>
        <button type="button" className="c-t-a ">
          <StarIcon size={18} color="white" />
          <p className="mt-1">save to list</p>
        </button>
      </div>
      <div className="movie-details flex flex-col gap-16 md:max-w-sm w-full">
        <div className="flex flex-col gap-5">
          <h3 className="uppercase">tagline</h3>
          <p className="font-light">{tagline}</p>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="uppercase">Overview</h3>
          <p className="font-light">{overview}</p>
        </div>
        <div className="flex flex-col gap-5">
          <h3 className="uppercase">Other Stuff</h3>
          <p className="font-light">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Cum, sed.
            A fugit modi nihil laborum voluptatum corporis veniam quis fugiat
            tempore, consequuntur ratione incidunt rem eum unde ad. Facere,
            exercitationem.
          </p>
        </div>
      </div>
    </section>
  );
}

function Hero() {
  const location = useLocation();
  const { state } = location;

  const imageUrl = `https://image.tmdb.org/t/p/original${state.backdrop_path}`;

  return (
    <section className="min-h-screen relative">
      <HeroBackground image={imageUrl} title={state.title} />
      <Container className="z-[15] relative pt-[10vh] grid gap-4">
        <HeroContent data={state} />
      </Container>
    </section>
  );
}

export default Hero;
