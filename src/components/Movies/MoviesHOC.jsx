import React from 'react'
import PropTypes from 'prop-types'
import CallApi from '../../api/api'

export default Component =>
  class MoviesHOC extends React.Component {
    static propTypes = {
      page: PropTypes.number.isRequired,
      total_pages: PropTypes.number,
      filters: PropTypes.object.isRequired,
      onChangePage: PropTypes.func.isRequired,
      onChangeTotalPage: PropTypes.func.isRequired,
    }

    constructor() {
      super()

      this.state = {
        movies: [],
      }
    }

    getMovies = (filters, page) => {
      const { sort_by, with_genres, primary_release_year } = filters
      const queryStringParams = {
        sort_by,
        page,
        primary_release_year,
      }
      if (with_genres.length > 0) {
        queryStringParams.with_genres = with_genres.join(',')
      }
      if (primary_release_year) {
        queryStringParams.primary_release_year = primary_release_year
      }

      CallApi.get('/discover/movie', {
        params: queryStringParams,
      }).then(data => {
        this.setState({
          movies: data.results,
        })
        this.props.onChangeTotalPage(data.total_pages)
      })
    }

    componentDidMount() {
      this.getMovies(this.props.filters, this.props.page)
    }

    componentDidUpdate(prevProps) {
      if (this.props.filters !== prevProps.filters) {
        this.props.onChangePage(1)
        this.getMovies(this.props.filters, 1)
      }

      if (this.props.page !== prevProps.page) {
        this.getMovies(this.props.filters, this.props.page)
      }
    }

    render() {
      const { movies } = this.state

      return <Component movies={movies} />
    }
  }
