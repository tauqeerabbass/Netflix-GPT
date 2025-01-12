import { useDispatch } from "react-redux";
import { setPopularMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constans';

const usePopularMovies = () => {
    const dispatch = useDispatch();

  const getPopularMovies = async () => {
    const movies = await fetch("https://api.themoviedb.org/3/movie/popular?language=en-US&page=1", API_OPTIONS);
    const json = await movies.json();
    // console.log(json.results);
    dispatch(setPopularMovies(json.results));
  }
  
  useEffect(() => {
    getPopularMovies();
  });
}

export default usePopularMovies;