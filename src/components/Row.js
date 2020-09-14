import React, { useState, useEffect } from "react";
import "./Row.css";
import axios from "../api/axios";
import YouTube from "react-youtube";
import movieTrailer from "movie-trailer";

// base url for img(i.e poster_path)
const base_url = "https://image.tmdb.org/t/p/original/";

function Row({ title, fetchUrl, isLargeRow }) {
  const [movies, setMovies] = useState([]);
  const [trailerUrl, setTrailerUrl] = useState("");

  // useEffect: allow function component to use lifecycle method
  useEffect(() => {
    // run this code once when this component(Row) loads / mounts as well as run depending on dependencies
    async function fetchData() {
      // get the responce from api
      const responce = await axios.get(fetchUrl);

      // update the state
      setMovies(responce.data.results);

      // jump out of async function
      return responce;
    }

    fetchData();
  }, [fetchUrl]); // means run this code when this component(Row) loads / mounts as well as run when 'fetchUrl' change
  // imp: if any outside vaiable is used in useEffect then pass in as dependency

  // for <Youtube/>
  const opts = {
    height: "390",
    width: "100%",
    playerVars: {
      autoplay: 1, // i want to autoplay when it loads in
    },
  };

  const handleOnClick = (movie) => {
    // if video is already open then close it(i.e if trailerUrl is present)
    if (trailerUrl) {
      setTrailerUrl("");
    } else {
      // movieTrailer():another dependency, if we pass the movie-name then it automatically look for its trailer
      movieTrailer(movie?.name || "") //because sometime movie-name is not defined
        .then((url) => {
          // return url for e.g https://www.youtube.com/watch?v=xxjcxjkj  ,  we only want "xxjcxjkj" this part
          const urlParams = new URLSearchParams(new URL(url).search);
          setTrailerUrl(urlParams.get("v"));
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    // BEM convention : way of writing className in react
    <div className="row">
      <h2>{title}</h2>
      <div className="row_posters">
        {movies.map((movie) => (
          <img
            onClick={() => handleOnClick(movie)}
            // add class "row_poster" to every img & if 'isLargeRow' prop is present then add additional class of "row_posterLarge"
            className={`row_poster ${isLargeRow && "row_posterLarge"}`}
            key={movie.id} //  with the help of this 'key', if anything changes in that row, react doesn't rerender entire row it just rerender what it needs to rerender
            src={`${base_url}${
              // if 'isLargeRow' is passed as prop(i.e only in case of netflix original) then display movie-poster otherwise display movie-thumbnail
              isLargeRow ? movie.poster_path : movie.backdrop_path
            }`}
            alt={movie.name}
          />
        ))}
      </div>
      {/* <Youtube/> takes videoId & options, responsible for displaying trailer, if trailerUrl present then only display youtube component */}
      {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
    </div>
  );
}

export default Row;
