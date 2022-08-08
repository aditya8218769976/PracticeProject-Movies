import "../Movies/MoviesList.css";
import Movie from "./Movie";

const MoviesList = (props) => {
  return (
    <ul className="movie-list">
      {props.movies.map((movie) => (
        <Movie
          key={movie.id}
          title={movie.title}
          releaseDate={movie.releaseDate}
          openingText={movie.openingText}
        />
      ))}
    </ul>
  );
};

export default MoviesList;
