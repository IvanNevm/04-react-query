import React, { useState, type FormEvent } from 'react';
import { useQuery } from '@tanstack/react-query';
import ReactPaginate from 'react-paginate';

import { fetchMovies } from '../../api/movies';
import type { MovieResponse } from '../../types/movie';
import MovieList from '../MovieList/MovieList';
import css from './App.module.css';

const App: React.FC = () => {
  const [query, setQuery] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [page, setPage] = useState<number>(1);

  // Зверніть увагу: видалено keepPreviousData
  const { data, isLoading, isError } = useQuery<
    MovieResponse,
    Error,
    MovieResponse,
    [string, string, number]
  >({
    queryKey: ['movies', searchTerm, page],
    queryFn: () => fetchMovies(searchTerm, page),
    enabled: Boolean(searchTerm.trim()),
  });

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearchTerm(query);
    setPage(1);
  };

  const totalPages = data?.total_pages ?? 0;

  return (
    <div className={css.container}>
      <h1>Пошук фільмів</h1>
      <form onSubmit={handleSubmit} className={css.form}>
        <input
          className={css.input}
          type="text"
          value={query}
          onChange={e => setQuery(e.currentTarget.value)}
          placeholder="Введіть назву..."
        />
        <button className={css.button} type="submit">
          Шукати
        </button>
      </form>

      {isLoading && <p>Завантаження...</p>}
      {isError && <p>Сталася помилка.</p>}

      {data && <MovieList movies={data.results} />}

      {totalPages > 1 && (
        <ReactPaginate
          pageCount={totalPages}
          pageRangeDisplayed={5}
          marginPagesDisplayed={1}
          onPageChange={({ selected }) => setPage(selected + 1)}
          forcePage={page - 1}
          containerClassName={css.pagination}
          activeClassName={css.active}
          nextLabel="→"
          previousLabel="←"
        />
      )}
    </div>
  );
};

export default App;
