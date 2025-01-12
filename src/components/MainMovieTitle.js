import React from 'react'

const MainMovieTitle = ({title, overview}) => {
  return (
    <div className='w-screen pt-36 px-[75px] absolute text-white mt-24 bg-gradient-to-r from-black'>
      <h1 className='text-4xl font-bold'>{title}</h1>
      <p className='w-1/3 py-4 mb-4'>{overview}</p>
      <div>
        <button className='bg-white rounded-lg py-3 px-8 text-xl text-black'>▷ Play</button>
        <button className='bg-gray-500 rounded-lg py-3 px-8 text-xl text-white mx-2'>ⓘ More Info</button>
      </div>
    </div>
  )
}

export default MainMovieTitle;
