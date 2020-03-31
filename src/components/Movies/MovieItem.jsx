import React from 'react'
import PropTypes from 'prop-types'
import FavoriteButton from './FavoriteButton'
import WatchlistButton from './WatchlistButton'

export default class MovieItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const { item } = this.props
    const imagePath = item.backdrop_path || item.poster_path

    return (
      <div className="card">
        <img
          className="card-img-top card-img--height"
          src={imagePath ? `https://image.tmdb.org/t/p/w500${imagePath}` : ''}
          alt={item.title}
        />
        <div className="card-body">
          <h6 className="card-title">{item.title}</h6>
          <div className="card-text">Рейтинг: {item.vote_average}</div>
        </div>
        <div className="card-footer">
          <div className="card-footer__container">
            <WatchlistButton id={item.id} />
            <FavoriteButton id={item.id} />
          </div>
        </div>
      </div>
    )
  }
}
