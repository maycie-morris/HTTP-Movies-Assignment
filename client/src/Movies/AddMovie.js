import React, {useState} from 'react';
import axios from 'axios';

const initialData = {
        id: '',
        title: '',
        director: '',
        metascore: '',
        stars: [],
}

export const AddMovie = () => {
    const [movie, setMovie] = useState(initialData);

    const changeHandler = (e) => {
        e.preventDefault();
        const {name, value} = e.target;
        setMovie({
            ...movie,
            [name]: value, 
        })
        console.log(movie);
    }

    const starUpdate = (e) => {
        const {name, value} = e.target;
        setMovie({
            ...movie,
            [name]: value.split('\n')
        })
        console.log(movie)
    }

    const submitHandler = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:5000/api/movies', movie)
            .then(res => {
                setMovie(initialData);
                window.location = '/'
            })
            .catch(err => console.log(err))
    }

    return(
        <div>
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
                    <textarea
                        name='stars'
                        value={movie.stars.join('\n')}
                        onChange={starUpdate}
                        placeholder='Add Notable Actors Here'
                    />
                </div>

                <button>Add New Movie</button>
            </form>
        </div>
    )
}

