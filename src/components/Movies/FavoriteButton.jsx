import React from 'react'
import AppContextHoc from '../HOC/AppContextHOC'
import CallApi from '../../api/api'
import { Star, StarBorder } from '@material-ui/icons'

class FavoriteButton extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  updateFavoriteList = () => {
    const {
      session_id,
      user,
      isAuth,
      fetchFavoriteMovies,
      id,
      toggleLoginModal,
    } = this.props
    if (!isAuth) {
      toggleLoginModal()
      return
    }
    const queryStringParams = {
      session_id,
    }
    this.setState({
      loading: true,
    })
    CallApi.post(`/account/${user.id}/favorite`, {
      params: queryStringParams,
      body: {
        media_type: 'movie',
        media_id: id,
        favorite: !this.isFavorite(),
      },
    })
      .then(() => fetchFavoriteMovies({ user, session_id }))
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  toggleActiveButton = () => {
    this.updateFavoriteList()
  }

  isFavorite = () =>
    this.props.favoriteMovies.findIndex(movie => movie.id === this.props.id) !==
    -1

  render() {
    return (
      <button
        className="ui-btn ui-btn_favorite"
        type="button"
        onClick={this.toggleActiveButton}
        disabled={this.state.loading}
      >
        {this.isFavorite() ? <Star /> : <StarBorder />}
      </button>
    )
  }
}

export default AppContextHoc(FavoriteButton)
