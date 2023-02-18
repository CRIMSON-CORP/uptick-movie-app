import { MovieCardProps } from 'src/models';

type InfoSectionProps = {
  header: string;
  detail: string | number;
};

function InfoSection({ header, detail }: InfoSectionProps) {
  return (
    <div className="grid gap-3">
      <h4 className="text-xs uppercase">{header}</h4>
      <p className="text-xs uppercase">{detail}</p>
    </div>
  );
}

function MovieCard({
  image,
  title,
  releaseYear,
  rating,
  category,
}: MovieCardProps) {
  const imageUrl = `https://image.tmdb.org/t/p/w500${image}`;
  return (
    <article className="movie-card flex flex-col justify-end">
      <img
        alt={title}
        src={imageUrl}
        className="absolute inset-0 w-full h-full object-cover object-center -z-10"
      />
      <section className="flex flex-col items-start gap-4 text-white p-[5%] z-10">
        <h3 className="inline text-2xl py-3 border-b-2 border-white/20">
          {title}
        </h3>
        <section className="flex w-full justify-between items-center gap-4">
          <InfoSection header="release year" detail={releaseYear} />
          <InfoSection header="rating" detail={rating} />
          <InfoSection header="category" detail={category} />
        </section>
      </section>
    </article>
  );
}

export default MovieCard;
