import React from "react";
import MovieCard from "./MovieCard";

const MovieList = ({ title, list }) => {
  return (
    list && (
      <div className="px-6">
        <h1 className="font-bold text-2xl p-3 text-white">{title}</h1>
        <div className="flex overflow-x-scroll scrollbar-hide">
          <div className="flex">
            {list.map((movie) => (
              <MovieCard key={movie.id} posterPath={movie.poster_path} />
            ))}
          </div>
        </div>
      </div>
    )
  );
};

export default MovieList;
