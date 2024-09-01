import { useEffect, useState } from "react";
import Section from "../Section/Section";
import Loader from "../Loader/Loader";
import { getReviewsMovie } from "../../api";
import css from "./MovieReviews.module.css";

function MovieReviews() {
  const { movieId } = useParams();
  const [reviewsMovie, setReviewsMovie] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isEmpty, setIsEmpty] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviewsMovie = async () => {
      setIsLoading(true);
      setError(null);
      setIsEmpty(false);
      try {
        const data = await getReviewsMovie(movieId);
        if (!data.results.length) {
          setIsEmpty(true);
        } else {
          setReviewsMovie(data);
        }
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchReviewsMovie();
  }, [movieId]);

  return (
    <Section>
      {isLoading && <Loader />}
      {isEmpty && <span>Sorry, there are no reviews for this movie</span>}
      {error && <span>Error</span>}
      {reviewsMovie && reviewsMovie.results.map((reviewMovie) => (
        <div key={reviewMovie.id}>
          <h4 className={css.title}>{reviewMovie.author}</h4>
          <p className={css.text}>{reviewMovie.content}</p>
        </div>
      ))}
    </Section>
  );
}

export default MovieReviews;
