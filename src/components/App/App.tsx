import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import SearchBar from '../SearchBar/SearchBar';
import MovieGrid from '../MovieGrid/MovieGrid';
import MovieModal from '../MovieModal/MovieModal';
import { fetchMovies } from '../../services/movieService';
import type { Movie, MovieResponse } from '../../types/movie';
import styles from './App.module.css';
import toast from 'react-hot-toast';
import ReactPaginate from 'react-paginate';

const App = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<boolean>(false);
  const [query, setQuery] = useState<string>('');
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(0);

  const handleSearch = async (searchQuery: string, pageNumber = 1) => {
    setLoading(true);
    setError(false);
    try {
      const response: MovieResponse = await fetchMovies(searchQuery, pageNumber);
      if (response.results.length === 0) {
        toast.error('No movies found for your request.');
      }
      setMovies(response.results);
      setTotalPages(response.total_pages);
      setPage(pageNumber);
      setQuery(searchQuery);
    } catch (err) {
      console.error(err);
      setError(true);
      toast.error('Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = ({ selected }: { selected: number }) => {
    const newPage = selected + 1;
    handleSearch(query, newPage);
  };

  return (
    <div className={styles.app}>
      <Toaster />
      <SearchBar onSubmit={(q) => handleSearch(q, 1)} />

      {loading && <p>Loading...</p>}
      {error && <p>Something went wrong!</p>}

      {movies.length > 0 && (
        <>
          <MovieGrid movies={movies} onSelect={setSelectedMovie} />
          {totalPages > 1 && (
            <ReactPaginate
              previousLabel="←"
              nextLabel="→"
              breakLabel="..."
              pageCount={totalPages > 500 ? 500 : totalPages} // max TMDB сторінок 500
              pageRangeDisplayed={5}
              marginPagesDisplayed={1}
              onPageChange={handlePageChange}
              containerClassName={styles.pagination}
              activeClassName={styles.active}
              forcePage={page - 1}
            />
          )}
        </>
      )}

      {selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={() => setSelectedMovie(null)} />
      )}
    </div>
  );
};

export default App;
