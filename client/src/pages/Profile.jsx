import Topbar from "../components/Topbar";
import Sidebar from "../components/Sidebar";
import Feed from "../components/Feed";
import LIstFriends from "../components/LIstFriends";
import ImgFrontPage from "/post/3.jpeg";
import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/AuthProvider";
import { FaEdit } from "react-icons/fa";
import ModalEditProfile from "../components/ModalEditProfile";

function Profile(){
  const { user } = useContext(AuthContext);
  const [editProfile, setEditProfile] = useState(false);
  const [isChangeProfile, setIsChangeProfile] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    setUserData(user);
  }, [user]);

  const handleEditProfile = (nameModal) => {
    setEditProfile(!editProfile);
    if (!editProfile) {
      document.getElementById(nameModal).showModal()
    }
    console.log(editProfile);
  };

  return (
    <>
      <Topbar />
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Sidebar className="col-span-1 hidden md:block" />
        <div className="col-span-3">
          {/* Portada de la red social */}
          <div className="relative">
            {
              /* 
              Imagen de portada, oscurecerla y poner el avatar en el centro
              */
            }
            <img src={ImgFrontPage} alt="front-page" className="w-full h-60 object-cover rounded-t-lg filter brightness-50" />
            {/* Avatar center */}
            <div className="avatar flex items-center flex-col absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/4">
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

              <button className={`btn btn-primary mt-2 px-4 py-1 rounded-full transition-all duration-300 my-3`}
              onClick={handleEditProfile.bind(this, "modal_edit_profile")}
              style={{ cursor: editProfile && !isChangeProfile ? "not-allowed" : "pointer" }}
              >
                Editar
                <FaEdit className="text-xl ml-1" />
              </button>
              
                <p className="text-center text-sm w-3/4 mx-auto z-10">
                  {user?.desc}
                </p>
            </div>
          </div>
          
              <div className="mt-20 bg-base-200 p-4 rounded-lg shadow">
                <h1 className="text-xl font-bold text-center">Información del usuario </h1>
                <div className="mt-4">
                  <p className="text-sm">Nombre de usuario: <span className="font-semibold">{user?.username}</span></p>
                  <p className="text-sm">correo: <span className="font-semibold">
                    {user?.email}
                  </span></p>
                  <p className="text-sm">Ciudad: <span className="font-semibold">Peru, Cusco</span></p>
                  <p className="text-sm ">Telefono: <span className="font-semibold">+1 234 567 890</span></p>
                  <p className="text-sm ">Website: <span className="font-semibold">erikjhonatan.dev</span></p>
                  <p className="text-sm ">Fecha de nacimiento: <span className="font-semibold">22/01/2004</span></p>
                </div>
              </div>
          {
            /* 
            Profile info, posts, photos, friends, etc
            */
          }
          
          <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
            {/* Feed */}
            <Feed className="col-span-2" />
            {/* User Info */}
            <div className="col-span-1">
                 {/* 
               User friends
              */}
              <div className="mt-4 bg-base-200 p-4 rounded-lg shadow">
                <h1 className="text-xl font-bold">Amigos</h1>
                <LIstFriends />
              </div>
            </div>
          </div>

        </div>
        <ModalEditProfile userData={userData} nameModal="modal_edit_profile" setUserData={setUserData} setIsChangeProfile={setIsChangeProfile} setEditProfile={setEditProfile} />
      </div>
    </>
  );
};

export default Profile;