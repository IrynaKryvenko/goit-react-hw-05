import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Section from "../Section/Section";
import Loader from "../Loader/Loader";
import { getCastMovie } from "../../api";
import css from "./MovieCast.module.css";

function MovieCast() {
  const { movieId } = useParams();
  const [castsMovie, setCastsMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCastMovie = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const data = await getCastMovie(movieId);
        setCastsMovie(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCastMovie();
  }, [movieId]);

  return (
    <Section>
      {isLoading && <Loader />}
      {error && <span>Error</span>}
      {castsMovie && (
        <ul className={css.list}>
          {castsMovie.cast.map((castMovie) => (
            castMovie.profile_path && (
              <li className={css.item} key={castMovie.id}>
                <img
                  src={`https://image.tmdb.org/t/p/w500/${castMovie.profile_path}`}
                  alt={castMovie.name}
                />
                <h4 className={css.text}>{castMovie.name}</h4>
                <p>Character: {castMovie.character}</p>
              </li>
            )
          ))}
        </ul>
      )}
    </Section>
  );
}

export default MovieCast;
