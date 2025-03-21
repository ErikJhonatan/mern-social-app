# Aplicación social con React y API REST

Proyecto full stack para explorar los flujos de una red social: identidad, perfiles, seguimiento de usuarios e interfaz de publicaciones.

## Alcance del código actual

- Cliente React con páginas de inicio, registro, perfil y feed.
- Backend Express conectado a MongoDB mediante Mongoose.
- Registro con imagen de perfil almacenada en Cloudinary.
- Inicio de sesión con JWT en cookies y rutas para consultar la sesión.
- Rutas para consultar, seguir y dejar de seguir usuarios.

El repositorio también contiene un router de publicaciones con operaciones de creación, edición, eliminación, likes y timeline. El router está montado en `/api/posts`, requiere autenticación y limita las modificaciones al propietario. Los cuerpos e identificadores se validan antes de acceder a los datos.

## Estructura

```text
client/    Interfaz React, páginas, componentes y contexto de autenticación
backend/   Servidor Express, rutas, modelos, middleware e integraciones
```

## Tecnologías

React, Vite, React Router, Axios, Express, MongoDB, Mongoose, JWT, Multer y Cloudinary.

## Desarrollo local

Clona el repositorio:

```sh
git clone https://github.com/ErikJhonatan/mern-social-app.git
cd mern-social-app
```

En una terminal, prepara y ejecuta el backend:

```sh
cd backend
npm install
cp .env.example .env
npm run dev
```

Completa las variables de entorno con tus propios valores para MongoDB, JWT y Cloudinary. Revisa también el origen configurado para el cliente. El servidor utiliza el puerto 3000.

En otra terminal, desde la raíz del proyecto:

```sh
cd client
npm install
npm run dev
```

No publiques credenciales ni archivos `.env`.

## Estado y siguientes pasos

Proyecto en desarrollo. Esta documentación se basa en la inspección del código; no acredita una ejecución verificada ni un despliegue de producción.

- Integrar el router de publicaciones con sus controles de acceso.
- Revisar y probar los flujos completos de autenticación y seguimiento.
- Añadir una demostración y capturas del producto.

## Autor

[Erik Jhonatan](https://github.com/ErikJhonatan)
