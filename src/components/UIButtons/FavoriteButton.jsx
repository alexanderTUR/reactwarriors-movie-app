import React from 'react'
import AppContextHoc from '../HOC/AppContextHOC'
import { Star, StarBorder } from '@material-ui/icons'

class FavoriteButton extends React.Component {
  constructor() {
    super()
    this.state = {
      isActive: false,
    }
  }

  toggleActiveButton = () => {
    this.props.updateUsersMovieList(
      'favorite',
      this.props.id,
      !this.state.isActive
    )
    this.setState(prevState => ({
      isActive: !prevState.isActive,
    }))
  }

  checkIsFavorite = () => {
    if (
      this.props.favorite.find(elem => {
        return elem.id === this.props.id
      })
    ) {
      this.setState({
        isActive: true,
      })
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.favorite.length !== prevProps.favorite.length) {
      this.checkIsFavorite()
    }
  }

  componentDidMount() {
    this.checkIsFavorite()
  }

  render() {
    return (
      <button
        className="ui-btn ui-btn_favorite"
        type="button"
        onClick={this.toggleActiveButton}
      >
        {this.state.isActive ? <Star /> : <StarBorder />}
      </button>
    )
  }
}

export default AppContextHoc(FavoriteButton)
