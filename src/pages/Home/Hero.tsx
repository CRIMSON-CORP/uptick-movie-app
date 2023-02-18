import Container from 'src/components/Container';

function Rectangle() {
  return (
    <div className="absolute left-1/4 bg-[rgba(255,255,255,0.1)] rotate-[40deg] h-[200vh] w-[40vw] -translate-y-1/4 last:-translate-x-[30%]" />
  );
}

function HeroBackground() {
  return (
    <div className="absolute w-full h-screen overflow-hidden">
      <div className="absolute w-full h-screen bg-[radial-gradient(52.63%_126.58%_at_55.04%_59.72%,rgba(48,79,130,0)_0%,rgba(39,61,102,0.45)_65.1%,#1F2C4D_100%)]" />
      <img
        alt="john wick bg"
        src="/hero-bg-desktop.jpg"
        className="absolute w-full h-screen object-cover object-center mix-blend-multiply"
      />
      <div className="absolute inset-0 w-full h-full">
        <Rectangle />
        <Rectangle />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(20,19,44,0.28)_76.04%,#24224E_100%)]" />
    </div>
  );
}

function HeroContent() {
  return (
    <div className="inset-0 text-white max-w-xl w-full flex flex-col gap-14">
      <h1 className="text-7xl">Welcome!</h1>
      <p className="leading-relaxed font-light">
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
      <HeroBackground />
      <Container className="z-[15] relative pt-[30vh] grid gap-4">
        <HeroContent />
      </Container>
    </section>
  );
}

export default Hero;
