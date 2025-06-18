export interface Movie {
  id: number;
  title: string;
  poster_path: string | null;
  backdrop_path: string | null; // додай!
  overview: string;             // додай!
  vote_average: number;
  release_date: string;         // додай!
}

export interface MovieResponse {
  page: number;
  results: Movie[];
  total_pages: number;
  total_results: number;
}

