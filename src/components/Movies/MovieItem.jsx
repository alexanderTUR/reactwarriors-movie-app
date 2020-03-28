import React from 'react'
import PropTypes from 'prop-types'
import AppContextHoc from '../HOC/AppContextHOC'
// import CallApi from '../../api/api'
import FavoriteButton from '../UIButtons/FavoriteButton'
import WatchlistButton from '../UIButtons/WatchlistButton'

class MovieItem extends React.Component {
  static propTypes = {
    item: PropTypes.object.isRequired,
  }

  render() {
    const { item, user } = this.props
    const imagePath = item.backdrop_path || item.poster_path

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
        {user ? (
          <div className="card-footer">
            <div className="card-footer__container">
              <WatchlistButton id={item.id} />
              <FavoriteButton id={item.id} />
            </div>
          </div>
        ) : null}
      </div>
    )
  }
}

export default AppContextHoc(MovieItem)
