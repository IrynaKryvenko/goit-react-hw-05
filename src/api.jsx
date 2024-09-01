import axios from "axios";

// Устанавливаем базовый URL для всех запросов
axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = 
  "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhYzIwNzM5NTZmYjY0ZGU5MWU5MjA3Njk4MTcyZTA0NiIsIm5iZiI6MTcyNTAyOTAyNi4xODM5OTEsInN1YiI6IjY2ZDFjZjc4OTE5MmNmYmY3MTAwMzU0YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ErNKewEUS9znSiYxTOdlY0lngU28C3CdWPlQUFuIQw8";
axios.defaults.headers.post["Content-Type"] = "application/json";

// Функция для получения популярных фильмов
export const getHomeMovies = async () => {
  const { data } = await axios.get("/trending/movie/day?language=en-US");
  return data;
};

// Функция для получения деталей фильма
export const getDetailsMovie = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}`);
  return data;
};

// Функция для получения актеров фильма
export const getCastMovie = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/credits`);
  return data;
};

// Функция для получения отзывов о фильме
export const getReviewsMovie = async (movieId) => {
  const { data } = await axios.get(`/movie/${movieId}/reviews`);
  return data;
};

// Функция для поиска фильмов
export const getSearchMovie = async (query) => {
  const { data } = await axios.get(`/search/movie`, {
    params: { query, language: "en-US", page: 1 }
  });
  return data;
};