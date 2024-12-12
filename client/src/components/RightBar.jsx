import React from 'react'
import PropTypes from 'prop-types'

function RightBar(props) {
  return (
    <div className={`${props.classname}`} >RightBar</div>
  )
}
RightBar.propTypes = {
  classname: PropTypes.string,
}

export default RightBar