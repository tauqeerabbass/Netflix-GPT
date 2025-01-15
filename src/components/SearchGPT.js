import React from 'react'
import SearchBar from './SearchBar';
import MovieSuggestion from './MovieSuggestion';
import { BGIMG_URL } from '../utils/constans';

const SearchGPT = () => {
  return (
    <div>
        <img className='absolute -mt-60 -z-10' src={BGIMG_URL} />
      <SearchBar/>
      <MovieSuggestion/>
    </div>
  )
}

export default SearchGPT;
