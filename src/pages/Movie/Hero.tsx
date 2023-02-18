import Container from '@components/Container';
import HeroBackground from '@components/HeroBackground';
import StarIcon from '@components/icons/StarIcon';

type InfoSectionProps = {
  title: string;
  detail: string | number;
};

function InfoSection({ title, detail }: InfoSectionProps) {
  return (
    <section className="flex flex-col gap-2">
      <h4 className="uppercase text-xs">{title}</h4>
      <p className="uppercase font-extralight">{detail}</p>
    </section>
  );
}

function HeroContent() {
  return (
    <section className="flex flex-col items-start gap-10 text-white">
      <div className="flex text-xs font-thin gap-1">
        <p>TV</p>/<p>John Wick</p>
      </div>
      <h1 className="text-6xl">John Wick</h1>
      <div className="flex items-center gap-20">
        <img
          src="/hero-bg-desktop.jpg"
          alt="John Wick"
          className="h-40 aspect-video"
        />
        <div className="grid grid-cols-2 gap-16 max-w-xs">
          <InfoSection title="released" detail="2023" />
          <InfoSection title="category" detail="tv" />
          <InfoSection title="rating" detail={345} />
          <InfoSection title="adult" detail="no" />
        </div>
      </div>
      <button type="button" className="c-t-a ">
        <StarIcon size={18} color="white" />{' '}
        <p className="mt-1">save to list</p>
      </button>
    </section>
  );
}

function Hero() {
  return (
    <section className="min-h-screen relative">
      <HeroBackground image="/hero-bg-desktop.jpg" title="john wick poster" />
      <Container className="z-[15] relative pt-[10vh] grid gap-4">
        <HeroContent />
      </Container>
    </section>
  );
}

export default Hero;
