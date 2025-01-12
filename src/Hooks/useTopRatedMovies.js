import { useDispatch } from "react-redux";
import { setTopRatedMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constans';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();

  const getTopRatedMovies = async () => {
    const movies = await fetch("https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1", API_OPTIONS);
    const json = await movies.json();
    // console.log(json.results);
    dispatch(setTopRatedMovies(json.results));
  }
  
  useEffect(() => {
    getTopRatedMovies();
  });
}

export default useTopRatedMovies;