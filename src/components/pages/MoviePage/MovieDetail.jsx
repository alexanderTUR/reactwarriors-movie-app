import React, { Component } from 'react'

class MovieDetail extends Component {
  render() {
    const { movie } = this.props
    return (
      <div className="mt-5 movie-details">
        <table className="table">
          <tbody>
            <tr>
              <th>Статус</th>
              <td>{movie.status}</td>
            </tr>
            <tr>
              <th>Дата выхода</th>
              <td>{movie.release_date}</td>
            </tr>
            <tr>
              <th>Продолжительность</th>
              <td>{`${movie.runtime} min`}</td>
            </tr>
            <tr>
              <th>Язык оригинала</th>
              <td>{movie.original_language}</td>
            </tr>
            <tr>
              <th>Бюджет</th>
              <td>{`${movie.budget} $`}</td>
            </tr>

            <tr>
              <th>Сборы</th>
              <td>{`${movie.revenue} $`}</td>
            </tr>
            <tr>
              <th>Страна</th>
              <td>
                {movie.production_countries.map(countrie => {
                  return (
                    <span
                      className={'badge badge-info mr-1'}
                      key={countrie.name}
                    >
                      {countrie.name}
                    </span>
                  )
                })}
              </td>
            </tr>
            <tr>
              <th>Компания</th>
              <td>
                {movie.production_companies.map(companie => {
                  return (
                    <span
                      className={'badge badge-info mr-1'}
                      key={companie.name}
                    >
                      {companie.name}
                    </span>
                  )
                })}
              </td>
            </tr>
            <tr>
              <th>Жанр</th>
              <td>
                {movie.genres.map(genre => {
                  return (
                    <span className={'badge badge-info mr-1'} key={genre.name}>
                      {genre.name}
                    </span>
                  )
                })}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    )
  }
}

export default MovieDetail
