import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import lang from "../utils/langConstants";
import openai from "../utils/openAi";
import { API_OPTIONS } from "../utils/constans";
import {setMovieResults} from "../utils/gptSlice";

const SearchBar = () => {
  const searchText = useRef(null);
  const dispatch = useDispatch();
  const languageData = useSelector((store) => store.language.language);
  const [movies, setMovies] = useState(""); // State to store movie recommendations
  const [error, setError] = useState(""); // State to store error messages

  const searchMovieTmdb = async (movie) => {
    const data = await fetch(
      "https://api.themoviedb.org/3/search/movie?query=" +
        movie +
        "&include_adult=false&language=en-US&page=1",
        API_OPTIONS
    );
    const json = await data.json();
    return json.results;
  };

  const handleMovieSearch = async () => {
    const gptQuery = `Act as a movie recommendation system and give me some movies based on this query: ${searchText.current.value}. Only provide the top five movies as a comma-separated string that matches this.`;

    try {
      const gptResults = await openai.chat.completions.create({
        messages: [{ role: "user", content: gptQuery }],
        model: "gpt-3.5-turbo",
      });

      const moviesList =
        gptResults.choices[0]?.message?.content || "No movies found";
      console.log("Recommended Movies:", moviesList);
      setMovies(moviesList);
      setError(""); // Clear any previous errors

      const gptMovies = moviesList.split(",");

      const movieNames = gptMovies.map((movie) => searchMovieTmdb("Raaz"));

      const promisedMovies = await Promise.all(movieNames);
      dispatch(setMovieResults({movieNames: gptMovies, movieResults: promisedMovies}));
    } catch (err) {
      console.error("Error fetching movie recommendations:", err.message);
      setError("Failed to fetch recommendations. Please try again later.");
    }
  };

  return (
    <div className="mt-[10%] flex justify-center">
      <form
        className="bg-black p-3 w-1/2 grid grid-cols-12"
        onSubmit={(e) => e.preventDefault()}
      >
        <input
          ref={searchText}
          type="text"
          placeholder={lang[languageData].searchPlaceholder}
          className="p-3 my-1 mx-2 col-span-9 rounded-md"
        />
        <button
          onClick={handleMovieSearch}
          className="bg-red-600 text-white text-xl col-span-3 p-3 my-1 mx-2 rounded-lg"
        >
          {lang[languageData].search}
        </button>
      </form>
      {movies && (
        <div className="mt-4 text-white">
          <h3>Recommended Movies:</h3>
          <p>{movies}</p>
        </div>
      )}
      {error && <p className="mt-4 text-red-500">{error}</p>}
    </div>
  );
};

export default SearchBar;
