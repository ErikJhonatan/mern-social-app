import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import LIstFriends from "../components/LIstFriends";
import ImgFrontPage from "/post/3.jpeg";
import { useContext } from "react";
import { AuthContext } from "../context/AuthProvider";

function Profile(){

  const { user } = useContext(AuthContext);

  return (
    <>
      <Topbar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Sidebar className="col-span-1 hidden md:block" />
        <div className="col-span-3">
          {/* Portada de la red social */}
          <div className="relative">
            <img src={ImgFrontPage} alt="front-page" className="w-full h-60 object-cover"/>
            {/* Avatar center */}
            <div className="avatar flex items-center flex-col absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2">
              <div className="w-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                {
                  user ? (
                    <img src={user?.profilePicture} alt="User" className="w-full h-full rounded-full" />
                  ) : (
                    <div className="skeleton h-24 w-24"></div>
                  )
                }
              </div>
              <h1 className="mt-2 text-xl text-center font-bold">
                {user?.username}
              </h1>
              <p className="text-center text-sm text-gray-500 w-3/4 mx-auto">
                Software engineer, who loves life and making new friends
              </p>
            </div>
          </div>
          {
            /* 
            Profile info, posts, photos, friends, etc
            */
          }
          <div className="mt-14 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feed */}
            <Feed className="col-span-2" />
            {/* User Info */}
            <div className="col-span-1">
              <div className="bg-white p-4 rounded-lg shadow">
                <h1 className="text-xl font-bold">User Info</h1>
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Username: <span className="text-gray-800 font-semibold">{user?.username}</span></p>
                  <p className="text-sm text-gray-500">Email: <span className="text-gray-800 font-semibold">
                    {user?.email}
                  </span></p>
                  <p className="text-sm text-gray-500">Location: <span className="text-gray-800 font-semibold">Peru, Cusco</span></p>
                  <p className="text-sm text-gray-500">Phone: <span className="text-gray-800 font-semibold">+1 234 567 890</span></p>
                  <p className="text-sm text-gray-500">Website: <span className="text-gray-800 font-semibold">erikjhonatan.dev</span></p>
                  <p className="text-sm text-gray-500">Birthday: <span className="text-gray-800 font-semibold">22/01/2004</span></p>
                </div>
              </div>
              {/* 
               User friends
              */}
              <div className="mt-4 bg-white p-4 rounded-lg shadow">
                <h1 className="text-xl font-bold">Amigos</h1>
                <LIstFriends />
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;