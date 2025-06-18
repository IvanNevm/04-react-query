import React from 'react';
import type { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
}

const MovieList: React.FC<MovieListProps> = ({ movies }) => (
  <ul className={styles.list}>
    {movies.map(movie => (
      <li key={movie.id}>
        <MovieCard movie={movie} />
      </li>
    ))}
  </ul>
);

export default MovieList;