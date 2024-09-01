import { Link } from "react-router-dom";
import css from "./MovieList.module.css";

function MovieList({ movies = [], location }) {
  return (
    <ul className={css.list}>
      {movies.length > 0 ? (
        movies.map((movie) => (
          <li className={css.item} key={movie.id}>
            <Link
              className={css.link}
              state={{ from: location }}
              to={`/movies/${movie.id}`}
            >
              {movie.title}
            </Link>
          </li>
        ))
      ) : (
        <li>No movies found.</li>
      )}
    </ul>
  );
}

export default MovieList;
