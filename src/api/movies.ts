import axios from 'axios';
import type { MovieResponse } from '../types/movie';

const API_TOKEN = import.meta.env.VITE_TMDB_TOKEN; // v4 Bearer Token
const BASE_URL = 'https://api.themoviedb.org/3';

export const fetchMovies = async (
  query: string,
  page: number
): Promise<MovieResponse> => {
  const { data } = await axios.get<MovieResponse>(
    `${BASE_URL}/search/movie`,
    {
      params: {
        query,
        page,
        language: 'en-US',
        include_adult: false,
      },
      headers: {
        Authorization: `Bearer ${API_TOKEN}`,
      },
    }
  );
  return data;
};
