import Axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';
import axios from 'axios';

const initialItems = {
    id: '',
    title: '',
    director: '',
    metascore: '',
    stars: [],
}

export const UpdateMovie = (props) => {
    const history = useHistory();
    const { id } = useParams();
    const [movie, setMovie] = useState(initialItems);

    useEffect(() => {
        axios
            .get(`http://localhost:5000/api/movies/${id}`)
            .then(res => {
                setMovie(res.data)
            })
            .catch(err => console.log(err))
    }, [id])

    const changeHandler = (evt) => {
        evt.persist();
        const {name, value} = evt.target;
        setMovie({
            ...movie,
            [name]: value,
        })
    }

    const starsHandler = (evt) => {
        evt.persist();
        const { name, value } = evt.target
        console.log(evt.target.value);
        setMovie({
            ...movie,
            [name]: value.split("\n")
        })
        console.log(movie.stars, "STARZZZ")
    }

    const submitHandler = (evt) => {
        evt.preventDefault();
        axios
            .put(`http://localhost:5000/api/movies/${id}`, movie)
            .then(res => {
                props.movieList.map((movie) => movie.id === movie.id ? movie : null);
                history.push(`/`)
            })
            .catch(err => console.log(err))
    }


    return(
        <div>
            <h2> Update Movies </h2>
                <form onSubmit={submitHandler}>
                    <input
                    type='text'
                    name='title'
                    value={movie.title}
                    onChange={changeHandler}
                    placeholder='Movie Title'
                    > 
                    </input>
                    
                    <input
                    type='text'
                    name='director'
                    value={movie.director}
                    onChange={changeHandler}
                    placeholder='Director Name'
                    > 
                    </input>
                    
                    <input
                    type='number'
                    name='metascore'
                    value={movie.metascore}
                    onChange={changeHandler}
                    placeholder='Metascore'
                    > 
                    </input>

                    
                    <div className='actors'>
                        <textarea name="stars" value={movie.stars.join("\n")} onChange={starsHandler} />                    
                    </div>
                    <button>Update</button>
                </form>
        </div>
)
}

export default UpdateMovie;