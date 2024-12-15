import React from 'react';
import PropTypes from 'prop-types';
import Share from './Share';
import Post from './Post.jsx';
import {Posts} from '../utils/dummyData.js'

function Feed(props) {
  return (
    <div className={`${props.className}`} >
      <div className='p-5'>
        <Share />
        {
          Posts.map((post) => (
            <Post key={post.id} dataPost={post} />
          ))
        }
      </div>
    </div>
  )
}

Feed.propTypes = {
  className: PropTypes.string.isRequired,
}

export default Feed