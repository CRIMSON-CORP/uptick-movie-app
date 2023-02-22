import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './index.css';
import ScrollToTop from './components/ScrollToTop';
import SuspenseLoader from './components/SuspenseLoader';

const Home = lazy(() => import('./pages/Home'));
const Movie = lazy(() => import('./pages/Movie'));

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <Home />
            </Suspense>
          }
        />
        <Route
          path="/movie"
          element={
            <Suspense fallback={<SuspenseLoader />}>
              <Movie />
            </Suspense>
          }
        />
      </Routes>
      <ScrollToTop />
    </Router>
  );
}

export default App;
