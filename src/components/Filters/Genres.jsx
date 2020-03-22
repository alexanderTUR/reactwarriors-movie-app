import React from 'react'
import PropTypes from 'prop-types'
import GenresHOC from './GenresHOC'

const Genres = ({ genres, with_genres, onChangeGenres }) => (
  <div className="form-group">
    {genres.map(genre => {
      return (
        <div className="form-check" key={genre.id}>
          <input
            className="form-check-input"
            type="checkbox"
            value={genre.name}
            id={genre.id}
            name="with_genres"
            onChange={onChangeGenres}
            checked={with_genres.includes(Number(genre.id))}
          ></input>
          <label className="form-check-label" htmlFor={genre.id}>
            {genre.name}
          </label>
        </div>
      )
    })}
  </div>
)

Genres.defaultProps = {
  genres: [],
  with_genres: [],
}

Genres.propTypes = {
  genres: PropTypes.array.isRequired,
  with_genres: PropTypes.array.isRequired,
  onChangeGenres: PropTypes.func.isRequired,
}

export default GenresHOC(Genres)
