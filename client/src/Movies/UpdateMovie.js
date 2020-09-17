import React, { useState, useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";

const initialMovie = {
  id: "",
  title: "",
  director: "",
  metascore: "",
  stars: "",
};

const UpdateMovie = ({ setMovieList, movieList }) => {
  const { id } = useParams();
  const [movieItem, setMovieItem] = useState(initialMovie);
  const [isLoading, setIsLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    console.log("mvlist", movieList);
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then((res) => {
        console.log("updateformprops", res);
        setMovieItem(res.data);
      })
      .catch((err) => console.log(err));
  }, [id]);

  const changeHandler = (ev) => {
    ev.persist();
    let value = ev.target.value;
    setMovieItem({
      ...movieItem,
      [ev.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    axios
      .put(`http://localhost:5000/api/movies/${id}`, movieItem)
      .then((res) => {
        console.log("handeSubmit", res); 
        setMovieList(
          movieList.map((mv) => {
            if (mv.id == id) {
              return movieItem;
            } else {
              return mv;
            }
          })
        );
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          onChange={changeHandler}
          placeholder="name"
          value={movieItem.title}
        />



        <button className="md-button form-button">Update</button>
      </form>
    </div>
  );
};

export default UpdateMovie;