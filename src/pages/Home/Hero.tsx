import Container from '@components/Container';
import HeroBackground from '@components/HeroBackground';

function HeroContent() {
  return (
    <div className="inset-0 text-white max-w-xl w-full flex flex-col md:gap-14 gap-8">
      <h1 className="md:text-7xl text-5xl">Welcome!</h1>
      <p className="leading-relaxed font-light md:text-base text-sm">
        Thank you for visiting CRIM-SCAPE, a Web application built with React
        and Vite, used to search the Web for Various Intersting movies of varous
        genres, movies full of action across the years and across the Globe.
      </p>
    </div>
  );
}

function Hero() {
  return (
    <section className="min-h-screen relative">
      <HeroBackground image="/hero-bg-desktop.jpg" title="john wick poster" />
      <Container className="z-[15] relative pt-[30vh] grid gap-4">
        <HeroContent />
      </Container>
    </section>
  );
}

export default Hero;
