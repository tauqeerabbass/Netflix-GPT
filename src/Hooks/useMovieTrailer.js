import { useDispatch } from "react-redux";
import { API_OPTIONS } from "../utils/constans";
import { setMovieTrailers } from "../utils/movieSlice";
import { useEffect } from "react";

const useMovieTrailer = (movieId) => {
    const dispatch = useDispatch();

  const fetchMovieTrailer = async () => {
    const movieData = await fetch(
      `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`,
      API_OPTIONS
    );
    const json = await movieData.json();
    console.log(json);

    const filteredTrailer = json.results.filter((video) => video.type === "Trailer");
    const trailer = filteredTrailer.length ? filteredTrailer[0] : json.results[0];
    console.log(trailer);
    dispatch(setMovieTrailers(trailer));
  };

  useEffect(() => {
    fetchMovieTrailer();
  });
}

export default useMovieTrailer;