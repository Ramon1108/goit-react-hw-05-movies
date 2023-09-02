import Container from 'components/Container/Container';
import PageHeading from 'components/Pageheading/Pageheading';
import MovieList from 'components/MovieList/MovieList';
import { useEffect, useState } from 'react';
import { getMovies } from 'services/movies-api';
import NotFoundView from 'ui/NotFoundView';

export default function GetTrendingMovies() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchTrendingMovies = () => {
      setLoading(true);
      getMovies()
        .then(results => {
          setMovies(results);
        })
        .catch(error => {
          setError('Ooops. Something went wrong...');
          console.log(error);
        })
        .finally(() => setLoading(false));
    };
    fetchTrendingMovies();
  }, []);

  const isNotFound = !loading && !movies.length;
  return (
    <>
      <Container>
        <PageHeading text={'Trending Movies'} />
        {loading && !isNotFound && 'Loading ...'}
        {error && !isNotFound && <div>{error}</div>}
        {!isNotFound && <MovieList movies={movies} />}
        {isNotFound && <NotFoundView />}
      </Container>
    </>
  );
}
