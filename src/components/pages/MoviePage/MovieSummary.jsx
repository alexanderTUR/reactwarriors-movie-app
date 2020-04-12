import React, { Component } from 'react'
import FavoriteButton from '../../Movies/FavoriteButton'
import WatchlistButton from '../../Movies/WatchlistButton'
import MovieImage from '../../ui/MovieImage'

class MovieSummary extends Component {
  render() {
    const { movie } = this.props
    const imagePath = movie.backdrop_path || movie.poster_path
    return (
      <div className="row mt-3">
        <div className="col-5">
          <MovieImage
            src={imagePath}
            alt={movie.title}
            className="movie-image"
          />
        </div>
        <div className="col-7">
          <h1>{movie.title}</h1>
          <p>{movie.overview}</p>
          <div>
            <WatchlistButton id={movie.id} />
            <FavoriteButton id={movie.id} />
          </div>
        </div>
      </div>
    )
  }
}

export default MovieSummary
