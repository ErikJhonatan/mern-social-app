import { IoMdSearch, IoMdNotifications } from "react-icons/io";
import { LuMessageSquareText } from "react-icons/lu";
import { FaUser } from "react-icons/fa";

function topbar() {
  const showSearchModal = () => {
    const modal = document.getElementById("my_modal_search");
    modal.showModal();
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
          >
            <li>
              <a>Inicio</a>
            </li>
            <li>
              <a>Timeline</a>
            </li>
          </ul>
        </div>
        <a className="text-xl hidden sm:flex">AnSocial</a>
      </div>
      <div className="navbar-center">
        <label className="input input-bordered items-center gap-2 hidden lg:flex">
          <input type="text" className="grow w-72" placeholder="Buscar amigos, publicaciones, etc." />
          <IoMdSearch className="text-xl" />
        </label>
      </div>
      <div className="navbar-end">
        <ul className="menu menu-horizontal px-1 hidden lg:flex">
          <li>
            <a>Inicio</a>
          </li>
          <li>
            <a>Timeline</a>
          </li>
        </ul>
        <div className="lg:hidden">
          <button className="btn btn-square btn-ghost">
            <IoMdSearch className="text-2xl" onClick={showSearchModal} />
          </button>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <LuMessageSquareText className="text-2xl" />
          </div>
          <div className="badge badge-primary badge-xs absolute top-2 right-2 ">
            2
          </div>

          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
          >
            <li>
              <a>
                <span className="font-bold">Juan:</span> Hola, ¿cómo estás?
              </a>
            </li>
            <li>
              <a>
                <span className="font-bold">María:</span> ¿Tienes un momento?
              </a>
            </li>
          </ul>
        </div>

        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <FaUser className="text-2xl" />
          </div>
          <div className="badge badge-primary badge-xs absolute top-2 right-2 ">
            2
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
          >
            <li>
              <a>
                <span className="font-bold">Pedro:</span> Te ha seguido.
              </a>
            </li>
            <li>
              <a>
                <span className="font-bold">Ana:</span> Te ha seguido.
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="btn btn-ghost">
            <IoMdNotifications className="text-2xl" />
          </div>
          <div className="badge badge-primary badge-xs absolute top-2 right-2 ">
            2
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
          >
            <li>
              <a>
                <span className="font-bold">Juan</span> a publicado algo
              </a>
            </li>
          </ul>
        </div>
        <div className="dropdown dropdown-end">
          <div tabIndex={0} role="button" className="avatar">
            <div className="w-10 rounded-full">
              <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu dropdown-content bg-base-100 rounded-box w-52 p-2 shadow"
          >
            <li>
              <a>Perfil</a>
            </li>
            <li>
              <a>Configuración</a>
            </li>
            <li>
              <a>Cerrar sesión</a>
            </li>
          </ul>
        </div>
      </div>
      <dialog id="my_modal_search" className="modal">
        <div className="modal-box flex flex-col justify-center">
          <h3 className="font-bold text-lg mb-6">Buscar</h3>
          <input
            type="text"
            className="input input-bordered"
            placeholder="Buscar amigos, publicaciones, etc."
          />
          <div className="modal-action">
            <button className="btn btn-primary">Buscar</button>
          </div>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </div>
  );
}

export default topbar;
