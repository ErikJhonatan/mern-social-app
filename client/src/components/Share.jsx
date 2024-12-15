import person1 from "/person/1.jpeg";
import { IoMdImages } from "react-icons/io";
import { FaTag } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

function Share() {
  return (
    <div>
      <div className="p-5 rounded-lg shadow-md mb-5">
        {/* Share top */}
        <div>
          {/* User */}
          <div className="flex items-center gap-2 mb-4">
            <div className="avatar">
              <div className="w-16 rounded-full">
                  <img src= {person1} />
              </div>
            </div>
            <div>
              <h2 className="font-semibold">Pedro</h2>
              <span className="text-gray-500">Publicar algo</span>
            </div>
          </div>
          <textarea 
          type="text" 
          placeholder="¿Qué estás pensando?" 
          className="w-full p-2 border-none rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 resize-none"
          />
        </div>

        {/* Share bottom */}
        <div className="divider"></div>
        <div>
          {/* Share options */}
          <div>
            <div className="flex gap-2">
              <div className="flex items-center gap-1">
                <button className="btn btn-circle">
                  <IoMdImages className="text-2xl text-red-500" />
                </button>
                <span className="hidden lg:inline">
                  Video o imagen
                </span>
              </div>
              <div className="flex items-center gap-1">
                <button className="btn btn-circle">
                  <FaTag className="text-2xl text-blue-500" />
                </button>
                <span className="hidden lg:inline">
                  Tag
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button className="btn btn-circle">
                  <MdEmojiEmotions className="text-2xl text-yellow-500" />
                </button>
                <span className="hidden lg:inline">
                  Feeling
                </span>
              </div>

              <div className="flex items-center gap-1">
                <button className="btn btn-circle">
                  <FaLocationDot className="text-2xl text-green-500" />
                </button>
                <span className="hidden lg:inline">
                  Ubicación
                </span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}

export default Share