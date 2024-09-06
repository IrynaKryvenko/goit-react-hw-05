import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Section from "../Section/Section";
import Loader from "../Loader/Loader";
import { getReviewsMovie } from "../../api";

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
      console.log('Fetching reviews for movieId:', movieId); // Логирование movieId
      try {
        const data = await getReviewsMovie(movieId);
        console.log('Received data:', data); // Логирование данных

        if (data && data.results) {
          if (data.results.length === 0) {
            setIsEmpty(true);
          } else {
            setReviewsMovie(data);
          }
        } else {
          setError('Unexpected data format');
        }
      } catch (error) {
        console.error('Error fetching reviews:', error); // Логирование ошибки
        setError(error.message || 'An unexpected error occurred.');
      } finally {
        setIsLoading(false);
      }
    };

    if (movieId) {
      fetchReviewsMovie();
    } else {
      setError('No movie ID provided.');
    }
  }, [movieId]);

  return (
    <Section>
      {isLoading && <Loader />}
      {isEmpty && <span>Sorry, there are no reviews for this movie.</span>}
      {error && <span>Error: {error}</span>}
      {reviewsMovie && reviewsMovie.results && reviewsMovie.results.length > 0 && (
        reviewsMovie.results.map((reviewMovie) => (
          <div key={reviewMovie.id}>
            <h4 >{reviewMovie.author}</h4>
            <p >{reviewMovie.content}</p>
          </div>
        ))
      )}
    </Section>
  );
}

export default MovieReviews;
