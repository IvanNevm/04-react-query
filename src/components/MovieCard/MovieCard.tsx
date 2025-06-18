// src/components/MovieCard/MovieCard.tsx
import React from 'react';
import type { Movie } from '../../types/movie';
import styles from './MovieCard.module.css';

interface MovieCardProps {
  movie: Movie;
}

const IMAGE_BASE = 'https://image.tmdb.org/t/p/w300';

const MovieCard: React.FC<MovieCardProps> = ({ movie }) => (
  <div className={styles.card}>
    {movie.poster_path ? (
      <img
        src={`${IMAGE_BASE}${movie.poster_path}`}
        alt={movie.title}
        className={styles.image}
      />
    ) : (
      <div className={styles.placeholder}>No Image</div>
    )}
    <h3 className={styles.title}>{movie.title}</h3>
    
  </div>
);

export default MovieCard;