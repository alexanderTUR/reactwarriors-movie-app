import React from 'react'
import PropTypes from 'prop-types'
// import CallApi from '../../api/api'
import { Star, StarBorder, Bookmark, BookmarkBorder } from '@material-ui/icons'

export default class MovieItem extends React.Component {
  constructor() {
    super()
    this.state = {
      movieInFavourite: false,
      movieInWatchlist: false,
    }
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  toggleMovieInFavourite = () => {
    this.setState(prevState => ({
      movieInFavourite: !prevState.movieInFavourite,
    }))
  }

  toggleMovieInWatchlist = () => {
    this.setState(prevState => ({
      movieInWatchlist: !prevState.movieInWatchlist,
    }))
  }

  render() {
    const { item } = this.props
    const imagePath = item.backdrop_path || item.poster_path
    const { movieInFavourite, movieInWatchlist } = this.state
    return (
      <div className="card">
        <img
          className="card-img-top card-img--height"
          src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ''}
          alt="item.title"
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
        <div className="card-footer">
          <div className="card-footer__container">
            <button
              className="card-footer__btn"
              type="button"
              onClick={this.toggleMovieInFavourite}
            >
              {movieInFavourite ? <Star /> : <StarBorder />}
            </button>
            <button
              className="card-footer__btn"
              type="button"
              onClick={this.toggleMovieInWatchlist}
            >
              {movieInWatchlist ? <Bookmark /> : <BookmarkBorder />}
            </button>
          </div>
        </div>
      </div>
    )
  }
}
