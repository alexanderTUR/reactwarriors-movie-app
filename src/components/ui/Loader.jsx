import Loader from 'react-loader-spinner'
import React from 'react'

const LoaderSpinner = () => (
  <div className="page-loader-container">
    <Loader type="Puff" color="#157ffb" height={100} width={100} />
  </div>
)

export default LoaderSpinner
