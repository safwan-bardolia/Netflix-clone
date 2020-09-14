import React from "react";
import "./App.css";
import Row from "./Row";
import tmdb from "../api/tmdb";
import Banner from "./Banner";
import Nav from "./Nav";

function App() {
  return (
    <div className="app">
      <Nav />

      <Banner />

      <Row
        title="NETFLIX ORIGINALS"
        fetchUrl={tmdb.fetchNetflixOriginals}
        isLargeRow
      />
      <Row title="Trending Now" fetchUrl={tmdb.fetchTrending} />
      <Row title="TV Shows" fetchUrl={tmdb.fetchTvShows} />
      <Row title="Top Rated" fetchUrl={tmdb.fetchTopRated} />
      <Row title="Action Movies" fetchUrl={tmdb.fetchActionMovies} />
      <Row title="Comedy Movies" fetchUrl={tmdb.fetchComedyMovies} />
      <Row title="Horror Movies" fetchUrl={tmdb.fetchHorrorMovies} />
      <Row title="Romance Movies" fetchUrl={tmdb.fetchRomanceMovies} />
      <Row title="Documentaries" fetchUrl={tmdb.fetchDocumentaries} />
    </div>
  );
}

export default App;
