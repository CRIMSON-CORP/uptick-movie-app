export type IconProps = {
  color: string;
  size: number;
};

export type MovieCardProps = {
  image: string;
  title: string;
  releaseYear: string | number;
  rating: string | number;
  category: string;
};

export type MovieAPIResponse = {
  page: number;
  results: MovieAPIData[];
};

export type MovieAPIData = {
  adult: false;
  backdrop_path: string;
  id: number;
  title: string;
  original_language: string;
  original_title: string;
  overview: string;
  poster_path: string;
  media_type: string;
  genre_ids: number[];
  popularity: number;
  release_date: string;
  video: false;
  vote_average: number;
  vote_count: number;
  name: string;
  first_air_date: string;
};
