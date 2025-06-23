import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";

/**
 * Componente que renderiza un formulario de registro con Tailwind CSS.
 * Gestiona el estado de los campos del formulario y utiliza el hook useAuth
 * para ejecutar la lógica de registro.
 */
export const Register = () => {
  // Estados para los campos del formulario.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");

  // Estado para manejar mensajes de error que se mostrarán al usuario.
  const [errorMessage, setErrorMessage] = useState("");
  
  // Obtenemos la función 'register' de nuestro hook de autenticación.
  const { register } = useAuth();

  /**
   * Manejador para el envío del formulario.
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevenimos la recarga de la página.
    setErrorMessage(""); // Limpiamos errores anteriores.

    const result = await register({ email, password, full_name: fullName });

    if (!result.success) {
      setErrorMessage(result.error);
    }
  };

  return (
    <div className="card">
      <h2 className="text-2xl font-bold text-center text-text-primary mb-8">Crear una Cuenta</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Campo de Nombre Completo */}
        <div>
          <label className="form-label">Nombre Completo</label>
          <input
            type="text"
            placeholder="Introduce tu nombre completo"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="input-field"
            required
          />
        </div>
        
        {/* Campo de Email */}
        <div>
          <label className="form-label">Email</label>
          <input
            type="email"
            placeholder="Introduce tu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
            required
          />
        </div>

        {/* Campo de Contraseña */}
        <div>
          <label className="form-label">Contraseña</label>
          <input
            type="password"
            placeholder="Introduce tu contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
            required
          />
        </div>

        {/* Mensaje de Error */}
        {errorMessage && (
            <p className="text-sm text-center text-red-400 bg-red-900/50 p-3 rounded-md">
                {errorMessage}
            </p>
        )}
        
        {/* Botón de Envío */}
        <div>
          <button type="submit" className="btn-primary">
            Registrarse
          </button>
        </div>
      </form>
    </div>
  );
}; 