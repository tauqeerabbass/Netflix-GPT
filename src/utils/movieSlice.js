import { createSlice } from "@reduxjs/toolkit";

const movieSlice = createSlice({
    name : "movie",
    initialState: {
        nowPlayingMovies: null,
        movieTrailers: null
    },
    reducers:{
        setNowPlayingMovies: (state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        setMovieTrailers: (state, action) => {
            state.movieTrailers = action.payload;
        }
    }
})

export const { setNowPlayingMovies, setMovieTrailers } = movieSlice.actions;

export default movieSlice.reducer;