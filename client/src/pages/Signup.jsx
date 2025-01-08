import { useDropzone } from 'react-dropzone';
import { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import { useForm } from 'react-hook-form';
import SignupImg from '/img/signup-img.jpg';
import 'react-photo-view/dist/react-photo-view.css';
import { AuthContext } from '../context/AuthProvider';

function Signup() {
  const { registerUser } = useContext(AuthContext);

  const [alertSignup, setAlertSignup] = useState({ show: false, messages: [], type: '' });

  const { register, handleSubmit, formState: { errors }, setError, clearErrors } = useForm();

  const [profileImage, setProfileImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  
  const { getRootProps, getInputProps, acceptedFiles } = useDropzone({
    accept: {
      'image/jpeg': ['.jpeg', '.jpg'],
      'image/png': ['.png']
    },
    maxSize: 5 * 1024 * 1024, // 5MB
    onDrop: (acceptedFiles, rejectedFiles) => {
      if (rejectedFiles.length > 0) {
        const rejection = rejectedFiles[0];
        if (rejection.errors[0].code === 'file-too-large') {
          setError('profileImage', {
            type: 'custom',
            message: 'La imagen no debe superar los 5MB'
          });
        } else if (rejection.errors[0].code === 'file-invalid-type') {
          setError('profileImage', {
            type: 'custom',
            message: 'Solo se permiten archivos JPG, JPEG y PNG'
          });
        }
        return;
      }
      clearErrors('profileImage');
      setProfileImage(acceptedFiles[0]);
    },
  });

  useEffect(() => {
    if (profileImage) {
      const url = URL.createObjectURL(profileImage);
      setImageUrl(url);
      // Limpiar la URL cuando el componente se desmonte o la imagen cambie
      return () => URL.revokeObjectURL(url);
    }
  }, [profileImage]);

  const [isOpen, setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const onSubmit = async (data) => {
    if (!profileImage) {
      setError('profileImage', {
        type: 'custom',
        message: 'La imagen de perfil es requerida'
      });
      return;
    }

    const formData = new FormData();
    // Asegúrate que el nombre del campo coincida con el backend
    formData.append('profileImage', profileImage);
    formData.append('username', data.username);
    formData.append('email', data.email);
    formData.append('password', data.password);

    try {
      console.log('Enviando archivo:', profileImage); // Debug
      await registerUser(formData);
    setAlertSignup({
      show: true,
      messages: ['Usuario registrado con éxito 🎉'],
      type: 'success'
    });
    } catch (error) {

    const statusServer = {
        400:(error) => {
          setAlertSignup({
            show: true,
            messages: error.response.data.errors,
            type: 'error'
          });
        },
        500:(error) => {
          setAlertSignup({
            show: true,
            messages: ['Error del servidor'],
            type: 'error'
          });
        },
    }
    statusServer[error.response.status](error);     
  };
};

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        <span className="text-4xl font-bold text-primary">AnSocial</span> Registro
      </h1>
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full">
        <figure className="lg:w-1/2">
          <img
            src={SignupImg}
            alt="Random image"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body lg:w-1/2">
          <h2 className="card-title text-2xl font-bold mb-6">Registrarse</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate encType="multipart/form-data">
            <div className="form-control">
              <label className="label">
                <span className="label-text">Nombre de usuario</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <input
                  type="text"
                  className="grow"
                  placeholder="Nombre de usuario"
                  {...register('username', {
                    required: 'El nombre de usuario es requerido',
                    minLength: { value: 3, message: 'Mínimo 3 caracteres' },
                    maxLength: { value: 20, message: 'Máximo 20 caracteres' }
                  })}
                />
              </label>
              {errors.username && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.username.message}</span>
                </label>
              )}
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Correo</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path d="M2.5 3A1.5 1.5 0 0 0 1 4.5v.793c.026.009.051.02.076.032L7.674 8.51c.206.1.446.1.652 0l6.598-3.185A.755.755 0 0 1 15 5.293V4.5A1.5 1.5 0 0 0 13.5 3h-11Z" />
                  <path d="M15 6.954 8.978 9.86a2.25 2.25 0 0 1-1.956 0L1 6.954V11.5A1.5 1.5 0 0 0 2.5 13h11a1.5 1.5 0 0 0 1.5-1.5V6.954Z" />
                </svg>
                <input
                  type="email"
                  className="grow"
                  placeholder="email@example.com"
                  {...register('email', {
                    required: 'El correo es requerido',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                      message: 'Correo electrónico inválido'
                    }
                  })}
                />
              </label>
              {errors.email && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.email.message}</span>
                </label>
              )}
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Contraseña</span>
              </label>
              <label className="input input-bordered flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 16 16"
                  fill="currentColor"
                  className="w-4 h-4 opacity-70"
                >
                  <path
                    fill-rule="evenodd"
                    d="M14 6a4 4 0 0 1-4.899 3.899l-1.955 1.955a.5.5 0 0 1-.353.146H5v1.5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1-.5-.5v-2.293a.5.5 0 0 1 .146-.353l3.955-3.955A4 4 0 1 1 14 6Zm-4-2a.75.75 0 0 0 0 1.5.5.5 0 0 1 .5.5.75.75 0 0 0 1.5 0 2 2 0 0 0-2-2Z"
                    clip-rule="evenodd"
                  />
                </svg>
                <input
                  type="password"
                  className="grow"
                  placeholder="Ingresa tu contraseña"
                  {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: { value: 6, message: 'Mínimo 6 caracteres' },
                    pattern: {
                      value: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/,
                      message: 'La contraseña debe contener al menos una letra y un número'
                    }
                  })}
                />
              </label>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                </label>
              )}
            </div>
            <div className="form-control mt-4">
              <label className="label">
                <span className="label-text">Foto de perfil</span>
              </label>
              <div 
                {...getRootProps({ 
                  className: `border-2 border-dashed rounded-lg p-6 text-center cursor-pointer
                    ${errors.profileImage ? 'border-error bg-error/5' : profileImage ? 'border-primary bg-primary/5' : 'border-base-300 hover:border-primary'}
                  `
                })}
              >
                <input {...getInputProps()}
                />
                <div className="flex flex-col items-center gap-2">
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {profileImage ? (
                    <p className="text-sm text-primary">¡Imagen seleccionada!</p>
                  ) : (
                    <>
                      <p className="text-base-content">Arrastra y suelta una imagen aquí</p>
                      <p className="text-sm text-base-content/70">- o -</p>
                      <p className="text-sm text-primary">Haz clic para buscar</p>
                    </>
                  )}
                </div>
              </div>
              {errors.profileImage && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.profileImage.message}</span>
                </label>
              )}
              <PhotoProvider>
              {profileImage && imageUrl && (
                <div className="mt-4 flex items-center justify-center gap-4">
                  <div className="avatar">
                    <PhotoView src={imageUrl}>
                      <div className="w-24 h-24 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 cursor-pointer">
                        <img
                          src={imageUrl}
                          alt="Vista previa"
                        />
                      </div>
                    </PhotoView>
                  </div>
                  <div className="p-2">
                    <p className="text-sm font-medium">{profileImage.name}</p>
                    <p className="text-xs text-base-content/70">
                      {(profileImage.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                    <button 
                      className="btn btn-xs btn-ghost text-error mt-1"
                      onClick={(e) => {
                        e.preventDefault();
                        setProfileImage(null);
                        setImageUrl(null);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                </div>
              )}

              {isOpen && selectedImage && (
                <PhotoView src={selectedImage} onClose={() => setIsOpen(false)} />
              )}
              </PhotoProvider>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary">Registrarse</button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <p>Ya tienes una cuenta?</p>
            <Link to="/login" className="link link-primary">
              Iniciar sesión
            </Link>
          </div>
        </div>
      </div>
      {
        alertSignup.show &&
        <div role="alert" className={`alert alert-${alertSignup.type} fixed bottom-2 transition-opacity duration-1000 ${alertSignup.show ? 'opacity-100' : 'opacity-0'}`}>
          {
            alertSignup.messages.map((message, index) => (
              <span key={index}>{message}</span>
            ))
          }
        </div>
      }
    </div>
  );
}

export default Signup;
