import React from 'react'
import { withAuth } from '../../hoc/withAuth'
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
    const { auth, authActions } = this.props
    if (!auth.isAuth) {
      authActions.toggleLoginModal()
      return
    }
    const queryStringParams = {
      session_id: auth.session_id,
    }
    this.setState({
      loading: true,
    })
    CallApi.post(`/account/${auth.user.id}/favorite`, {
      params: queryStringParams,
      body: {
        media_type: 'movie',
        media_id: this.props.id,
        favorite: !this.isFavorite(),
      },
    })
      .then(() => authActions.fetchFavoriteMovies(auth))
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
    this.props.auth.favoriteMovies.findIndex(
      movie => movie.id === this.props.id
    ) !== -1

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

export default withAuth(FavoriteButton)
