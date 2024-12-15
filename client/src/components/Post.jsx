import React from 'react'
import PropTypes from 'prop-types';
import {Users} from '../utils/dummyData.js'
import { SlOptionsVertical } from "react-icons/sl";
// icon like and heart
import {FaRegHeart } from "react-icons/fa";

function Post(props) {
  const {
    id,
    desc,
    photo,
    date,
    userId,
    like,
    comment,
  } = props.dataPost;

  const {
    username,
    profilePicture
  } = Users.find((user) => user.id === userId);

  return (
    <div>
       {/* Post wrapper*/}
      <div className="p-5 rounded-lg shadow-md mb-5">
        {/* Post top */}
        <div className="flex justify-between">
          {/* Post top left */}
          <div className="flex items-center gap-2 mb-4">
            <div className="avatar">
              <div className="w-10 rounded-full">
                <img src={profilePicture} alt=""/>
              </div>
            </div>
            <div className="flex gap-1">
              <h2 className="font-semibold">{
                username  
              }</h2>
              <span className="text-gray-500">{date}</span>
            </div>
          </div>

          {/* Post top right */}
          <div>
            <button className="btn btn-circle">
              <SlOptionsVertical className="text-2xl text-gray-500" />
            </button>
          </div>
        </div>

        {/* Post center */}
        <div className="mb-5">
          <p className="text-lg mb-5">{desc}</p>
          <img src={photo} alt="post" className="w-full rounded-lg" />
        </div>

        {/* Post bottom */}
        <div className="flex justify-between mt-5">
          {/* Post bottom left */}
          <div className="flex items-center gap-2">
            <button className="btn btn-circle">
              <FaRegHeart className="text-2xl text-red-500" />
            </button>
            <span>{like}</span>
          </div>

          {/* Post bottom right */}
          <div className="flex items-center gap-2">
            <span>{comment} Comentarios</span>
          </div>
        </div>
      </div>
    </div>
  )
}


Post.propTypes = {
  dataPost: PropTypes.shape({
    id: PropTypes.number.isRequired,
    desc: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
    like: PropTypes.number.isRequired,
    comment: PropTypes.number.isRequired,
  }).isRequired,
};

export default Post;