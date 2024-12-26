import { createContext } from "react";
import person1 from "/person/1.jpeg";
import { IoMdImages } from "react-icons/io";
import { FaTag } from "react-icons/fa";
import { MdEmojiEmotions } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import { useForm } from "react-hook-form";
import { useState } from "react";
import DialogAccept from "./DIalogAccept";

const DialogAcceptContext = createContext();

function Share() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [postImg, setPostImg] = useState(null);

  const handlePostImg = (e) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        if (reader.result.indexOf("data:image/") !== 0) {
          return;
        }
        setPostImg(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  const deletePostImg = () => {
    setPostImg(null);
    document.getElementById("file-upload").value = null;
  };

  return (
    <div className="p-5 rounded-lg shadow-md mb-5">
      {/* Share top */}
      <div>
        {/* User */}
        <div className="flex items-center gap-2 mb-4">
          <div className="avatar">
            <div className="w-16 rounded-full">
              <img src={person1} alt="User Avatar" />
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
          {...register("post", { required: "Este campo es requerido" })}
        />

        {errors.post && (
          <span className="text-red-500 text-sm mt-1">
            {errors.post.message}
          </span>
        )}
      </div>

      {/* Post image */}
      {postImg && (
        <>
          <div className="relative mt-2">
            <img src={postImg || ""} alt="Post" className="w-full rounded-lg" />
          </div>
          <button 
          className="btn btn-danger w-full mt-2" 
          onClick={() => {
            document.getElementById("dialog_accept").showModal();
          }}>
            Eliminar imagen
          </button>
          
          <DialogAccept nameModal="dialog_accept" deleteFn={deletePostImg} />
        </>

      )}
          

      {/* Share bottom */}
      <div className="divider"></div>
      <div>
        {/* Share options */}
        <div>
          <div className="flex gap-2">
            {/* Input file con SVG */}
            <div className="flex items-center gap-1 relative">
              <input
                type="file"
                accept="image/*"
                id="file-upload"
                className="absolute inset-0 w-full h-full opacity-0"
                {...register("image")}
                onChange={handlePostImg}
              />
              <button className="btn btn-circle" htmlFor="file-upload">
                <IoMdImages className="text-2xl text-red-500" />
              </button>
              <span className="hidden lg:inline">Imagen</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="btn btn-circle">
                <FaTag className="text-2xl text-blue-500" />
              </button>
              <span className="hidden lg:inline">Tag</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="btn btn-circle">
                <MdEmojiEmotions className="text-2xl text-yellow-500" />
              </button>
              <span className="hidden lg:inline">Feeling</span>
            </div>

            <div className="flex items-center gap-1">
              <button className="btn btn-circle">
                <FaLocationDot className="text-2xl text-green-500" />
              </button>
              <span className="hidden lg:inline">Ubicación</span>
            </div>
          </div>
          <div className="divider"></div>
          <button
            className="btn btn-primary w-full mt-2 lg:w-auto"
            onClick={handleSubmit((data) => {
              console.log(data);
            })}
          >
            Publicar
          </button>
        </div>
      </div>
    </div>
    
  );
}

export default Share;
