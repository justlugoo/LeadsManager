import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import { apiService } from "../services/api";
import type { UserCreate } from "types";

/**
 * Hook personalizado para interactuar con el contexto de autenticación.
 * Proporciona una forma limpia para que los componentes accedan al estado
 * del token y a las funciones de acción como registrarse o iniciar sesión.
 */

export const useAuth = () => {
  // Obtenemos el valor del contexto (el token y la función para actualizarlo).
  const context = useContext(UserContext);

  // Si el hook se usa fuera de un UserProvider, lanzamos un error.
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un UserProvider");
  }

  const [token, setToken] = context;

  /**
   * Función para registrar un nuevo usuario.
   * Llama al servicio de la API y, si tiene éxito, actualiza el token en el estado global.
   * @param {UserCreate} data - Los datos del usuario para el registro.
   * @returns Un objeto indicando si la operación fue exitosa y un posible mensaje de error.
   */
  
  const register = async (data: UserCreate) => {
    try {
      const response = await apiService.register(data);
      const newToken = response.data.access_token;
      
      // 1. Guardamos el nuevo token en localStorage INMEDIATAMENTE.
      localStorage.setItem("leadsManagerToken", newToken);
      // 2. Actualizamos el estado de React. Esto disparará el useEffect de validación en UserContext,
      //    que ahora encontrará el token correcto en localStorage a través del interceptor.
      setToken(newToken);

      return { success: true };
    } catch (error: any) {
      const errorMessage = error.response?.data?.detail || "Ocurrió un error al registrarse.";
      return { success: false, error: errorMessage };
    }
  };

  // El hook devuelve el estado del token y las funciones de acción.
  // Más adelante añadiremos aquí 'login' y 'logout'.
  return {
    token,
    register,
  };
}; 