import React from 'react';
import { POSTER_URL } from '../utils/constans';

const MovieCard = ({posterPath}) => {
  return (
    <div className='w-36 pr-4'>
      <img src={POSTER_URL + posterPath} alt="movie poster"/>
    </div>
  )
}

export default MovieCard;
