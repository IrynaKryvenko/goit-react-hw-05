import { useEffect, useState } from "react";
import Loader from "../../components/Loader/Loader";
import Section from "../../components/Section/Section";
import MovieList from "../../components/MovieList/MovieList";
import { getHomeMovies } from "../../api";


const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHomeMovies = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const { results } = await getHomeMovies();
        setMovies(results);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchHomeMovies();
  }, []);

  return (
    <Section>
      <h1>Trending today</h1>
      {isLoading && <Loader />}
      {error && <span>Error</span>}
      <MovieList movies={movies} />
    </Section>
  );
}

export default HomePage;
