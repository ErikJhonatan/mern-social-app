import React from "react";
import {
  MdOutlineRssFeed,
  MdMessage,
  MdOutlineVideoLibrary,
  MdGroups,
  MdOutlineWork
} from "react-icons/md";

function Sidebar() {
  return (
    <div className="bg-base-200">
      <ul className="menu bg-base-200 rounded-box w-56">
        <li>
          <a>
            <MdOutlineRssFeed className="h-5 w-5" />
            Feed
          </a>
        </li>
        <li>
          <a>
            <MdMessage className="h-5 w-5" />
            Mensajes
          </a>
        </li>
        <li>
          <a>
            <MdOutlineVideoLibrary className="h-5 w-5" />
            Videos
          </a>
        </li>
        <li>
          <a>
            <MdGroups className="h-5 w-5" />
            Grupos
          </a>
        </li>
        <li>
          <a>
            <MdOutlineWork className="h-5 w-5" />
            Empleos
          </a>
        </li>
      </ul>
      <button className="btn btn-neutral my-2 mx-2">
        Ver más
      </button>
      <div className="divider"></div>
      <div className="p-4">
        <h1 className="text-lg font-bold">Amigos</h1>
  
        <div className="flex items-center space-x-4 my-2">
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div> 
            <span className="ml-2 text-base m-auto">John Doe</span>
          </div>
        </div>
          
        <div className="flex items-center space-x-4 my-2">
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div> 
            <span className="ml-2 text-base m-auto">John Doe</span>
          </div>
        </div>  
        <div className="flex items-center space-x-4 my-2">
          <div className="avatar">
            <div className="w-9 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div> 
            <span className="ml-2 text-base m-auto">John Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
