

import React, { useState, useEffect } from "react";
import { getMovies } from "../../utilis/utilities";
import ImageContainer from "../../atoms/Image-container";
import SearchBar from "../SearchBar";
import { Link } from "react-router-dom";
import "./style.css"
const BASE_URL = process.env.REACT_APP_BASE_URL;
const ACCESS_TOKEN = process.env.REACT_APP_ACCESS_TOKEN;

const MovieList = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() => {
    // Fetch movies when the component mounts
    const fetchMovies = async () => {
      try {
        const moviesData = await getMovies();
        setMovies(moviesData.results);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setLoading(false); // Set loading to false even if there's an error
        setError("Failed to fetch movies.");
      }
    };
    fetchMovies();
  }, []);
  const handleSearchFunction = async (searchValue) => {
    if (!searchValue.trim()) {
      // If searchValue is empty or contains only spaces, fetch all movies
      try {
        const moviesData = await getMovies();
        setMovies(moviesData.results);
        setError(null);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setError("Failed to fetch movies.");
      }
    } else {
      try {
        const response = await fetch(
          `${BASE_URL}/3/search/movie?query=${searchValue}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${ACCESS_TOKEN}`,
            },
          }
        );
        if (!response.ok) {
          throw new Error("Search failed.");
        }
        const result = await response.json();
        setMovies(result.results);
        setError(null);
      } catch (error) {
        console.error("Error fetching movies:", error.message);
        setError("Failed to fetch movies.");
      }
    }
    // Set searchPerformed to true after the search
    setSearchPerformed(true);
  };
  if (loading) {
    return <h1>Loading....</h1>;
  }
  return (
    <div  >
      <div className="background">
     <SearchBar onSearch={handleSearchFunction} />
     </div>
      {error && <p>{error}</p>}

      <div className="imageContainer">
        {searchPerformed && movies.length === 0 ? (
          <p>No search results found</p>
        ) : (
          movies.map((item) => (
            <Link to={`/MovieDetails/${item.id}`} key={item.id}>
              <ImageContainer props={item} />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};
export default MovieList;
