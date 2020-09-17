import React, { useState, useEffect } from "react";
import { Route, useHistory } from "react-router-dom";
import axios from 'axios';

// Components
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import {UpdateMovie} from "./Movies/UpdateMovie";
import {AddMovie} from './Movies/AddMovie';
import Movie from "./Movies/Movie";


const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);
  const history = useHistory();

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then(res => setMovieList(res.data))
      .catch(err => console.log(err.response));
  };

  const addToSavedList = movie => {
    setSavedList([...savedList, movie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/add-movie">
        <AddMovie/>
      </Route>

      <Route path="/update-movie/:id">
        <UpdateMovie setMovieList={setMovieList} movieList={movieList}/>
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} history={history} setMovieList={setMovieList} movieList={movieList}/>
      </Route>
    </>
  );
};

export default App;