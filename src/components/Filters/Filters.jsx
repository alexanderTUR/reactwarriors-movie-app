import React from 'react'
import PropTypes from 'prop-types'
import SortBy from './SortBy'
import Pagination from './Pagination'
import PrimaryReleaseYear from './PrimaryReleaseYear'
import Genres from './Genres'

export default class Filters extends React.Component {
  static propTypes = {
    filters: PropTypes.object.isRequired,
    page: PropTypes.number.isRequired,
    total_pages: PropTypes.number,
    onChangeFilters: PropTypes.func.isRequired,
    onChangePage: PropTypes.func.isRequired,
    onReset: PropTypes.func.isRequired,
    updateFilters: PropTypes.func.isRequired,
  }

  render() {
    const {
      filters: { sort_by, with_genres, primary_release_year },
      page,
      total_pages,
      onChangeFilters,
      onChangePage,
      onReset,
      updateFilters,
    } = this.props
    return (
      <form className="mb-3" action="POST">
        <SortBy sort_by={sort_by} onChangeFilters={onChangeFilters}></SortBy>
        <PrimaryReleaseYear
          primary_release_year={primary_release_year}
          onChangeFilters={onChangeFilters}
        ></PrimaryReleaseYear>
        <Genres
          with_genres={with_genres}
          updateFilters={updateFilters}
        ></Genres>
        <Pagination
          page={page}
          total_pages={total_pages}
          onChangePage={onChangePage}
          onReset={onReset}
        ></Pagination>
      </form>
    )
  }
}
