import React from 'react';
import type { Movie } from '../../types/movie';
import MovieCard from '../MovieCard/MovieCard';
import styles from './MovieList.module.css';

interface MovieListProps {
  movies: Movie[];
  onSelectMovie?: (movie: Movie) => void;
}

const MovieList: React.FC<MovieListProps> = ({ movies, onSelectMovie }) => (
  <ul className={styles.list}>
    {movies.map(movie => (
      <li
        key={movie.id}
        onClick={() => onSelectMovie?.(movie)}
        style={{ cursor: onSelectMovie ? 'pointer' : 'default' }}
      >
        <MovieCard movie={movie} />
      </li>
    ))}
  </ul>
);

export default MovieList;
