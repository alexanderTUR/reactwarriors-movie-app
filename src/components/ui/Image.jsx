import React from 'react'

const Image = () => (
  <img
    className="actor-card__image"
    src={
      actor.profile_path
        ? `https://image.tmdb.org/t/p/w500${actor.profile_path}`
        : emptyImage
    }
    alt={actor.name}
  />
)

export default Image
