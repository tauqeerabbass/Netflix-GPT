import React from 'react';
import MainMovieVideo from './MainMovieVideo';
import MainMovieTitle from './MainMovieTitle';
import { useSelector } from 'react-redux';

const MainContainer = () => {
    const movies = useSelector((store) => store.movie?.nowPlayingMovies);
    if (!movies) return;
    const mainMovie = movies[0];
    // console.log(mainMovie);

    const {original_title, overview, id} = mainMovie;

  return (
    <div>
        <MainMovieTitle title={original_title} overview={overview}/>
        <MainMovieVideo movieId={id}/>
        MainContainer
    </div>
  )
}

export default MainContainer;
