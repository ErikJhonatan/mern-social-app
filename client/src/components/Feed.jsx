import React from 'react'
import PropTypes from 'prop-types'

function Feed(props) {
  
  return (
    <div className={`${props.className}`} >
      
    </div>
  )
}

Feed.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Feed