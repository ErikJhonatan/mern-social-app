import React from 'react'
import { Users } from '../utils/DummyData';
function LIstFriends() {
  return (
    <div>
      {
        Users.map((user) => (
          <div className="flex items-center space-x-2 mt-2" key={user.id}>
            <img src={user.profilePicture} alt="profile" className="w-10 h-10 rounded-full" />
            <span className="font-semibold">{user.username}</span>
          </div>
        ))
      }
    </div>
  )
}

export default LIstFriends