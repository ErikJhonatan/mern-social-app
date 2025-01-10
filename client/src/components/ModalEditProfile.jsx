import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useForm } from 'react-hook-form'

function ModalEditProfile({userData, setUserData, nameModal, setEditProfile}) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm({
    defaultValues: userData // Establecemos los valores iniciales
  });

  // Actualizamos el formulario cuando cambia userData
  useEffect(() => {
    reset(userData);
  }, [userData, reset]);

  const onSubmit = (data) => {
    setUserData(data);
    document.getElementById(nameModal).close();
    setEditProfile(false);
  };

  return (
    <dialog id={nameModal} className="modal">
      <div className="modal-box">
        <h3 className="font-bold text-lg">Editar perfil</h3>
        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <div className="flex flex-col">
            <label htmlFor="username" className="text-sm">Nombre de usuario</label>
            <input 
              type="text" 
              className="input input-bordered" 
              placeholder="Ingrese su username"
              {...register("username", {
                required: "El nombre de usuario es requerido",
                minLength: { value: 4, message: "Mínimo 4 caracteres" },
                maxLength: { value: 20, message: "Máximo 20 caracteres" }
              })}
            />
            {errors.username && <span className="text-error text-sm">{errors.username.message}</span>}
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="email" className="text-sm">Correo electrónico</label>
            <input 
              type="email" 
              className="input input-bordered" 
              placeholder="Ingresa su correo electrónico"
              {...register("email", {
                required: "El correo es requerido",
                pattern: { 
                  value: /^\S+@\S+\.\S+$/,
                  message: "Correo inválido"
                }
              })}
            />
            {errors.email && <span className="text-error text-sm">{errors.email.message}</span>}
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="desc" className="text-sm">Descripción</label>
            <textarea 
              id="desc" 
              className="textarea textarea-bordered h-28 text-sm"
              placeholder="Escribe algo sobre ti"
              {...register("desc", {
                maxLength: { value: 100, message: "La descripción no puede superar los 100 caracteres" }
              })}
            />
            {errors.desc && <span className="text-error text-sm">{errors.desc.message}</span>}
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="from" className="text-sm">De</label>
            <input 
              type="text" 
              id="from" 
              className="input input-bordered" 
              placeholder="Ingresa tu lugar de origen: ejm Perú, Cusco"
              {...register("from", {
                maxLength: { value: 50, message: "La ciudad no puede superar los 50 caracteres" }
              })}
            />
            {errors.from && <span className="text-error text-sm">{errors.from.message}</span>}
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="city" className="text-sm">Ciudad</label>
            <input 
              type="text" 
              id="city" 
              className="input input-bordered" 
              placeholder="Ingresa tu ciudad"
              {...register("city", {
                maxLength: { value: 50, message: "La ciudad no puede superar los 50 caracteres" }
              })}
            />
            {errors.city && <span className="text-error text-sm">{errors.city.message}</span>}
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="phone" className="text-sm">Teléfono</label>
            <input 
              type="text" 
              id="phone" 
              className="input input-bordered" 
              placeholder="Ingresa tu teléfono"
              {...register("phone")}
            />
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="relationship" className='text-sm'>
              Estado civil
            </label>
            <select 
              id="relationship" 
              className="select select-bordered w-full"
              {...register("relationship", {
                required: "El estado civil es requerido"
              })}
            >
              <option value="1" selected={userData?.relationship === 1} >Soltero</option>
              <option value="2" selected={userData?.relationship === 2} >Casado</option>
              <option value="3" selected={userData?.relationship === 3} >Comprometido</option>
            </select>
            {errors.relationship && <span className="text-error text-sm">{errors.relationship.message}</span>}
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="website" className="text-sm">Sitio web</label>
            <input 
              type="text" 
              id="website" 
              className="input input-bordered" 
              placeholder="Ingresa tu sitio web"
              {...register("website", {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Dirección inválida"
                },})
              }
            />
            {errors.website && <span className="text-error text-sm">{errors.website.message}</span>}
          </div>

          <div className="flex flex-col mt-2">
            <label htmlFor="birthday" className="text-sm">Fecha de nacimiento</label>
            <input 
              type="date"
              id="birthday" 
              className="input input-bordered"
              {...register("birthday", {
                pattern: {
                  value: /^\d{4}-\d{2}-\d{2}$/,
                  message: "Fecha inválida"
                }
              })}
            />
            {errors.birthday && <span className="text-error text-sm">{errors.birthday.message}</span>}
          </div>

          <div className="flex justify-end mt-4">
            <button 
              type="button" 
              className="btn btn-secondary" 
              onClick={() => {
                document.getElementById(nameModal).close();
                setEditProfile(false);
                reset(userData); // Resetear al cerrar
              }}
            >
              Cancelar
            </button>
            <button type="submit" className="btn btn-primary ml-2">
              Guardar
            </button>
          </div>
        </form>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}

ModalEditProfile.propTypes = {
  nameModal: PropTypes.string.isRequired,
  userData: PropTypes.object,
  setUserData: PropTypes.func.isRequired,
  setEditProfile: PropTypes.func.isRequired
}

export default ModalEditProfile