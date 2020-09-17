import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useHistory } from "react-router-dom";
import MovieCard from "./MovieCard";

function Movie({ addToSavedList, setMovieList }) {
  const history = useHistory();
  const [movie, setMovie] = useState(null);
  const params = useParams();

  const fetchMovie = (id) => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => setMovie(res.data))
      .catch((err) => console.log(err.response));
  };

  const saveMovie = () => {
    addToSavedList(movie);
  };

  useEffect(() => {
    fetchMovie(params.id);
  }, [params.id]);

  if (!movie) {
    return <div>Loading movie information...</div>;
  }

  const updateHandler = (e) => {
    e.preventDefault();
    history.push(`/update-movie/${params.id}`);
  };

  const deleteHandler = (evt) => {
    evt.preventDefault()
    axios
      .delete(`http://localhost:5000/api/movies/${params.id}`)
      .then(res => {
        console.log(res)
        window.location = '/'
      })
      .catch(err => console.log(err))
  }

  return (
    <div className="save-wrapper">
      <MovieCard movie={movie} />
      <button
        className="save-button"
        onClick={saveMovie}
      >
        Save
      </button>
      <button
        className="save-button"
        onClick={updateHandler}
      >
        Edit
      </button>
      <button
        className="save-button"
        onClick={deleteHandler}
      >
        Delete
      </button>
    </div>
  );
}

export default Movie;