import { lazy, Suspense } from 'react';
import { Route, Routes, Outlet } from 'react-router-dom';

import Appbar from './AppBar/AppBar';

const HomePage = lazy(() => import('./HomePage/HomePage'));

const MoviesPage = lazy(() => import('../views/MoviesPage'));
const MovieDetailsPage = lazy(() =>
  import('./MovieDetailsPage/MovieDetailsPage')
);
const Reviews = lazy(() => import('./Reviews/Reviews'));
const Cast = lazy(() => import('./Cast/Cast'));

export const App = () => {
  return (
    <>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Appbar />
              <Suspense fallback={<div>Loading...</div>}>
                <Outlet />
              </Suspense>
            </>
          }
        >
          <Route index element={<HomePage />}></Route>
          <Route path="/movies" element={<MoviesPage />}></Route>
          <Route path="/movies/:movieId/" element={<MovieDetailsPage />}>
            <Route path="reviews" element={<Reviews />} />
            <Route path="cast" element={<Cast />} />
          </Route>
        </Route>

        <Route path="*" element={<HomePage />} />
      </Routes>
    </>
  );
};
