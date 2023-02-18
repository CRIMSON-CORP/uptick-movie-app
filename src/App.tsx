import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Movie from './pages/Movie';
import './index.css';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
      <ScrollToTop />
    </Router>
  );
}

export default App;
