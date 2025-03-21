import { useForm } from "react-hook-form";
import { Link } from "react-router";
import { CiCircleInfo } from "react-icons/ci";
import { MdErrorOutline } from "react-icons/md";
import LoginImg from "/img/login-img.jpg";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthProvider";

function Login() {

  const [alertLogin, setAlertLogin] = useState({ show: false, message: '', type: '' });

  const { login } = useContext(AuthContext);

  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const [loadingLogin, setLoadingLogin] = useState(false);

  const hideAlert = () => {
    setTimeout(() => {
      setAlertLogin({ ...alertLogin, show: false });
    }, 3000);
  };

  const onSubmit = async (credentials) => {
    setLoadingLogin(true);
    try {
    const loginData = await login(credentials);
    const { status } = loginData;
    if (status === 401) {
      console.log('Usuario o contraseña incorrectos');
      setLoadingLogin(false);
      setAlertLogin({ show: true, message: 'Usuario o contraseña incorrectos', type: 'error' });
      hideAlert();
    }
    if (status === 404) {
      console.log('Usuario no encontrado');
      setLoadingLogin(false);
      setAlertLogin({ show: true, message: 'Usuario no encontrado', type: 'error' });
      hideAlert();
    }
    }
    catch (error) {
      setLoadingLogin(false);
      setAlertLogin({ show: true, message: 'Error en la petición, o el servidor no responde', type: 'error' });
      hideAlert();
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      <h1 className="text-4xl font-bold mb-6 text-center">
        <span className="text-4xl font-bold text-primary">AnSocial</span> Login
      </h1>
      <div className="card lg:card-side bg-base-100 shadow-xl max-w-4xl w-full">
        <figure className="lg:w-1/2">
          <img
            src={LoginImg}
            alt="Random image"
            className="object-cover w-full h-full"
          />
        </figure>
        <div className="card-body lg:w-1/2 flex flex-col items-center justify-center">
          <h2 className="card-title text-2xl font-bold mb-6">Iniciar sesión</h2>
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            <div className="form-control">
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
                  placeholder="Enter password"
                  {...register('password', {
                    required: 'La contraseña es requerida',
                    minLength: {
                      value: 6,
                      message: 'La contraseña debe tener al menos 6 caracteres'
                    }
                  })}
                />
              </label>
              {errors.password && (
                <label className="label">
                  <span className="label-text-alt text-error">{errors.password.message}</span>
                </label>
              )}
              <label className="label">
                <a href="#" className="label-text-alt link link-hover">
                  ¿Has olvidado tu contraseña?
                </a>
              </label>
            </div>
            <div className="form-control mt-6">
              <button className="btn btn-primary btn-login w-full" disabled={loadingLogin || alertLogin.show}>
              {
                loadingLogin && <span className="loading loading-spinner text-white"></span>
              }
                Iniciar sesión 
              </button>
            </div>
          </form>
          <div className="divider">OR</div>
          <div className="text-center">
            <p>Aún no tienes una cuenta?</p>
            <Link to="/signup" className="link link-primary">
              Regístrate
            </Link>
          </div>
        </div>
      </div>
      {
        alertLogin.show &&
        <div role="alert" className={`alert alert-error fixed bottom-2 transition-opacity duration-1000 ${alertLogin.show ? 'opacity-100' : 'opacity-0'} text-white`}>
        {
          alertLogin.type === 'info' && <CiCircleInfo className="alert-icon text-3xl" />
        }
        {
          alertLogin.type === 'error' && <MdErrorOutline className="alert-icon text-3xl" />
        }
        <span>
          {alertLogin.message}
        </span>
      </div>
      }
    </div>
  );
}

export default Login;