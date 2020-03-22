import React from 'react'
import PropTypes from 'prop-types'
import CallApi from '../../api/api'

export default Component =>
  class GenresHOC extends React.PureComponent {
    static propTypes = {
      with_genres: PropTypes.array.isRequired,
      updateFilters: PropTypes.func.isRequired,
    }

    constructor() {
      super()

      this.state = {
        genres: [],
      }
    }

    getGenres = () => {
      const queryStringParams = {
        language: 'ru-RU',
      }
      CallApi.get('/genre/movie/list', {
        params: queryStringParams,
      }).then(data => {
        this.setState({
          genres: data.genres,
        })
      })
    }

    onChangeGenres = e => {
      const { checked, id } = e.target
      this.props.updateFilters({
        name: 'with_genres',
        value: checked
          ? [...this.props.with_genres, Number(id)]
          : this.props.with_genres.filter(genre => genre !== Number(id)),
      })
    }

    componentDidMount() {
      this.getGenres()
    }

    render() {
      const { genres } = this.state
      const { with_genres } = this.props

      return (
        <Component
          genres={genres}
          with_genres={with_genres}
          onChangeGenres={this.onChangeGenres}
        />
      )
    }
  }
