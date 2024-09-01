import { useEffect, useState } from "react";
import toast, { Toaster } from 'react-hot-toast';
import { useLocation, useSearchParams } from "react-router-dom";
import Section from "../../components/Section/Section";
import Loader from "../../components/Loader/Loader";
import MovieList from "../../components/MovieList/MovieList";
import Form from "../../components/Form/Form";
import { getSearchMovie } from "../../api";
import css from "./MoviesPage.module.css";

const MoviesPage = () => {
  const [searchQuery, setSearchQuery] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(null);
  const [isEmpty, setIsEmpty] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const queryValue = searchParams.get("query");

  useEffect(() => {
    if (!queryValue) return;

    const fetchSearchMovie = async () => {
      setIsLoading(true);
      setSearchQuery([]);
      setIsError(null);
      setIsEmpty(false);

      try {
        const { results } = await getSearchMovie(queryValue);
        if (results.length === 0) {
          setIsEmpty(true);
        } else {
          setSearchQuery(results);
        }
      } catch (error) {
        setIsError(error.message || "Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    fetchSearchMovie();
  }, [queryValue]);

  const handleSubmit = (value) => {
    setSearchParams({ query: value });
  };

  return (
    <>
      <Section>
        <Toaster position="top-center" reverseOrder={false} />
        <Form onSubmit={handleSubmit} />
        {isLoading && <Loader />}
        {isError && <span>Error: {isError}</span>}
        {isEmpty && <span>No results were found for the query.</span>}
        <MovieList movies={searchQuery} location={location} />
      </Section>
    </>
  );
}

export default MoviesPage;
