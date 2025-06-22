import { useContext } from "react";
import { UserContext } from "./context/UserContext";
import { Register } from "./components/Register";

const App = () => {
  // Obtenemos el token directamente desde el contexto para decidir qué mostrar.
  const [token] = useContext(UserContext);

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <div className="w-full max-w-md">
        {token ? (
          <div className="card text-center">
            <h1 className="text-2xl font-bold text-light-100">¡Registro Exitoso!</h1>
            <p className="mt-4 text-light-200">Estás autenticado correctamente.</p>
            <div className="mt-6 p-4 bg-dark-900 rounded-md text-xs text-left break-words ring-1 ring-dark-700">
              <span className="font-semibold text-light-200">Tu Token:</span>
              <p className="font-mono mt-2 text-primary-start">{token}</p>
            </div>
            {/* Aquí podrías añadir un botón de Logout en el futuro */}
          </div>
        ) : (
          <Register />
        )}
      </div>
    </div>
  );
};

export default App;