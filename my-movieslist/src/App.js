import { useState, useEffect, useCallback } from "react";
import "./App.css";
import AddMovie from "./components/Movies/AddMovie";
import MoviesList from "./components/Movies/MoviesList";

function App() {
  const [movies, setMovies] = useState([]);
  const [isLoding, setIsLoding] = useState(false);
  const [error, setError] = useState(null);

  const fetchMoviesHandler = useCallback(async () => {
    setIsLoding(true);
    setError(null);

    try {
      const response = await fetch(
        "https://react-project-4c640-default-rtdb.firebaseio.com/movies.json"
      );
      if (!response.ok) {
        throw new Error("Something Went Wrong!");
      }
      const data = await response.json();

      const loadedMovies = [];

      for (const key in data) {
        loadedMovies.push({
          id: key,
          title: data[key].title,
          openingText: data[key].openingText,
          raleaseDate: data[key].releaseDate,
        });
      }

      setMovies(loadedMovies);
      setIsLoding(false);
    } catch (error) {
      setError(error.message);
    }
    setIsLoding(false);
  }, []);

  useEffect(() => {
    fetchMoviesHandler();
  }, [fetchMoviesHandler]);

  async function addMovieHAndler(movie) {
    const response = await fetch(
      "https://react-project-4c640-default-rtdb.firebaseio.com/movies.json",
      {
        method: "POST",
        body: JSON.stringify(movie),
        header: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    console.log(data);
  }

  let content = <p>Found no movies.</p>;

  if (movies.length > 0) {
    content = <MoviesList movies={movies} />;
  }

  if (error) {
    content = <p>{error}</p>;
  }

  if (isLoding) {
    content = <p>Loading...</p>;
  }
  return (
    <div>
      <section>
        <AddMovie onAddMovie={addMovieHAndler} />
      </section>
      <section className="btn-bg-style">
        <button className="btn-md" onClick={fetchMoviesHandler}>
          Search Movies
        </button>
      </section>
      <section className="moviesList-style">{content}</section>
    </div>
  );
}

export default App;
