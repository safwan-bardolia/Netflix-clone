import React, { useState, useEffect } from "react";
import "./Banner.css";
import axios from "../api/axios";
import tmdb from "../api/tmdb";

function Banner() {
  // it select random movie each time
  const [movie, setMovie] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // get the data
      const response = await axios.get(tmdb.fetchNetflixOriginals);

      // update state (pick random movie each time)
      setMovie(
        response.data.results[
          Math.floor(Math.random() * response.data.results.length - 1)
        ]
      );

      // jump out of async function
      return response;
    }
    fetchData();
  }, []);

  // to truncate overview (or we can use <TextTruncate>)
  function truncate(str, n) {
    // if str length is greate then n then trucate it & add '...' to string or else return string
    return str?.length > n ? str.substr(0, n - 1) + "..." : str;
  }

  return (
    //   instead of div we are using header tag (note we are using background img on entie component)
    <header
      className="banner"
      style={{
        backgroundSize: "cover", // cover entire size of container
        backgroundImage: `url(
            "https://image.tmdb.org/t/p/original/${movie?.backdrop_path}"
        )`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner_contents">
        {/* if movi-title not present then movie-name or movie-original-name because api sometime doesnt gives you consistent data */}
        <h1 className="banner_title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>

        <div className="banner_buttons">
          <button className="banner_button">Play</button>
          <button className="banner_button">My List</button>
        </div>

        <h1 className="banner_description">{truncate(movie?.overview, 150)}</h1>
      </div>

      {/* it is empty, we style it using css,
       its only purpose is for 'fadding' at bottom*/}
      <div className="banner-fadeBottom"></div>
    </header>
  );
}

export default Banner;
