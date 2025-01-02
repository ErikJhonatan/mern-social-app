import { Link } from 'react-router';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-base-200 p-4">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-primary mb-4 animate-bounce">404</h1>
        <p className="text-2xl mb-8">Página no encontrada</p>
        <Link to="/" className="btn btn-primary animate-pulse">Volver al inicio</Link>
      </div>
    </div>
  );
}

export default NotFound;