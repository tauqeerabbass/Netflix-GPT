import { useDispatch } from "react-redux";
import { setNowPlayingMovies } from "../utils/movieSlice";
import { useEffect } from "react";
import { API_OPTIONS } from '../utils/constans';

const useNowPlayingMovies = () => {
    const dispatch = useDispatch();

  const getNowPlayingMovies = async () => {
    const movies = await fetch("https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1", API_OPTIONS);
    const json = await movies.json();
    // console.log(json.results);
    dispatch(setNowPlayingMovies(json.results));
  }
  
  useEffect(() => {
    getNowPlayingMovies();
  });
}

export default useNowPlayingMovies;