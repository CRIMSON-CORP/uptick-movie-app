/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react';
import axios from 'src/lib/axios';
import { MovieCardProps } from 'src/models';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Warning from '../icons/Warning';

const fadeVariant = {
  hidden: {
    opacity: 0,
  },
  show: {
    opacity: 1,
  },
};

type InfoSectionProps = {
  header: string;
  detail: string | number;
};

type AnimationWrapperProps = {
  children: React.ReactNode;
  className: string;
};

function InfoSection({ header, detail }: InfoSectionProps) {
  return (
    <div className="grid md:gap-3 gap-2">
      <h4 className="md:text-xs text-[9px] uppercase">{header}</h4>
      <p className="md:text-base text-sm uppercase font-light">
        {detail || 'N/A'}
      </p>
    </div>
  );
}

function AnimationWrapperOverlay({
  children,
  className,
}: AnimationWrapperProps) {
  return (
    <motion.div
      exit="hidden"
      animate="show"
      initial="hidden"
      variants={fadeVariant}
      className={`movie-card-loader flex justify-center items-center gap-2 absolute inset-0 bg-black/60 z-[15] ${className}`}
    >
      {children}
    </motion.div>
  );
}

function Loader() {
  return (
    <AnimationWrapperOverlay className="">
      <span />
      <span />
      <span />
      <span />
      <span />
    </AnimationWrapperOverlay>
  );
}

function Error({ error }: { error: string }) {
  return (
    <AnimationWrapperOverlay className="flex-col">
      <Warning size={40} color="#CB0D0D" />
      <p className="text-[#CB0D0D] text-center">{error}</p>
    </AnimationWrapperOverlay>
  );
}

function MovieCard({
  id,
  image,
  title,
  releaseYear,
  rating,
  category,
}: MovieCardProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const onClick = useCallback(() => {
    (async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await axios(
          `/movie/${id}?api_key=${import.meta.env.VITE_API_KEY}`
        );
        navigate('/movie', {
          preventScrollReset: false,
          state: { ...data, category },
        });
      } catch (_error: any) {
        setError(_error.message);
      } finally {
        setLoading(false);
      }
    })();
  }, [category, id, navigate]);

  const imageUrl = `https://image.tmdb.org/t/p/w500${image}`;
  return (
    <article
      onClick={onClick}
      className="movie-card flex flex-col justify-end group"
    >
      <img
        alt={title}
        src={imageUrl}
        className="absolute inset-0 w-full h-full object-cover object-center -z-10 group-hover:scale-105 duration-1000 ease-out"
      />
      <section className="flex flex-col items-start gap-4 text-white md:p-[4%] p-5 z-10">
        <h3 className="inline max-w-full lg:text-4xl text-3xl font-light">
          {title}
        </h3>
        <section className="flex items-center md:gap-16 gap-12 border-t-2 border-white/20 pt-4">
          <InfoSection header="released" detail={releaseYear} />
          <InfoSection header="rating" detail={rating} />
          <InfoSection header="category" detail={category} />
        </section>
      </section>
      <AnimatePresence>
        {loading && <Loader key="loader" />}
        {error && <Error key="error" error={error} />}
      </AnimatePresence>
    </article>
  );
}

export default MovieCard;
