import React from 'react'
import { withAuth } from '../../hoc/withAuth'
import CallApi from '../../api/api'
import { Bookmark, BookmarkBorder } from '@material-ui/icons'

class WatchlistButton extends React.Component {
  constructor() {
    super()
    this.state = {
      loading: false,
    }
  }

  updateWatchlist = () => {
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
    CallApi.post(`/account/${auth.user.id}/watchlist`, {
      params: queryStringParams,
      body: {
        media_type: 'movie',
        media_id: this.props.id,
        watchlist: !this.isInWatchlist(),
      },
    })
      .then(() => authActions.fetchWatchListMovies(auth))
      .then(() => {
        this.setState({
          loading: false,
        })
      })
  }

  toggleActiveButton = () => {
    this.updateWatchlist()
  }

  isInWatchlist = () =>
    this.props.auth.watchlistMovies.findIndex(
      movie => movie.id === this.props.id
    ) !== -1

  render() {
    return (
      <button
        className="ui-btn ui-btn_watchlist"
        type="button"
        onClick={this.toggleActiveButton}
        disabled={this.state.loading}
      >
        {this.isInWatchlist() ? <Bookmark /> : <BookmarkBorder />}
      </button>
    )
  }
}

export default withAuth(WatchlistButton)
