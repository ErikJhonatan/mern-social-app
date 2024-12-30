import {useEffect, useState} from "react";
import PropTypes from 'prop-types';
import {
  MdOutlineRssFeed,
  MdMessage,
  MdOutlineVideoLibrary,
  MdGroups,
  MdOutlineWork
} from "react-icons/md";

function Sidebar(props) {
  // obtener el tamaño del navbar
  const [topBarOffsetWidth, setTopBarOffsetWidth] = useState(0);

  useEffect(() => {
    const topBar = document.querySelector(".topbar");
    setTopBarOffsetWidth(topBar.offsetHeight);
    const sidebar = document.querySelector(".sidebar-app");
    sidebar.style.height = `calc(100vh - ${topBarOffsetWidth}px)`;
  }, [topBarOffsetWidth]);

  return (
    <div
      className={`sidebar-app bg-base-200 p-4 rounded-lg shadow-lg overflow-y-auto ${props.className} scrollbar scrollbar-thumb-neutral scrollbar-track-neutral-content sticky left-0`}
      style={{
        top: `${topBarOffsetWidth}px`,
      }}
    >
      <ul className="menu bg-base-200 rounded-box w-full">
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
      <button className="btn btn-neutral my-4 w-full">
        Ver más
      </button>
      <div className="divider"></div>
      <div className="p-4">
        <h1 className="text-lg font-bold mb-4">Amigos</h1>
        {["John Doe", "Jane Doe", "Alice Smith","John Doe", "Jane Doe", "Alice Smith","John Doe", "Jane Doe", "Alice Smith","John Doe", "Jane Doe", "Alice Smith","John Doe", "Jane Doe", "Alice Smith","John Doe", "Jane Doe", "Alice Smith","John Doe", "Jane Doe", "Alice Smith"].map((name, index) => (
          <div key={index} className="flex items-center space-x-4 my-2">
            <div className="avatar">
              <div className="w-9 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div> 
              <span className="ml-2 text-base m-auto">{name}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
Sidebar.propTypes = {
  className: PropTypes.string,
};

export default Sidebar;