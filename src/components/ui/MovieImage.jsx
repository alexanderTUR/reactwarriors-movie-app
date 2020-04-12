import React from 'react'
import emptyImage from '../../img/no-image.png'

const MovieImage = props => {
  const path = props.src
    ? `https://image.tmdb.org/t/p/w500${props.src}`
    : emptyImage
  return <img {...props} src={path} alt={props.alt} />
}

export default MovieImage
