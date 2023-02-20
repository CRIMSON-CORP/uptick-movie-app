function Rectangle() {
  return (
    <div className="absolute md:left-1/4 left-[15%] bg-[rgba(255,255,255,0.1)] md:rotate-[40deg] rotate-[20deg] h-[200vh] md:w-[40vw] w-[80vw] -translate-y-1/4 last:-translate-x-[30%]" />
  );
}

function HeroBackground({ image, title }: { image: string; title: string }) {
  return (
    <div className="absolute w-full min-h-screen h-full overflow-hidden">
      <div className="absolute w-full min-h-screen h-full bg-[radial-gradient(52.63%_126.58%_at_55.04%_59.72%,rgba(48,79,130,0)_0%,rgba(39,61,102,0.45)_65.1%,#1F2C4D_100%)]" />
      <img
        src={image}
        alt={title}
        className="absolute w-full min-h-screen h-full object-cover md:object-center object-[65%_50%] mix-blend-multiply"
      />
      <div className="absolute inset-0 w-full h-full">
        <Rectangle />
        <Rectangle />
      </div>
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0)_0%,rgba(20,19,44,0.28)_76.04%,#24224E_100%)]" />
    </div>
  );
}

export default HeroBackground;
